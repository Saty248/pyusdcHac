"use client";

import { Fragment, useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { createPortal } from 'react-dom';
import Sidebar from '../../Components/PageHeader';
import PageHeader from '../../Components/PageHeader';
import Spinner from '../../Components/Backdrop';
import Backdrop from '../../Components/Backdrop';
import { checkPhoneIsValid } from '../../pages/auth/join/intro';
import UserService from '../../services/UserService';
import { toast } from 'react-toastify';
import AccountVerification from '../../Components/MyAccount/AccountVerification';
import PersonalInformation from '../../Components/MyAccount/PersonalInformation';
import { UserType, PersonalInformationType } from '../../types';
import React from 'react';
import { useSignature } from "@/hooks/";

const Account  = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [personalInformation, setPersonalInformation] = useState<PersonalInformationType>({
        name: '',
        email: '',
        phoneNumber: '',
        newsletter: false,
        KYCStatusId: 0
    });

    const { user: selectorUser, updateProfile } = useAuth();
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')
    const { signatureObject } = useSignature();
    const { updateUser } = useDatabase()
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('')



    useEffect(() => {
        if (selectorUser) {
            const authUser = async () => {
                const chainConfig = {
                    chainNamespace: 'solana',
                    chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
                    rpcTarget: process.env.NEXT_PUBLIC_RPC_TARGET,
                    displayName: `Solana ${process.env.NEXT_PUBLIC_SOLANA_DISPLAY_NAME}`,
                    blockExplorer: 'https://explorer.solana.com',
                    ticker: 'SOL',
                    tickerName: 'Solana',
                };
                const web3auth = new Web3Auth({
                    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
                    web3AuthNetwork: process.env.NEXT_PUBLIC_AUTH_NETWORK,
                    chainConfig: chainConfig,
                });
                await web3auth.initModal();
                // await web3auth.connect();
                let userInfo;
                try {
                    userInfo = await web3auth.getUserInfo();
                } catch (err) {
                    localStorage.removeItem('openlogin_store');
                    router.push('/auth/join');
                    return;
                }

                const fetchedToken = JSON.parse(
                    localStorage.getItem('openlogin_store')
                );

                if (!selectorUser) {
                    localStorage.removeItem('openlogin_store');
                    router.push('/auth/join');
                    return;
                }

                setToken(fetchedToken.sessionId);
                setUser(selectorUser);
            };
            authUser();
        }
    }, [selectorUser]);

    useEffect(() => {
        if (!user) return;
        const { name, email, phoneNumber, newsletter, KYCStatusId } = user;
        setPersonalInformation({ name, email, phoneNumber, newsletter, KYCStatusId })
    }, [user]);

    const updateDataHandler = async (e) => {
        e.preventDefault();

        const { name, email, phoneNumber, newsletter } = personalInformation;
        // TODO: check if data has changed
        // TODO: check if data is valid
        const check = await  checkPhoneIsValid(phoneNumber)

        if(!check.status){
            setIsPhoneNumberValid(false)
            setErrorMessage(check.message )
            return

        }
        setIsLoading(true);

        try {
            const { sign, sign_nonce, sign_issue_at, sign_address } =
                await signatureObject(user.blockchainAddress);

            const res = await fetch(`/api/proxy?${Date.now()}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    userId: user.id,
                    name,
                    phoneNumber,
                    email,
                    // TODO: newsletter
                }),
                headers: {
                    'Content-Type': 'application/json',
                    uri: '/private/users/update',
                    sign,
                    time: sign_issue_at,
                    nonce: sign_nonce,
                    address: sign_address,
                },
            });

            if (!res.ok || res.statusCode === 500) {
                const errorData = await res.json();
                throw new Error(errorData.errorMessage);
            }

            const userJsonResponse = await res.json();

            if (userJsonResponse.statusCode === 500) {
                throw new Error('something went wrong');
            }

            setIsLoading(false);


            const updatedUser = {
                ...user,
                name,
                phoneNumber,
                newsletter
            };

            updateProfile(updatedUser);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };
    const onVerifyMyAccount = () => {
        setIsLoading(true);
        // const client = new Persona.Client({
        //     templateId: process.env.NEXT_PUBLIC_TEMPLATE_ID,
        //     referenceId: user?.id.toString(),
        //     environmentId: process.env.NEXT_PUBLIC_ENVIRONMENT_ID,
        //     onReady: () => {
        //         setIsLoading(false);
        //         client.open();
        //     },
        // });
    };

    return (
        <Fragment>
            {isLoading && createPortal(<Backdrop />, document?.getElementById('backdrop-root')!)}
            {isLoading && createPortal(<Spinner />, document?.getElementById('backdrop-root')!)}

            <div className="relative rounded bg-[#F6FAFF] h-screen w-screen flex items-center justify-center overflow-hidden">
                <Sidebar />
                <div className="w-full h-full flex flex-col">
                    <PageHeader pageTitle={'Account'} />
                    <section className="relative w-full h-full flex flex-col py-[29px] px-[21px] md:pl-[54.82px] md:pr-[47px] gap-[29px] md:mb-0 mb-[78.22px] overflow-y-auto">
                        <div className="flex flex-col gap-[15px]">
                            <h2 className="text-[#222222] font-normal text-xl">My Profile</h2>
                            <p className="text-[#87878D] font-normal text-base">Update your account settings</p>
                        </div>
                        <AccountVerification
                            KYCStatusId={personalInformation.KYCStatusId}
                            isLoading={isLoading}
                            onVerifyMyAccount={onVerifyMyAccount}
                        />
                        <PersonalInformation
                            personalInformation={personalInformation}
                            setPersonalInformation={setPersonalInformation}
                            isPhoneNumberValid={isPhoneNumberValid}
                            errorMessage={errorMessage}
                            isLoading={isLoading}
                            updateDataHandler={updateDataHandler}
                        />
                    </section>
                </div>
            </div>
        </Fragment>
    );
};

export default Account;
