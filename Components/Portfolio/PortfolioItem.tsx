import React, { useState } from "react";
import {
  ChevronRightIcon,
  DocumentApprovedIcon,
  DocumentRejectedIcon,
  LocationPointIcon,
  ReviewVerificationIcon,
} from "../Icons";
import { calculateTimeLeft, shortenAddress } from "@/utils";
import { getTimeLeft } from "@/utils/marketplaceUtils";
import Button from "../Shared/Button";
import { useRouter } from "next/navigation";
import UploadedDocuments from "./UploadedDocuments";
import AdditionalDocuments from "./AdditionalDocuments";
import VerificationSuccessPopup from "./VerificationSuccessPopup";

const PortfolioItem = ({
  airspace,
  tags,
  selectAirspace,
  setUploadedDoc,
  requestDocument,
}) => {
  const { type, address } = airspace;
  const [showPopup, setShowPopup] = useState(false);
  const [underReview, setUnderReview] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const getHighestBid = () => {
    const highestBid = airspace?.auction?.currentPrice;

    return `$${highestBid}`;
  };

  return (
    <>
      {type === "receivedBid" || type === "placedBid" ? (
        <div
          onClick={selectAirspace}
          className="flex p-[11px] items-center justify-between gap-[10px] rounded-lg bg-white cursor-pointer"
          style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }}
        >
          <div className="flex items-center gap-[10px] flex-1">
            <div className="w-6 h-6">
              <LocationPointIcon />
            </div>
            <p className="font-normal text-[#222222] text-[14px] flex-1">
              {type === "receivedBid" && "My Airspace -"}{" "}
              {shortenAddress(airspace?.auction?.layer?.property?.address, 35)}
            </p>
          </div>
          <div className="flex gap-6 items-center text-sm">
            {type === "placedBid" && (
              <div>
                Your Bid:{" "}
                <span className="font-bold">${airspace?.placedBid?.price}</span>
              </div>
            )}
            <div>
              Highest Bid: <span className="font-bold">{getHighestBid()}</span>
            </div>

            <div>
              Time Left:{" "}
              <span className="font-bold">
                {calculateTimeLeft(airspace?.auction?.endDate)}
              </span>
            </div>

            {/* {type === "receivedBid" &&
              calculateTimeLeft(airspace?.auction?.endDate).toLowerCase() ===
                "ended" && (
                <button
                  onClick={() =>
                    router.push(
                      `/buy?assetId=${airspace?.auction?.id}&viewHistory=true`
                    )
                  }
                  className="text-sm px-4 py-2 bg-[#4285F4] text-white rounded"
                >
                  Auction History
                </button>
              )} */}

            {/* {type === "placedBid" &&
              calculateTimeLeft(airspace?.auction?.endDate).toLowerCase() !==
                "ended" && (
                <button
                  onClick={() =>
                    router.push(
                      `/buy?assetId=${airspace?.auction?.id}&bid=true`
                    )
                  }
                  className="text-sm px-4 py-2 bg-[#4285F4] text-white rounded"
                >
                  Place Higher Bid
                </button>
              )} */}

            <div className="w-[7px] h-[14px]">
              <ChevronRightIcon />
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={selectAirspace}
          className="p-[11px] items-center justify-between gap-[10px] rounded-lg bg-white cursor-pointer"
          style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }}
        >
          <div className="flex items-center justify-between gap-[10px]  cursor-pointer">
            <div className="flex items-center gap-[10px] flex-1">
              <div className="w-6 h-6">
                <LocationPointIcon />
              </div>
              <p className="font-normal text-[#222222] text-[14px] flex-1">
                {address}
              </p>
            </div>
            <div className="flex gap-[10px] items-center">
              {!!tags[0] && (
                <div
                  onClick={selectAirspace}
                  className="bg-[#DBDBDB] text-[#222222] text-sm font-normal px-[7px] cursor-pointer rounded-[3px]"
                >
                  {type === "land" ? "On Claim" : "On Rent"}
                </div>
              )}
              {!!tags[1] && (
                <div className="bg-[#E7E6E6] text-[#222222] text-sm font-normal px-[7px] cursor-pointer rounded-[3px]">
                  On Sale
                </div>
              )}
              {!!tags[2] && (
                <div className="bg-[#222222] text-white text-sm font-normal px-[7px] cursor-pointer rounded-[3px]">
                  No Fly Zone
                </div>
              )}
              {!!tags[3] && (
                <div className="bg-[#E04F64] text-white text-sm font-normal px-[7px] cursor-pointer rounded-[3px]">
                  Review Offer
                </div>
              )}

              {requestDocument &&
                requestDocument?.length > 0 &&
                !requestDocument[0]?.document &&
                !underReview && (
                  <div
                    onClick={handleButtonClick}
                    className="p-2 border border-orange-500 rounded-md"
                  >
                    <p className="text-orange-500 font-normal text-sm">
                      Additional documents requested
                    </p>
                  </div>
                )}
              {((requestDocument &&
                requestDocument[0]?.status == "SUBMITTED") ||
                underReview) && (
                <div className="flex justify-center items-center gap-2">
                  <div className="w-6 h-6">
                    <ReviewVerificationIcon />
                  </div>
                  <p className="text-orange-500 font-normal text-sm">
                    Documents under review
                  </p>
                </div>
              )}
              {requestDocument && requestDocument[0]?.status == "APPROVED" && (
                <div className="flex justify-center items-center gap-2">
                  <div className="w-6 h-6">
                    <DocumentApprovedIcon />
                  </div>
                  <p className="text-[#1FD387] font-normal text-sm">
                    Documents approved
                  </p>
                </div>
              )}
              {requestDocument && requestDocument[0]?.status == "REJECTED" && (
                <div className="flex justify-center items-center gap-2">
                  <div className="w-6 h-6">
                    <DocumentRejectedIcon />
                  </div>
                  <p className="text-[#E04F64] font-normal text-sm">
                    Documents rejected
                  </p>
                </div>
              )}
              <div className="w-[7px] h-[14px]">
                <ChevronRightIcon />
              </div>
            </div>
          </div>

          {((requestDocument &&
            requestDocument?.length > 0 &&
            requestDocument[0]?.document &&
            requestDocument[0]?.status !==
              RequestDocumentStatus.NOT_SUBMITTED) ||
            underReview) && (
            <UploadedDocuments requestDocument={requestDocument} />
          )}
          {showPopup && !underReview && (
            <AdditionalDocuments
              setUnderReview={setUnderReview}
              showPopup={showPopup}
              setUploadedDoc={setUploadedDoc}
              setShowSuccessToast={setShowSuccessToast}
              closePopup={closePopup}
              requestDocument={requestDocument[0]}
            />
          )}

          {showSuccessToast && <VerificationSuccessPopup />}
        </div>
      )}
    </>
  );
};

export default PortfolioItem;
