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
  ownerId: number;
  propertyStatusId: number;
  hasChargingStation: boolean;
  hasLandingDeck: boolean;
  hasStorageHub: boolean;
  // hasPlanningPermission:
  isRentableAirspace: boolean;
  title: string;
  transitFee: string;
  noFlyZone: boolean;
  isFixedTransitFee: boolean;
  latitude: number;
  longitude: number;
  timezone: string;
  isActive: boolean | null;
  vertexes: Vertex[];
  weekDayRanges: WeekDayRange[];
};
