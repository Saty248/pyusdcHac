import { useContext, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import AirspaceRentalService from "@/services/AirspaceRentalService";
import { AuctionSubmitI, PropertyData } from "@/types";
import { Web3authContext } from "@/providers/web3authProvider";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  setAirspaceList,
  setIsTriggerRefresh,
  setUserUSDWalletBalance,
} from "@/redux/slices/userSlice";
import { LAMPORTS_PER_SOL, VersionedTransaction } from "@solana/web3.js";
import { executeTransaction } from "@/utils/rent/transactionExecutor";
import MarketplaceService from "@/services/MarketplaceService";
import { toast } from "react-toastify";
import axios from "axios";

interface SelectedPropertyI {
  assetId: string;
  propertyId: number;
  name: string;
  minSalePrice: number;
  endDate: Date | null;
}

export enum TransactionStatusEnum {
  PENDING,
  SUCCESS,
  FAILED,
}

const useAuction = () => {
  const {
    airspaceList,
    isTriggerRefresh,
    userSolBalance,
    userUSDWalletBalance,
  } = useAppSelector((state) => {
    const {
      airspaceList,
      isTriggerRefresh,
      userSolBalance,
      userUSDWalletBalance,
    } = state.userReducer;
    return {
      airspaceList,
      isTriggerRefresh,
      userSolBalance,
      userUSDWalletBalance,
    };
  });

  const dispatch = useAppDispatch();
  const [selectedItems, setSelectedItems] = useState<SelectedPropertyI[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(
    TransactionStatusEnum.PENDING
  );
  const [responseStatus, setResponseStatus] = useState<"SUCCESS" | "FAIL">(
    "FAIL"
  );
  const [txHash, setTxHash] = useState<string | null | undefined>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null); // Track the selected item
  const { createAuction, submitAuction, getAuctions } = MarketplaceService();
  const { provider } = useContext(Web3authContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const { user } = useAuth();
  const { web3auth } = useContext(Web3authContext);

  const { getAuctionableProperties , getPropertiesByUserAddress} = AirspaceRentalService();

  console.log({ userUSDWalletBalance });

  useEffect(() => {
    (async () => {
      try {
        if (web3auth && web3auth?.status !== "connected") return;

        setLoading(true);
        const assetId =
          airspaceList.length > 0
            ? airspaceList[airspaceList.length - 1]?.id
            : "";
        console.log(user?.blockchainAddress,assetId,"hello 2")
        // const airspaces = await getAuctionableProperties(
        //   user?.blockchainAddress,
        //   "landToken",
        //   10,
        //   String(assetId),
        //   pageNumber
        // );
        const airspaces = await getPropertiesByUserAddress(
          user?.blockchainAddress,
          "landToken",
          10,
          String(assetId),
        );

        if (airspaces.length < 10) {
          setHasMore(false);
        }

        dispatch(setAirspaceList(airspaces || []));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [pageNumber, isTriggerRefresh]);

  useEffect(() => {
    if (user && user.blockchainAddress) {
      const interval = setInterval(async () => {
        try {
          const response = await axios.post(
            String(process.env.NEXT_PUBLIC_SOLANA_API),
            {
              jsonrpc: "2.0",
              id: 1,
              method: "getTokenAccountsByOwner",
              params: [
                user.blockchainAddress,
                {
                  mint: process.env.NEXT_PUBLIC_MINT_ADDRESS,
                },
                {
                  encoding: "jsonParsed",
                },
              ],
            }
          );
          const value = response.data.result.value;
          if (value.length < 1)
            dispatch(
              setUserUSDWalletBalance({
                amount: "0",
                isLoading: false,
              })
            );
          else
            dispatch(
              setUserUSDWalletBalance({
                amount:
                  value[0].account.data.parsed.info.tokenAmount.uiAmountString,
                isLoading: false,
              })
            );
        } catch (error) {
          console.error(error);
          dispatch(
            setUserUSDWalletBalance({
              amount: userUSDWalletBalance.amount,
              isLoading: false,
            })
          );
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [user]);

  const handleNextPage = () => {
    if (!hasMore) return;
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handlePrevPage = () => {
    if (pageNumber === 1) return;
    setHasMore(true);
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  const handleSelectItem = (item: PropertyData) => {
    console.log("==========================");
    console.log({ item });
    console.log("==========================");

    setSelectedItems((prevSelectedItems) => {
      const isItemSelected = prevSelectedItems.find(
        (selectedItem) => selectedItem.propertyId === item.propertyId
      );

      let updatedItems;
      if (isItemSelected) {
        updatedItems = prevSelectedItems.filter(
          (selectedItem) => selectedItem.propertyId !== item.propertyId
        );
        setSelectedItemId(null); // Deselect the item
      } else {
        updatedItems = [
          ...prevSelectedItems,
          {
            assetId: item.id,
            propertyId: item.propertyId,
            name: item.address,
            minSalePrice: 0,
            endDate: null,
          },
        ];
        // @ts-ignore
        setSelectedItemId(item?.propertyId); // Select the item
      }

      return updatedItems;
    });
  };

  const handleUpdateItem = (
    id: number,
    minSalePrice: number,
    endDate: Date | null
  ) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = prevSelectedItems.map((selectedItem) =>
        selectedItem.propertyId === id
          ? { ...selectedItem, minSalePrice, endDate }
          : selectedItem
      );
      return updatedItems;
    });
  };

  const handleAddProperties = async () => {
    console.log({ selectedItems });
    // return;
    const balance = parseFloat((userSolBalance / LAMPORTS_PER_SOL).toString());
    // const balance = 0;

    console.log({ balance });
    if (balance === 0) {
      return toast.info(
        "You don't have sufficient funds to perform this operation, please top up your wallet with some Sol to continue"
      );
    }

    if (parseFloat(userUSDWalletBalance.amount) === 0) {
      return toast.info(
        "You don't have sufficient funds to perform this operation, please top up your wallet with some USD to continue"
      );
    }

    if (selectedItems.length === 0) {
      return toast.info("You must select an Airspace to continue");
    }

    console.log("Selected Items:", selectedItems);
    setIsProcessing(true);
    // return;

    try {
      const postData = {
        propertyId: selectedItems[0].propertyId,
        listingType: "Auction",
        isActive: true,
        listingPrice: selectedItems[0].minSalePrice,
        endDate: selectedItems[0].endDate,
      };
      console.log({ postData });

      const response = await createAuction({ postData });
      console.log({ response });
      if (response && response.tx) {
        const transaction1 = VersionedTransaction.deserialize(
          new Uint8Array(Buffer.from(response.tx[0], "base64"))
        );

        const transaction2 = VersionedTransaction.deserialize(
          new Uint8Array(Buffer.from(response.tx[1], "base64"))
        );

        const tx1 = await executeTransaction(transaction1, provider);
        const tx2 = await executeTransaction(transaction2, provider);

        if (tx1 && tx2) {
          console.log({ tx1, tx2 });
          console.log({ selectedItems });

          const postData: AuctionSubmitI = {
            signatures: [tx1, tx2],
            assetId: selectedItems[0].assetId,
          };
          console.log("==========================");
          console.log({ postData });
          console.log("==========================");

          const result = await submitAuction({ postData });

          if (result && result.txid.length > 0) {
            console.log({ result });
            setTxHash(result.txid[0]);
            dispatch(setIsTriggerRefresh(true));
            setTransactionStatus(TransactionStatusEnum.SUCCESS);
            setResponseStatus("SUCCESS");
            setSelectedItems([]);
            setSelectedItemId(null);
          } else {
            setTransactionStatus(TransactionStatusEnum.FAILED);
            setResponseStatus("FAIL");
          }
        } else {
          setTransactionStatus(TransactionStatusEnum.FAILED);
          setResponseStatus("FAIL");
        }
      } else {
        setTransactionStatus(TransactionStatusEnum.FAILED);
        setResponseStatus("FAIL");
      }
    } catch (error) {
      console.log({ error });
      setResponseStatus("FAIL");
    }
  };

  useEffect(() => {
    setIsProcessing(false);
  }, []);

  return {
    loading,
    airspaceList,
    pageNumber,
    handlePrevPage,
    handleNextPage,
    hasMore,
    handleSelectItem,
    handleAddProperties,
    handleUpdateItem,
    txHash,
    isProcessing,
    setIsProcessing,
    transactionStatus,
    responseStatus,
    selectedItemId,
    selectedItems,
    userUSDWalletBalance,
    userSolBalance,
  };
};

export default useAuction;
