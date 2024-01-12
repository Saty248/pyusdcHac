import { Fragment, useState, useRef, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';

import { useRouter } from 'next/router';
import Image from 'next/image';
import Script from 'next/script';

import { Web3AuthNoModal } from '@web3auth/no-modal';
import { SolanaPrivateKeyProvider } from '@web3auth/solana-provider';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { WALLET_ADAPTERS } from '@web3auth/base';
import { SolanaWallet } from '@web3auth/solana-provider';

import { counterActions } from '@/store/store';
import Backdrop from '@/Components/Backdrop';
import Spinner from '@/Components/Spinner';

import { useAuth } from '@/hooks/useAuth';

import swal from 'sweetalert';

import logo from '../../../public/images/logo.jpg';

import { useSignature } from '@/hooks/useSignature';

const Signup = () => {
  const [emailValid, setEmailValid] = useState(true);
  const [categorySect, setCategorySect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewsletterChecked, setIsNewsletterChecked] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isVisitYourInboxVisible, setIsVisitYourInboxVisible] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const emailRef = useRef();

  const { signatureObject } = useSignature();

  const { setTemporaryToken, signIn } = useAuth();

  useEffect(() => {
    const fetchedToken = JSON.parse(localStorage.getItem('openlogin_store'));

    if (fetchedToken?.sessionId) {
      router.push('/homepage/dashboard2');
      return;
    }
  }, []);

  const chainConfig = {
    chainNamespace: 'solana',
    chainId: '0x1', // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
    rpcTarget: process.env.NEXT_PUBLIC_RPC_TARGET,
    displayName: 'Solana Mainnet',
    blockExplorer: 'https://explorer.solana.com',
    ticker: 'SOL',
    tickerName: 'Solana',
  };

  const web3auth = new Web3AuthNoModal({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    web3AuthNetwork: process.env.NEXT_PUBLIC_AUTH_NETWORK,
    chainConfig: chainConfig,
  });

  const privateKeyProvider = new SolanaPrivateKeyProvider({
    config: { chainConfig },
  });

  const openLoginAdapter = new OpenloginAdapter({
    privateKeyProvider,
  });

  web3auth.configureAdapter(openLoginAdapter);

  useEffect(() => {
    const init = async () => {
      await web3auth.init();
    };

    init();
  }, []);

  const loginHandler = async (provider, e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const regex = /^\S+@\S+\.\S+$/;
    const emailIsValid = regex.test(email);

    if (!provider && !emailIsValid) {
      setEmailValid(false);
      return;
    }

    // setIsLoading(true);
    setIsVisitYourInboxVisible(true);

    let web3authProvider;

    if (!provider) {
      try {
        web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
          loginProvider: 'email_passwordless',
          extraLoginOptions: {
            login_hint: email,
          },
        });
      } catch (err) {
        localStorage.removeItem('openlogin_store');
        router.push("/");
        return;
      }
    } else {
      try {
        web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
          loginProvider: provider,
        });
      } catch (err) {
        localStorage.removeItem('openlogin_store');
        router.push("/");
        return;
      }
    }

    let userInformation;

    try {
      userInformation = await web3auth.getUserInfo();
    } catch (err) {
      localStorage.removeItem('openlogin_store');
      router.push("/");
      return;
    }

    const solanaWallet = new SolanaWallet(web3authProvider);

    let accounts;

    try {
      accounts = await solanaWallet.requestAccounts();
    } catch (err) {
      localStorage.removeItem('openlogin_store');
      router.push("/");
      return;
    }

    const { sign, sign_nonce, sign_issue_at, sign_address } =
      await signatureObject(accounts[0]);

    try {
      const userRequest = await fetch(`/api/proxy?${Date.now()}`, {
        headers: {
          uri: '/private/users/session',
          sign,
          time: sign_issue_at,
          nonce: sign_nonce,
          address: sign_address,
        },
      });

      const user = await userRequest.json();

      if (user.id) {
        signIn({ user });
        // dispatch(counterActions.userAuth(user));
        // localStorage.setItem('user', JSON.stringify(user));
        router.push('/homepage/dashboard2');
        return user;
      }

      if (user.errorMessage === 'UNAUTHORIZED') {
        setTemporaryToken(JSON.parse(localStorage.getItem('openlogin_store')));
        // const token = localStorage.getItem('openlogin_store');

        // dispatch(
        //   counterActions.web3({
        //     token: JSON.parse(token),
        //   })
        // );

        localStorage.removeItem('openlogin_store');

        dispatch(
          counterActions.category({
            email: userInformation.email,
            blockchainAddress: accounts[0],
          })
        );

        // setIsLoading(false);
        setIsVisitYourInboxVisible(false);
        router.replace(`/auth/join/intro`);

        // router.replace('/homepage/dashboard');
        return;
      }
    } catch (e) {
      console.error(e);
      swal({
        title: 'Oops!',
        text: e.message || 'Something went wrong. Kindly try again',
      });
      throw e;
    }
  };

  const loginHandlerGood = async (e) => {
    e.preventDefault()

    const email = emailRef.current.value;
    console.info('Login: email is', email);

    if (!isEmailValid(email)) {
      console.log('Login: email is not valid', email);
      return;
    }
    console.log('Login: email is valid', email);

    setIsVisitYourInboxVisible(true);

    let provider;

    try {
      console.log("Login: creating provider...")
      provider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: 'email_passwordless',
        extraLoginOptions: {
          login_hint: email,
        },
      });
    } catch (error) {
      console.log("Login: ERROR while creating provider...", { error })
      localStorage.removeItem('openlogin_store');
      setIsVisitYourInboxVisible(false);
      return;
    }

    console.log("Login: provider created")

    let userInformation;

    try {
      console.log("Login: getting user information...")
      userInformation = await web3auth.getUserInfo();
      console.log("Login: user information is", userInformation)
    } catch (err) {
      console.log("Login: ERROR while getting user information...", { err })
      localStorage.removeItem('openlogin_store');
      setIsVisitYourInboxVisible(false);
      // router.push("/");
      return;
    }

    console.log("Login: creatinng solana wallet...");
    const solanaWallet = new SolanaWallet(provider);
    console.log("Login: solana wallet created...");
    let accounts;
    console.log("Login: getting accounts of wallet");
    try {
      accounts = await solanaWallet.requestAccounts();
      console.log("Login: accounts", accounts);
    } catch (err) {
      console.log("Login: error getting accounts", { err });
      localStorage.removeItem('openlogin_store');
      setIsVisitYourInboxVisible(true);
      // router.push("/");
      return;
    }

    console.log("Login: constructing object of signatures...");

    const { sign, sign_nonce, sign_issue_at, sign_address } =
      await signatureObject(accounts[0]);
    console.log("Login: signature created", { sign, sign_nonce, sign_issue_at, sign_address });

    try {
      console.log("Login: fetching...")
      const userRequest = await fetch(`/api/proxy?${Date.now()}`, {
        headers: {
          uri: '/private/users/session',
          sign,
          time: sign_issue_at,
          nonce: sign_nonce,
          address: sign_address,
        },
      });

      console.log("Login: fetched done")
      const user = await userRequest.json();
      console.log("Login: json done", user)

      if (user.id) {
        console.log("Login: user has id and we use the auth hook")
        signIn({ user });
        console.log("Login: done!")
        router.replace("/homepage/dashboard2");
        // dispatch(counterActions.userAuth(user));
        // localStorage.setItem('user', JSON.stringify(user));
        // router.push('/homepage/dashboard');
        return user;
      }
      console.log("Login: user has no ID")

      if (user.errorMessage === 'UNAUTHORIZED') {
        console.log("Login: UNAUTHORIZED")
        setTemporaryToken(JSON.parse(localStorage.getItem('openlogin_store')));
        // const token = localStorage.getItem('openlogin_store');

        // dispatch(
        //   counterActions.web3({
        //     token: JSON.parse(token),
        //   })
        // );

        localStorage.removeItem('openlogin_store');

        dispatch(
          counterActions.category({
            email: userInformation.email,
            blockchainAddress: accounts[0],
          })
        );

        // setIsLoading(false);
        router.replace(`/auth/join/intro`);

        // router.replace('/homepage/dashboard');
        return;
      }
    } catch (error) {
      setIsVisitYourInboxVisible(false);
      console.error(error);
      throw error;
    }
  }

  const formSubmitHandler = (path, e) => {
    e.preventDefault();

    dispatch(
      counterActions.category({
        categoryId: path === 'individual' ? '0' : '1',
      })
    );
  };

  const handleSwitchingBetweenLoginAndRegister = () => {
    setIsLogin(prev => !prev);
    setIsNewsletterChecked(false);
  }

  const onTermsAndConditionsClicked = () => { }

  const onPrivacyPolicyClicked = () => { }

  const isEmailValid = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  }

  const getProvider = async () => {
    try {
      console.log("Login: creating provider...")
      provider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: 'email_passwordless',
        extraLoginOptions: {
          login_hint: email,
        },
      });
    } catch (error) {
      console.log("Login: ERROR while creating provider")
      localStorage.removeItem('openlogin_store');
      return;
    }
  }

  return (
    <Fragment>
      <Script src='https://www.googletagmanager.com/gtag/js?id=G-C0J4J56QW5' />
      <Script id='google-analytics'>
        {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
        
                gtag('config', 'G-C0J4J56QW5');
            `}
      </Script>

      {isLoading &&
        createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
      {isLoading &&
        createPortal(<Spinner />, document.getElementById('backdrop-root'))}
      {!categorySect && !isVisitYourInboxVisible && (
        <div
          className='relative rounded bg-[#F0F0FA] max-sm:bg-[white] h-screen w-screen flex items-center justify-center overflow-hidden'
        >
          <form
            className='mx-auto flex flex-col items-center gap-[15px] bg-white py-[40px] px-[30px] rounded relative justify-center'
            style={{
              maxWidth: '449px',
            }}
            id='login'
            name='login'
          >
            <Image
              src={logo}
              alt="Company's logo"
              width={199}
              height={77}
            />
            <p className='text-xl font-medium text-light-black mt-[25px]'>
              Welcome{isLogin && ' back'} to SkyTrade
            </p>
            <p className='text-base text-light-black'>{isLogin ? "Login" : "Register"}</p>
            {isLogin && <p className='text-sm text-light-grey text-center'>Sign in effortlessly usign the authentication method you chose during sign up.</p>}
            <div className='relative flex flex-col gap-[5px] w-full'>
              <label
                className='text-[14px] font-normal'
                style={{ color: emailValid ? 'rgba(0, 0, 0, 0.50)' : '#E04F64' }}
              >
                Email<span className='text-[#E04F64]'>*</span>
              </label>{' '}
              <br />
              <input
                type='email'
                name='email'
                id='email'
                ref={emailRef}
                onChange={() => setEmailValid(true)}
                placeholder='email@mail.com'
                className='rounded-lg font-sans placeholder:font-medium placeholder:text-[#B8B8B8] placeholder:text-sm py-4 px-[22px] focus:outline-none'
                style={{
                  border: emailValid ? '1px solid #87878D' : '1px solid #E04F64',
                }}
              />
              {!emailValid && (
                <p className='text-[11px] italic text-red-600'>
                  Invalid email
                </p>
              )}
            </div>
            {!isLogin && <label className='flex w-full text-[14px] text-[#87878D] gap-[11px]'>
              <input className='w-[18px] h-[18px] cursor-pointer' type="checkbox" id="newsletterCheckbox" name="newsletterCheckbox" checked={isNewsletterChecked} onChange={() => setIsNewsletterChecked(prev => !prev)} />
              Send me newsletter to keep me updated
            </label>}
            <button
              onClick={(e) => loginHandlerGood(e)}
              className='rounded-md bg-dark-blue text-white transition-all duration-500 ease-in-out hover:bg-blue-600 py-4 px-24 text-[15px] w-full'
            >
              Get started
            </button>
            <div className='relative text-center text-[#00000033] flex gap-[15px] w-full items-center align-middle'>
              <div
                style={{
                  width: '100%',
                  height: '1px',
                  background: '#00000033',
                }}
              />
              <p
                className='text-sm'
              >
                or
              </p>
              <div
                style={{
                  width: '100%',
                  height: '1px',
                  background: '#00000033',
                }}
              />
            </div>
            <button
              onClick={loginHandler.bind(null, 'google')}
              className='flex items-center rounded-lg transition-all duration-500 ease-in-out hover:bg-bleach-blue py-4 w-full justify-between pl-[18px] pr-[42px]'
              style={{
                border: '1px solid #595959',
              }}
            >
              <Image
                src='/images/google-logo.png'
                alt="Google's logo"
                width={24}
                height={24}
                className=''
              />
              <p className='text-[#595959] mx-auto'>Connect with Google</p>
            </button>
            <button
              onClick={loginHandler.bind(null, 'google')}
              className='flex items-center rounded-lg transition-all duration-500 ease-in-out hover:bg-bleach-blue py-4 justify-center w-full pl-[18px] text-[#595959]'
              style={{
                border: '1px solid #595959',
              }}
            >
              More Options
            </button>
            <p className='text-[#87878D] text-sm text-center'>By creating an account I agree with <span onClick={onTermsAndConditionsClicked} className='text-[#0653EA] cursor-pointer'>Terms and Conditions</span> and <span onClick={onPrivacyPolicyClicked} className='text-[#0653EA] cursor-pointer'>Privacy Policy</span> agreement</p>
            <div style={{ width: '100%', height: '1px', background: '#00000033' }} />
            <p onClick={handleSwitchingBetweenLoginAndRegister} className='text-[#87878D]'>{isLogin ? "Don't have an account?" : "Already have an account?"} <span className='text-[#0653EA] font-bold cursor-pointer'>{isLogin ? "Register" : "Login"}</span></p>
          </form>
        </div>
      )}
      {isVisitYourInboxVisible && (
        <div className='relative rounded bg-[#F0F0FA] max-sm:bg-[white] h-screen w-screen flex flex-col items-center justify-center gap-[21.5px] overflow-hidden'>
          <div className='mx-auto flex flex-col items-center gap-[15px] bg-white py-[40px] px-[30px] rounded relative justify-center'
            style={{
              maxWidth: '449px',
            }}>
            <Image src={logo} alt="Company's logo" width={199} height={77} />
            <p className='text-xl font-medium text-light-black mt-[25px]'>Welcome to SkyTrade</p>
            <p className='text-[14px] text-center font-normal text-light-grey'>Visit your inbox to access the app using the verification code received via email. Click the code link, it will refresh this page, logging you in instantly.</p>
          </div>
          <p className='text-light-grey text-[14px]'>Didn't receive the email? <span className='text-[#0653EA] cursor-pointer'>Resend</span></p>
        </div>
      )}
    </Fragment>
  );
};

export default Signup;
