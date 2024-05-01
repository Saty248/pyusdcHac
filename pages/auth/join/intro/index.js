"use client";

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { shallowEqual, useSelector } from 'react-redux';
import swal from 'sweetalert';
import Head from "next/head";
import Backdrop from '@/Components/Backdrop';
import Spinner from '@/Components/Spinner';
import { Fragment } from 'react';
import logo from '../../../../public/images/logo.jpg';
import useAuth from '@/hooks/useAuth';
import * as Yup from 'yup'
import UserService from "@/services/UserService";

const PartOne = ({ setPart }) => {
    return (
        <Fragment>
            <p className='text-xl font-medium text-light-black mt-[25px]'>
                Unlock Passive Rental Income
            </p>
            <div className='text-[15px] text-light-grey font-normal'>
                <p>💰 <span className='font-bold'>Monetize Your Air Rights Easily:</span> Elevate earnings without changing property ownership.</p>
                <p>🌐 <span className='font-bold'>User-Friendly Air Rights Management:</span> Define and control with ease on our secure platform.</p>
                <p>🚀 <span className='font-bold'>Hassle-Free Passive Income:</span> Gain full control and minimal effort for a steady income.</p>
                <p>🔐 <span className='font-bold'>Secure Access with SkyTrade:</span> Register to control land and airspace, ensuring permissions and receive direct fees into your account.</p>
            </div>
            <p className='text-center text-base text-[#222222]'>Join SkyTrade today and turn your air rights into a lucrative opportunity! 🚀✨</p>
            <button
                onClick={() => setPart(1)}
                className='rounded-md bg-dark-blue text-white transition-all duration-500 ease-in-out hover:bg-blue-600 py-4 px-24 text-[15px] w-full'
            >
                Get started
            </button>
        </Fragment>
    )
}

export const phoneValidationSchema = Yup.object().shape({
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^\+[0-9]+$/, "Phone number must be only digits, and should start with +")
      .min(10, 'Phone number must be at least 10 digits')
      .max(15, 'Phone number must be less than 15 digits'),
  });
export  const checkPhoneIsValid = async (phone) => {
    try {
         await phoneValidationSchema.validate({ phone });
        return {
            status: true,
            message: ""
        }
      } catch (error) {
        return {
            status: false,
            message: error.message
        }
      }

}
const IndividualSignup = () => {

    const {category} = useSelector((state) =>
    {
      const {category} = state.userReducer
      return {category}
    }, shallowEqual );




    const [part, setPart] = useState(0);
    const [name,setName] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const newsletterRef = useRef();
    const referralCodeRef = useRef();

    const router = useRouter();

    const [referralCode1, setReferralCode] = useState({ id: '', code: '' });

    const [status, setStatus] = useState(0)
    const [isNameValid, setIsNameValid] = useState(true);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
    const [isReferralCodeValid, setIsReferralCodeValid] = useState(true);
    const [newsletter, setNewsletter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pageLoad, setPageLoad] = useState(true);
    const [referralDisabled,setReferralDisabled] = useState(false);

    const { createUser } = UserService();

    useEffect(() => {
        setPageLoad(false);
        if (typeof global?.window !== 'undefined') {
            const codeString = localStorage.getItem('referralCode');
            if (!codeString) return;
            const { id, code } = JSON.parse(codeString).response;
            setReferralCode({ id, code })
            setReferralDisabled(true)
        }
    }, [global?.window]);


    const { temporaryToken, signIn } = useAuth();

    const newsletterHandler = () => {
        setNewsletter((prev) => !prev);
    };

    const returnHandler = (e) => {
        e.preventDefault();
        router.push('/auth/join');
    };

    const checkNameIsValid = (name) => {
        return !!name;
    }



    const checkReferralCodeIsValid = (referralCode1) => {
        return true;
    }

    const [errorMessage, setErrorMessage] = useState('')

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const [referralCode] = [, referralCodeRef].map(ref => ref.current?.value);

            if (!checkNameIsValid(name)) {
                setIsNameValid(false);
                return;
            }

            const phoneCheck = await checkPhoneIsValid(phoneNumber)
            if (!phoneCheck.status) {
                setIsPhoneNumberValid(false);
                setErrorMessage(phoneCheck.message)
                return;
            }

            if (!checkReferralCodeIsValid(referralCode1)) {
                setIsReferralCodeValid(false);
                return;
            }
            const userInfo = {
                ...category,
                name,
                newsletter,
                categoryId: status,
                phoneNumber,
                referralCode:referralCode1.code
            };

            setIsLoading(true);

            const responseData = await createUser(userInfo);

            if(responseData && !responseData.errorMessage) {
                signIn({
                    user: responseData,
                });
                setName('');
                setPhoneNumber('');
                referralCodeRef.current.value = '';

                router.replace('/homepage/dashboard2');
            } 
        } catch (error) {
            console.log(error);
            swal({
                title: 'Sorry!',
                text: error.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (pageLoad) {
        return <Spinner />;
    }

    return (
        <Fragment>
            <Head>
                <title>StyTrade - Login</title>
            </Head>
            {isLoading && createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
            {isLoading &&
                createPortal(<Spinner />, document.getElementById('backdrop-root'))}

            <div
                className='relative rounded bg-[#F6FAFF] max-sm:bg-[white] h-screen w-screen flex items-center justify-center overflow-hidden'
            >
                <div
                    className='mx-auto flex flex-col items-center gap-[15px] bg-white py-[40px] px-[30px] rounded relative justify-center'
                    style={{
                        maxWidth: '449px',
                    }}
                >
                    <Image
                        src={logo}
                        alt="Company's logo"
                        width={199}
                        height={77}
                    />
                    {part === 0 && <PartOne setPart={setPart} />
                    }
                    {
                        part === 1 && (
                            <Fragment>
                                <div className='relative flex flex-col gap-[5px] w-full'>
                                    <label
                                        className='text-[14px] font-normal'
                                        style={{ color: isNameValid ? 'rgba(0, 0, 0, 0.50)' : '#E04F64' }}
                                    >
                                        Full Name<span className='text-[#E04F64]'>*</span>
                                    </label>
                                    <input
                                        type='name'
                                        value={name}
                                        onChange={(e) => {
                                            setIsNameValid(true); 
                                            setName(e.target.value);
                                        }}
                                        placeholder='John Doe'
                                        className='rounded-lg font-sans placeholder:font-medium placeholder:text-[#B8B8B8] placeholder:text-sm py-4 px-[22px] focus:outline-none'
                                        style={{ border: isNameValid ? '1px solid #87878D' : '1px solid #E04F64' }}
                                    />
                                    {!isNameValid && (
                                        <p className='text-[11px] italic text-red-600'>
                                            This field is mandatory
                                        </p>
                                    )}
                                </div>
                                <div className='relative flex flex-col gap-[5px] w-full'>
                                    <label
                                        className='text-[14px] font-normal'
                                        style={{ color: isPhoneNumberValid ? 'rgba(0, 0, 0, 0.50)' : '#E04F64' }}
                                    >
                                        Phone<span className='text-[#E04F64]'>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            setIsPhoneNumberValid(true )
                                            setPhoneNumber(e.target.value);
                                            }}
                                        placeholder='Enter your phone number'
                                        className='rounded-lg font-sans placeholder:font-medium placeholder:text-[#B8B8B8] placeholder:text-sm py-4 px-[22px] focus:outline-none'
                                        style={{ border: isPhoneNumberValid ? '1px solid #87878D' : '1px solid #E04F64' }}
                                    />
                                    {!isPhoneNumberValid && (
                                        <p className='text-[11px] italic text-red-600'>
                                            {errorMessage}
                                        </p>
                                    )}
                                </div>
                                <div className='relative flex flex-col gap-[5px] w-full'>
                                    <label
                                        className='text-[14px] font-normal'
                                        style={{ color: true ? 'rgba(0, 0, 0, 0.50)' : '#E04F64' }}
                                    >
                                        Your status<span className='text-[#E04F64]'>*</span>
                                    </label>
                                    <div className='flex flex-col gap-[11px]'>
                                        <label className='rounded-lg py-4 px-[22px] flex gap-[14.5px] items-center text-[14px]' style={{ border: true ? '1px solid #87878D' : '1px solid #E04F64' }}>
                                            <input className='relative w-[16.67px] h-[16.67px] p-[2.5px]' checked={status === 0} value={0} onChange={(e) => setStatus(Number(e.target.value))} style={{ appearance: "none", border: status !== 0 ? "2px solid #222222" : "2px solid #0653EA", backgroundColor: status === 0 ? "#0653EA" : "transparent", borderRadius: "50%", backgroundClip: "content-box" }} type="checkbox" name="individual" id="individual" />
                                            I'm an individual
                                        </label>
                                        <label className='rounded-lg py-4 px-[22px] flex gap-[14.5px] items-center text-[14px]' style={{ border: true ? '1px solid #87878D' : '1px solid #E04F64' }}>
                                            <input className='relative w-[16.67px] h-[16.67px] p-[2.5px]' checked={status === 1} value={1} onChange={(e) => setStatus(Number(e.target.value))} style={{ appearance: "none", border: status !== 1 ? "2px solid #222222" : "2px solid #0653EA", backgroundColor: status === 1 ? "#0653EA" : "transparent", borderRadius: "50%", backgroundClip: "content-box" }} type="checkbox" name="corporate" id="corporate" />
                                            I'm a corporate entity
                                        </label>
                                    </div>
                                    {false && (
                                        <p className='text-[11px] italic text-red-600'>
                                            This field is mandatory
                                        </p>
                                    )}
                                </div>
                                <div className='relative flex flex-col gap-[5px] w-full'>
                                    <label
                                        className='text-[14px] font-normal'
                                        style={{ color: isReferralCodeValid ? 'rgba(0, 0, 0, 0.50)' : '#E04F64' }}
                                    >
                                        Referral Code
                                    </label>
                                    <input
                                        type='referralCode'
                                        ref={referralCodeRef}
                                        value={referralCode1.code}
                                        placeholder='Enter referral code'
                                        onChange={(event)=>{setReferralCode({ ...referralCode1, code: event.target.value })}}
                                        disabled={referralDisabled}
                                        className='rounded-lg font-sans placeholder:font-medium placeholder:text-[#B8B8B8] placeholder:text-sm py-4 px-[22px] focus:outline-none'
                                        style={{ border: isReferralCodeValid ? '1px solid #87878D' : '1px solid #E04F64' }}
                                    />
                                    {!isReferralCodeValid && (
                                        <p className='text-[11px] italic text-red-600'>
                                            Invalid referral code
                                        </p>
                                    )}
                                </div>
                                <div className='w-full bg-[#0653EA] py-[16px] flex items-center justify-center text-white font-normal text-[15px] rounded-lg cursor-pointer' onClick={formSubmitHandler}>Submit</div>

                            </Fragment>
                        )
                    }
                    <div className='flex items-center justify-center pt-5 gap-[11px]'>
                        {[0, 1].map((_, index) => (
                            <div onClick={() => setPart(index)} className='cursor-pointer w-[14px] h-[14px]' style={{ background: index !== part ? '#D9D9D9' : '#0653EA', border: index === part ? '1px solid #D9D9D9' : '#0653EA', borderRadius: "50%" }} />
                        ))}
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default IndividualSignup;
