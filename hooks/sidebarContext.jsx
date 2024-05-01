import React, { createContext, useState } from 'react';
import useFetchBalance from './useFetchBalance';
import useInitAuth from '@/hooks/useInitAuth';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  useInitAuth();
  useFetchBalance();

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};
