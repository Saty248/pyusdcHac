import { Dispatch, SetStateAction } from "react";
export interface Transaction {
    token: boolean;
    timestamp: number;
    id: string;
    date: string;
    transHash: string;
    hash: string;
    destination: string;
    amount: number;
    status: string;
  }
  
  export interface User {
    blockchainAddress: string;
  }
  
  export interface TransactionHistoryProps {
    transactions: Transaction[];
    user: User;
  }

  
  export interface Web3authContextType {
    web3auth: any;
    setWeb3auth: React.Dispatch<React.SetStateAction<any>>;
    provider: any;
    setProvider: React.Dispatch<React.SetStateAction<any>>;
  }
 

 export interface AvailableBalanceProps {
    solbalance: number;
  }
  
  export interface UserUSDWalletBalance {
    isLoading: boolean;
    amount: number;
  }
  
  export interface RootState {
    value: {
      userUSDWalletBalance: UserUSDWalletBalance;
    };
  }
  

 export interface DepositAndWithdrawProps {
  walletId: string;
  activeSection: number;
  setActiveSection: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setreFetchBal: Dispatch<SetStateAction<boolean>>;
  refetchBal: boolean;
  setTokenBalance: Dispatch<SetStateAction<number>>;
  tokenBalance: number;
  solbalance: number;
}

 export interface AccordionProps {
    selectedMethod: { icon: string; name: string };
    setSelectedMethod: Dispatch<SetStateAction<{ icon: string; name: string }>>;
  }
  
  export interface PaymentMethod {
    icon: string;
    name: string;
  }

export interface TooltipProps {
  isCopied: boolean;
}

export interface ConnectionConfig {
    rpcTarget: string;
  }

  