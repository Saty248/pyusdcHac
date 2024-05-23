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

export type layers = {
    createdAt?: Date;
    updateAt?: Date;
    id: number;
    tokenId: string;
    propertyId: number;
}

export type propertyStatus = {
    id: number;
    type: string;
}

export type PropertyData = {
    id?: number | string;
    address: string;
    ownerId?: number;
    propertyStatusId?: number;
    hasChargingStation: boolean;
    hasLandingDeck: boolean;
    hasStorageHub: boolean;
    isRentableAirspace: boolean;
    sell?: boolean;
    title: string;
    transitFee: string;
    noFlyZone: boolean;
    isFixedTransitFee: boolean;
    latitude?: number;
    longitude?: number;
    timezone: string;
    isActive?: boolean | null;
    sellingPrice?: string;
    price?: number;
    vertexes?: Vertex[];
    weekDayRanges: WeekDayRange[];
    createdAt?: Date;
    updateAt?: Date;
    layers?: layers[];
    propertyStatus?: propertyStatus;
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

export type Bounds = {
    _ne: {
        lat: number;
        lng: number;
    }
    _sw: {
        lat: number;
        lng: number;
    }
}