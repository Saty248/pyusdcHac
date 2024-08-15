import { CategoryI, PropertyData, User, UserUSDWalletBalanceI } from "@/types";
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { number } from "yup";

interface UserState {
  newAirspaceModal: boolean;
  additionalInfoModal: boolean;
  airspaceData: {};
  category: CategoryI;
  user: User | null;
  isWaitingScreenVisible: boolean;
  userUSDWalletBalance: UserUSDWalletBalanceI;
  userSolBalance: number;
  activeFilters: number;
  isCreateAuctionModalOpen: boolean;
  airspaceList: PropertyData[];
  selectedproperty: PropertyData[];
  isTriggerRefresh: boolean;
  priceRange: number[];
  endDate: string | null;
  minSalePrice: number;
  assetId: string;
}

const initialState: UserState = {
  newAirspaceModal: false,
  additionalInfoModal: false,
  airspaceData: {},
  category: { email: "", blockchainAddress: "" },
  user: null,
  userSolBalance: 0,
  isWaitingScreenVisible: false,
  userUSDWalletBalance: { amount: "0", isLoading: true },
  activeFilters: 0,
  isCreateAuctionModalOpen: false,
  airspaceList: [],
  selectedproperty: [],
  isTriggerRefresh: false,
  priceRange: [0, 0],
  endDate: null,
  minSalePrice: 0,
  assetId: "",
};

const userSlice: Slice<UserState> = createSlice({
  name: "user",
  initialState,
  reducers: {
    setNewAirspaceModal: (state, action: PayloadAction<boolean>) => {
      state.newAirspaceModal = action.payload;
    },

    setAdditionalInfoModal: (state, action: PayloadAction<boolean>) => {
      state.additionalInfoModal = action.payload;
    },

    setAirspaceData: (state, action: PayloadAction<{}>) => {
      state.airspaceData = action.payload;
    },
    setCategory: (state, action: PayloadAction<CategoryI>) => {
      state.category = action.payload;
    },
    setIsWaitingScreenVisible: (state, action: PayloadAction<boolean>) => {
      state.isWaitingScreenVisible = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setUserUSDWalletBalance: (
      state,
      action: PayloadAction<UserUSDWalletBalanceI>
    ) => {
      state.userUSDWalletBalance = action.payload;
    },

    setActiveFilters: (state, action: PayloadAction<number>) => {
      state.activeFilters = action.payload;
    },

    setIsCreateAuctionModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCreateAuctionModalOpen = action.payload;
    },

    setAirspaceList: (state, action: PayloadAction<PropertyData[]>) => {
      state.airspaceList = action.payload;
    },
    setSelectedproperty: (state, action: PayloadAction<PropertyData[]>) => {
      state.selectedproperty = action.payload;
    },

    setIsTriggerRefresh: (state, action: PayloadAction<boolean>) => {
      state.isTriggerRefresh = action.payload;
    },

    setPriceRange: (state, action: PayloadAction<number[]>) => {
      state.priceRange = action.payload;
    },

    setUserSolBalance: (state, action: PayloadAction<number>) => {
      state.userSolBalance = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string | null>) => {
      state.endDate = action.payload;
    },
    setMinSalePrice: (state, action: PayloadAction<number>) => {
      state.minSalePrice = action.payload;
    },
    setAssetId: (state, action: PayloadAction<string>) => {
      state.assetId = action.payload;
    },
  },
});

export const {
  setNewAirspaceModal,
  setAdditionalInfoModal,
  setAirspaceData,
  setCategory,
  setIsWaitingScreenVisible,
  setUser,
  setUserUSDWalletBalance,
  setActiveFilters,
  setIsCreateAuctionModalOpen,
  setAirspaceList,
  setSelectedproperty,
  setIsTriggerRefresh,
  setPriceRange,
  setUserSolBalance,
  setEndDate,
  setMinSalePrice,
  setAssetId,
} = userSlice.actions;
export default userSlice.reducer;
