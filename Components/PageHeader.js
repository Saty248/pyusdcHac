import { useState, useEffect } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { useAuth } from '@/hooks/useAuth';
import Link from "next/link";
import { UserIcon } from "./Icons";

const PageHeader = ({ pageTitle, username }) => {
    const { user: selectorUser } = useAuth();
    const [user, setUser] = useState()
    const [token, setToken] = useState('')

    useEffect(() => {
        console.log("KAKA: 0")
        if (selectorUser) {
            console.log("KAKA: 1")
            const authUser = async () => {
                console.log("KAKA: 2")
                const chainConfig = {
                    chainNamespace: 'solana',
                    chainId: '0x1', // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
                    rpcTarget: process.env.NEXT_PUBLIC_RPC_TARGET,
                    displayName: 'Solana Mainnet',
                    blockExplorer: 'https://explorer.solana.com',
                    ticker: 'SOL',
                    tickerName: 'Solana',
                };
                console.log("KAKA: 3")
                const web3auth = new Web3Auth({
                    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,

                    web3AuthNetwork: process.env.NEXT_PUBLIC_AUTH_NETWORK,
                    chainConfig: chainConfig,
                });
                console.log("KAKA: 4")
                await web3auth.initModal();
                // await web3auth.connect();
                let userInfo;
                try {
                    console.log("KAKA: 5")
                    userInfo = await web3auth.getUserInfo();
                } catch (err) {
                    localStorage.removeItem('openlogin_store');
                    router.push('/auth/join');
                    return;
                }

                console.log("KAKA: 6")
                const fetchedToken = JSON.parse(
                    localStorage.getItem('openlogin_store')
                );

                if (!selectorUser) {
                    console.log("KAKA: 7")
                    localStorage.removeItem('openlogin_store');
                    router.push('/auth/join');
                    return;
                }

                console.log("KAKA: 8", selectorUser)
                setToken(fetchedToken.sessionId);
                setUser(selectorUser);
            };
            authUser();
        }
    }, [selectorUser]);

    return (
        <div className="w-full flex flex-col">
            <div className="flex items-center justify-between pt-[20px] pb-[31px] md:pb-[23px] md:pt-[32px] md:pl-[39.71px] md:pr-[41px] text-[#222222] bg-white" style={{ boxShadow: '0px 2px 12px 0px #00000014' }}>
                <p className="md:text-2xl text-xl font-normal md:font-medium mx-auto md:m-0">{pageTitle}</p>
                <Link href={'/homepage/account'}>
                    <div className="hidden gap-[14px] items-center md:flex">
                        <div className="w-6 h-6"><UserIcon /></div>
                        <p>{user?.name}</p>
                    </div>

                </Link>
            </div>
        </div>
    )
}

export default PageHeader;