export interface UserType {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    newsletter: boolean;
    KYCStatusId: number;
}

export interface PersonalInformationType {
    name: string;
    email: string;
    phoneNumber: string;
    newsletter: boolean;
    KYCStatusId: number;
}

export interface Web3authContextType {
    web3auth: any;
    setWeb3auth: React.Dispatch<React.SetStateAction<any>>;
    provider: any;
    setProvider: React.Dispatch<React.SetStateAction<any>>;
  }