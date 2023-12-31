import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';
import Spinner from './Spinner';
import Backdrop from './Backdrop';
import logo from '../public/images/logo.jpg';
import logoNoChars from '../public/images/logo-no-chars.png';
import { ArrowCompressIcon, ArrowExpandIcon, DashboardIcon, DroneIcon, EarthIcon, GiftIcon, HelpQuestionIcon, LogoutIcon, MapIcon, ShoppingBagsIcon, WalletIcon } from './Icons';

const Sidebar = () => {
  const router = useRouter();
  const { asPath } = router;
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const SidebarItem = ({ href, text, children, style, onClick }) => {
    const isActive = asPath.includes(href);

    if (onClick !== undefined) {
      return (
        <div onClick={onClick} className={`${style || ''} cursor-pointer py-[7.32px] flex items-center gap-[14.64px] px-[14.64px] w-full hover:text-[#4285F4] hover:bg-[#E9F5FE] hover:font-semibold ${isActive && 'bg-[#E9F5FE] text-[#4285F4]'} rounded-[3.66px]`}>
          <div className='w-6 h-6 flex items-center justify-center'>
            {React.cloneElement(children, { isActive })}
          </div>
          {
            !isCollapsed &&
            <p className={`${isActive ? 'font-semibold text-[#4285F4]' : 'font-normal text-[#5D7285]'} text-[14.64px] tracking-[1%]`}>{text}</p>
          }
        </div>
      )
    }

    return (
      <Link href={href} className={`${style || ''} py-[7.32px] flex items-center gap-[14.64px] px-[14.64px] w-full hover:text-[#4285F4] hover:bg-[#E9F5FE] hover:font-semibold ${isActive && 'bg-[#E9F5FE] text-[#4285F4]'} rounded-[3.66px]`}>
        <div className='w-6 h-6 flex items-center justify-center'>
          {React.cloneElement(children, { isActive })}
        </div>
        {
          !isCollapsed &&
          <p className={`${isActive ? 'font-semibold text-[#4285F4]' : 'font-normal text-[#5D7285]'} text-[14.64px] tracking-[1%]`}>{text}</p>
        }
      </Link>
    )
  }

  const SidebarItemMobile = ({ href, text, children }) => {
    const isActive = asPath.includes(href);

    return (
      <Link href={href} className={`py-[16.87px] flex flex-col items-center gap-2 px-[11.77px] w-full ${isActive && 'text-[#4285F4]'} rounded-[3.66px]`}>
        <div className='w-5 h-5 flex items-center justify-center'>
          {React.cloneElement(children, { isActive })}
        </div>
        <p className={`${isActive ? 'font-semibold text-[#4285F4]' : 'font-normal text-[#5D7285]'} text-[11px] tracking-[1%]`}>{text}</p>
      </Link>
    )
  }

  const logoutHandler = () => {
    setIsLoading(true);
    localStorage.removeItem('openlogin_store');
    localStorage.removeItem('user');
    localStorage.removeItem('signature');
    router.replace('/auth/join');
  };

  return (
    <Fragment>
      {isLoading &&
        createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
      {isLoading &&
        createPortal(<Spinner />, document.getElementById('backdrop-root'))}
      <aside
        className='md:flex hidden relative border-e-2 bg-white px-[21.95px] py-[29.27px] items-center flex-col gap-[14.64px]'
        style={{ width: !isCollapsed ? '297.29px' : "auto", height: '100vh' }}
      >
        <Image
          src={isCollapsed ? logoNoChars : logo}
          alt="Company's logo"
          width={isCollapsed ? 44.62 : 147}
          height={isCollapsed ? 51 : 58}
          className='mb-[29.27px]'
        />
        <SidebarItem href={'/homepage/dashboard'} text={'Dashboard'} children={<DashboardIcon />} />
        <SidebarItem href={'/homepage/airspace'} text={'Airspaces'} children={<EarthIcon />} />
        <SidebarItem href={'/homepage/referral'} text={'Referral Program'} children={<GiftIcon />} />
        <div className='bg-[#00000012] w-full h-[1px]' />
        {!isCollapsed && <p className='font-normal tracking-[1%] text-[#5D7285] self-start px-[14.64px]'>MARKETPLACE</p>}
        <SidebarItem href={'/404'} text={'Buy Airspace'} children={<MapIcon />} />
        <SidebarItem href={'/404'} text={'Rent Airspace'} children={<DroneIcon />} />
        <SidebarItem href={'/404'} text={'Portfolio'} children={<ShoppingBagsIcon />} />
        <SidebarItem href={'/homepage/wallet'} text={'Funds'} children={<WalletIcon />} />
        <div className='bg-[#00000012] w-full h-[1px]' />
        <SidebarItem href={'/404'} text={'Help Center'} children={<HelpQuestionIcon />} />
        <SidebarItem href={'/404'} text={'Logout'} children={<LogoutIcon />} />
        <SidebarItem onClick={() => setIsCollapsed(prev => !prev)} text={'Collapse'} children={isCollapsed ? <ArrowExpandIcon /> : <ArrowCompressIcon />} style={"mt-auto"} />
      </aside>
      <nav className='flex md:hidden fixed bottom-0 left-0 w-full z-50 bg-white'>
        <SidebarItemMobile href={'/homepage/dashboard'} text={"Dashboard"} children={<DashboardIcon />} />
        <SidebarItemMobile href={'/homepage/airspace'} text={"Airspaces"} children={<EarthIcon />} />
        <SidebarItemMobile href={'/404'} text={"Marketplace"} children={<MapIcon />} />
        <SidebarItemMobile href={'/404'} text={"Portfolio"} children={<ShoppingBagsIcon />} />
        <SidebarItemMobile href={'/homepage/referral'} text={"Referral"} children={<GiftIcon />} />
      </nav>
    </Fragment >
  );
};

export default Sidebar;
