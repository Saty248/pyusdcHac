"use client";

import { useContext, useState, useEffect } from "react";
import { AuctionPropertyI } from "@/types";
import { IoClose } from "react-icons/io5";
import AuctionItem from "./AuctionItem";
import Button from "../Shared/Button";
import useAuction, { TransactionStatusEnum } from "@/hooks/useAuction";
import Spinner from "../Spinner";
import SuccessFailPopup from "./SuccessFailPopup";
import InfiniteScroll from "react-infinite-scroll-component";

interface CreateAuctionModalProps {
  onClose: any;
  data: AuctionPropertyI[];
}

const CreateAuctionModal: React.FC<CreateAuctionModalProps> = ({
  onClose,
  data,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    loading,
    airspaceList,
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
  } = useAuction();

  console.log({ airspaceList });

  if (isMobile) {
    return (
      <>
        {isProcessing ? (
          <div className="fixed inset-0 z-50 flex items-start pt-32 justify-center bg-[#294B63] bg-opacity-50 backdrop-blur-[2px]">
            {transactionStatus === TransactionStatusEnum.PENDING ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <Spinner />
                <span className="mt-2 text-white font-semibold">
                  Processing...
                </span>
              </div>
            ) : (
              <SuccessFailPopup
                responseStatus={responseStatus}
                setShowSuccessAndErrorPopup={setIsProcessing}
                data={{
                  address: selectedItems[0].name,
                }}
                popupType={"CREATE"}
                txHash={txHash || ""}
                setShowDetail={onClose}
              />
            )}
          </div>
        ) : (
          <div className="fixed bottom-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-end">
            <div className="relative flex flex-col justify-between w-full h-[685px] bg-white rounded-t-[30px] p-8">
              <div
                onClick={onClose}
                className="absolute right-[1rem] top-[1rem] cursor-pointer"
              >
                <IoClose className="w-4 h-4" />
              </div>

              <div className="text-center">Create Auction</div>
              <div>Select the properties you want to auction</div>

              {loading ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <Spinner />
                  <span className="mt-16">Fetching Verified Airspaces...</span>
                </div>
              ) : (
                airspaceList &&
                <InfiniteScroll
                  dataLength={airspaceList?.length}
                  next={handleNextPage}
                  hasMore={hasMore}
                  loader={<Spinner />}
                  height={450}
                  className="flex flex-col gap-3 thin-scrollbar"
                >
                  {airspaceList?.length > 0 &&
                    airspaceList?.map((item, index) => (
                      <AuctionItem
                        data={item}
                        key={index}
                        onSelectItem={handleSelectItem}
                        onUpdateItem={handleUpdateItem}
                        selected={
                          !!selectedItems.find(
                            (selectedItem) =>
                              selectedItem.propertyId === item.propertyId
                          )
                        }
                        disabled={
                          selectedItemId !== null &&
                          selectedItemId !== item.propertyId
                        } // Disable if another item is selected
                      />
                    ))}
                </InfiniteScroll>
              )}

              {/* <div className="flex justify-between gap-4"> */}
              <Button
                label="Add Properties to Auction"
                onClick={handleAddProperties}
              />
              {/* </div> */}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {isProcessing ? (
        <div className="fixed inset-0 z-50 flex items-start py-32 justify-center bg-[#294B63] bg-opacity-50 backdrop-blur-[2px]	">
          {transactionStatus === TransactionStatusEnum.PENDING ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Spinner />
              <span className="mt-2 text-white font-semibold">
                Processing...
              </span>
            </div>
          ) : (
            <SuccessFailPopup
              responseStatus={responseStatus}
              setShowSuccessAndErrorPopup={setIsProcessing}
              data={{
                address: selectedItems.length ? selectedItems[0].name : "",
              }}
              popupType={"CREATE"}
              txHash={txHash || ""}
              setShowDetail={onClose}
            />
          )}
        </div>
      ) : (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative flex flex-col gap-8 dark:text-darkText w-full md:w-[689px] h-[685px] bg-white rounded-[30px] px-8 py-6">
            <div
              onClick={onClose}
              className="absolute right-[1rem] top-[1rem] cursor-pointer"
            >
              <IoClose className="w-4 h-4" />
            </div>

            <div className="text-center">Create Auction</div>
            <div>Select the properties you want to auction</div>

            {loading ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <Spinner />
                <span className="mt-24">Fetching Verified Airspaces...</span>
              </div>
            ) : (
              airspaceList && 
              <InfiniteScroll
                dataLength={airspaceList?.length}
                next={handleNextPage}
                hasMore={hasMore}
                loader={<Spinner />}
                height={450}
                className="flex flex-col gap-3 thin-scrollbar"
              >
                {airspaceList?.length > 0 &&
                  airspaceList?.map((item, index) => (
                    <AuctionItem
                      data={item}
                      key={index}
                      onSelectItem={handleSelectItem}
                      onUpdateItem={handleUpdateItem}
                      selected={
                        !!selectedItems.find(
                          (selectedItem) =>
                            selectedItem.propertyId === item.propertyId
                        )
                      }
                      disabled={
                        selectedItemId !== null &&
                        selectedItemId !== item.propertyId
                      } // Disable if another item is selected
                    />
                  ))}
              </InfiniteScroll>
            )}

            <div className="flex justify-between gap-4">
              <Button secondary label="Cancel" onClick={onClose} />
              <Button
                label="Add Properties to Auction"
                onClick={handleAddProperties}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAuctionModal;
