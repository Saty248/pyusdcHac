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
import { LAMPORTS_PER_SOL, VersionedTransaction,Connection } from "@solana/web3.js";
import { SolanaWallet } from "@web3auth/solana-provider";
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
  const { createAuction, submitSignature,submitAuction, getAuctions, getAuctionableAirspaces } = MarketplaceService();
  const { provider } = useContext(Web3authContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const { user } = useAuth();
  const { web3auth } = useContext(Web3authContext);

  const {  getPropertiesByUserAddress , getTotalAirspacesByUserAddress} = AirspaceRentalService();

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
        const airspaces = await getAuctionableAirspaces(1,10);
        // const airspaces = await getTotalAirspacesByUserAddress(user?.blockchainAddress)

        // if (airspaces.length < 10) {
        //   setHasMore(false);
        // }
        // if (airspaces?.previews?.length < 10) {
        //   setHasMore(false);
        // }
        // console.log(airspaces?.previews,"please")
        console.log(airspaces,"test airspaces 1")
        dispatch(setAirspaceList(airspaces || []));

        // dispatch(setAirspaceList(airspaces?.previews || []));
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
      // const isItemSelected = prevSelectedItems.find(
      //   (selectedItem) => selectedItem.propertyId === item.propertyId
      // );
      const isItemSelected = prevSelectedItems.find(
        (selectedItem) => selectedItem.propertyId === item.id
      );
      let updatedItems;
      if (isItemSelected) {
        // updatedItems = prevSelectedItems.filter(
        //   (selectedItem) => selectedItem.propertyId !== item.propertyId
        // );
        updatedItems = prevSelectedItems.filter(
          (selectedItem) => selectedItem.propertyId !== item.id
        );
        setSelectedItemId(null); // Deselect the item
      } else {
        // updatedItems = [
        //   ...prevSelectedItems,
        //   {
        //     assetId: item.id,
        //     propertyId: item.propertyId,
        //     name: item.address,
        //     minSalePrice: 0,
        //     endDate: null,
        //   },
        // ];
        // @ts-ignore
        updatedItems = [
          ...prevSelectedItems,
          {
            assetId: item.id,
            // propertyId: item.propertyId,
            propertyId: item.id,
            name: item.address,
            minSalePrice: 0,
            endDate: null,
          },
        ];
        // setSelectedItemId(item?.propertyId); // Select the item
        setSelectedItemId(item?.id);
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
    // const balance = parseFloat((userSolBalance / LAMPORTS_PER_SOL).toString());
    // const balance = 0;

    // console.log({ balance });
    // if (balance === 0) {
    //   return toast.info(
    //     "You don't have sufficient funds to perform this operation, please top up your wallet with some Sol to continue"
    //   );
    // }

    // if (parseFloat(userUSDWalletBalance.amount) === 0) {
    //   return toast.info(
    //     "You don't have sufficient funds to perform this operation, please top up your wallet with some USD to continue"
    //   );
    // }

    // if (selectedItems.length === 0) {
    //   return toast.info("You must select an Airspace to continue");
    // }

    console.log("Selected Items:", selectedItems);
    setIsProcessing(true);
    // return;

    try {
      const postData = {
        // assetId: "9SgBVTh47TDMVUExdB9bLsbsKGTRbAjRSa2CU9ANaF5Q",
        assetId: "76R1XPqGh9aVwSBcN8LJ4hM1QHspHK3nLQmUPQo8qDVc",
        seller: "8nUQ9RZLLJkeJPFHatJUF9zVpg4cT7RZ6NHVJFfPpTaC",
        initialPrice: 1,
        secsDuration: 15*24*3600,
      };
      console.log({ postData });
      // const response = true;
      const response = await createAuction({ postData });
      // console.log({ response },"response from createauction");
      // const connection = new Connection('https://api.devnet.solana.com', { commitment: 'finalized' })
      if (response && response?.tx ) {
        const transaction = VersionedTransaction.deserialize(
          new Uint8Array(Buffer.from(response.tx[0], "base64"))
        );

        
        // const solanaWallet = new SolanaWallet(provider);
        // const signedTx = await solanaWallet.signTransaction(transaction);
        const signedTx = await executeTransaction(transaction, provider);
        // const tx2 = await executeTransaction(transaction2, provider);

        if (signedTx ) {
          console.log({ signedTx },"tx1");
          // console.log({ selectedItems });

          const postData: any = {
            serializedTx: signedTx,
          };

          // const sig = await connection.sendTransaction(transaction)
          // await connection.confirmTransaction(sig, 'finalized');
          // console.log("sig test 1: ", sig)


          const sig = await submitSignature({postData});
          // console.log("==========================");
          // console.log({ postData });
          // console.log("==========================");

          // const result = await submitAuction({ postData });

          if (sig) {
            console.log({ sig },"test last sig");
            setTxHash(sig);
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
