import React, { createContext, useState } from 'react';
import useFetchBalance from './useFetchBalance';
import useInitAuth from '@/hooks/useInitAuth';
import useAutoLogout from '@/hooks/useAutoLogout';
import LoginPage from '@/Components/common/LoginPage';


export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  useInitAuth();
  useFetchBalance();

  useAutoLogout();


  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};
