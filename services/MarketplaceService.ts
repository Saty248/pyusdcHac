import { AuctionListingI, AuctionSubmitI } from "@/types";
import Service from "./Service";

const MarketplaceService = () => {
  const { getRequest, postRequest } = Service();

  const getAuctionableProperties = async (
    callerAddress: string | undefined,
    page?: number
  ) => {
    try {
      if (!callerAddress) return [];
      const response = await getRequest({
        uri: `/private/auction-house/get-auctionable-airspaces?page=${page}&limit=${10}`,
      });
      if (!response) {
        return [];
      }
      return response?.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getAuctions = async (
    page: number = 1,
    limit: number = 10,
    min_price = 0,
    max_price = 1000
  ) => {
    try {
      const response = await getRequest({
        uri: `/private/auction-house/get-all-auctions?page=${page}&limit=${limit}&min_price=${min_price}&max_price=${max_price}`,
      });
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  const createAuction = async ({ postData }: { postData: any }) => {
    try {
      const response = await postRequest({
        uri: `/private/auction-house/generate-create-auction-tx`,
        postData,
      });
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  const createAuctionTx = async ({
    postData,
  }: {
    postData: AuctionListingI;
  }) => {
    try {
      const response = await postRequest({
        uri: `/market/nft`,
        postData,
      });
      console.log("test create auction", response);
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  const submitAuction = async (postData: { serializedTx: string }) => {
    try {
      const response = await postRequest({
        uri: `/private/auction-house/send-tx`,
        postData,
      });
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  const searchAuctions = async (
    page: number = 1,
    limit: number = 10,
    searchParam: string | undefined
  ) => {
    try {
      const response = await getRequest({
        uri: `/market/nft/search?searchParam=${searchParam}&page=${page}&limit=${limit}`,
      });
      console.log(response?.data, "hello search");
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  const filterAuctions = async (minPrice: number, maxPrice: number) => {
    try {
      const response = await postRequest({
        uri: `/market/nft/filter?minPrice=${minPrice}&maxPrice=${maxPrice}`,
      });
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  const createBid = async (postData, auction, amount) => {
    try {
      const response = await postRequest({
        uri: `/private/auction-house/generate-place-bid-tx?auction=${auction}&amount=${parseFloat(amount)}`,
        postData,
      });

      console.log(response, "thanks");
      return response;
    } catch (error) {
      console.error(error);
      console.log("error here 2 thanks", error);
      return [];
    }
  };
  const submitSignature = async ({ postData }) => {
    try {
      console.log(postData, "postData");
      // console.log(assetId,signature)
      const response = await postRequest({
        uri: "/private/auction-house/send-tx",
        postData,
      });
      console.log(response, "hello from service");
      return response;
    } catch (error) {
      console.error(error);
      console.log("error here 2 thanks", error);
      return [];
    }
  };
  const getAuctionableAirspaces = async (page: number, limit: number = 10) => {
    try {
      const response = await getRequest({
        uri: `/private/auction-house/get-auctionable-airspaces?page=${page}&limit=${limit}`,
      });
      console.log(response?.data, "hello auctionable");
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getAuctionableProperties,
    getAuctions,
    createAuction,
    submitAuction,
    searchAuctions,
    filterAuctions,
    createBid,
    submitSignature,
    createAuctionTx,
    getAuctionableAirspaces,
  };
};

export default MarketplaceService;
