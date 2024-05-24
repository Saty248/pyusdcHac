export type Coordinates = {
    longitude: number;
    latitude: number;
  };

export type Vertex = {
  latitude: number;
  longitude: number;
};

export type WeekDayRange = {
  isAvailable: boolean;
  fromTime: number;
  toTime: number;
  weekDayId: number;
};

export type PropertyData = {
  address: string;
  ownerId?: number;
  propertyStatusId?: number;
  hasChargingStation: boolean;
  hasLandingDeck: boolean;
  hasStorageHub: boolean;
  isRentableAirspace: boolean;
  sell?:boolean;
  title: string;
  transitFee: string;
  noFlyZone: boolean;
  isFixedTransitFee: boolean;
  latitude?: number;
  longitude?: number;
  timezone: string;
  isActive?: boolean | null;
  sellingPrice?:string;
  vertexes?: Vertex[];
  weekDayRanges: WeekDayRange[];
};
export type User = {
  KYCStatusId: number;
  blockchainAddress: string;
  categoryId: number;
  createdAt: string;
  email: string;
  id: number;
  isActive: boolean;
  isAdmin: boolean;
  name: string;
  newsletter: boolean;
  ownedReferralCode: {
    id: number;
    code: string;
    codeChanged: boolean;
  };
  ownedReferralCodeId: number;
  phoneNumber: string;
  updateAt: string;
  usedReferralCode: {
    id: number | null;
    code: string | null;
    codeChanged: boolean;
  } | null;
  usedReferralCodeId: number | null;
};
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
