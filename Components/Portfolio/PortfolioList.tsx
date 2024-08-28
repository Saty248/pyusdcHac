import React, { useEffect, useState } from "react";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import PortfolioItem from "./PortfolioItem";
import Spinner from "../Spinner";
import AirspacesEmptyMessage from "./AirspacesEmptyMessage";
import usePortfolioList, { PortfolioTabEnum } from "@/hooks/usePortfolioList";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Modal from "../Portfolio/Modal";
import { PropertyData, StatusTypes } from "@/types";

interface PropsI {
  title: string;
  selectAirspace: (data: PropertyData) => void;
  selectedAirspace: PropertyData | null;
  onCloseModal: () => void;
  setUploadedDoc: any;
  uploadedDoc: any;
}

const PortfolioList = ({
  title,
  selectAirspace,
  selectedAirspace,
  onCloseModal,
  setUploadedDoc,
  uploadedDoc,
}: PropsI) => {
  const { user } = useAuth();
  const router = useRouter();
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const {
    handleTabSwitch,
    handlePrevPage,
    handleNextPage,
    loading,
    airspaceList,
    pageNumber,
    activeTab,
    setAirspaceList,
  } = usePortfolioList();

  useEffect(() => {
    if (user && user.KYCStatusId === StatusTypes.NotAttempted) {
      setShowPopup(true);
      return;
    }
  }, [user?.KYCStatusId]);

  return (
    <>
      {selectedAirspace !== null && (
        <Modal
          airspace={selectedAirspace}
          onCloseModal={onCloseModal}
          //@ts-ignore
          setAirspaceList={setAirspaceList}
        />
      )}
      <div
        className="py-[43px] px-[29px] rounded-[30px] bg-white flex flex-col gap-[43px] min-w-[516px] flex-1"
        style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }}
      >
        <h2 className="font-medium text-xl text-[#222222] text-center">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <div
            className={`${activeTab === PortfolioTabEnum.VERIFIED ? "border-b-4  border-[#6CA1F7]" : ""} px-8 py-2 cursor-pointer transition ease-linear delay-75 whitespace-nowrap`}
            onClick={() => handleTabSwitch(PortfolioTabEnum.VERIFIED)}
          >
            Verified
          </div>
          <div
            className={`${activeTab === PortfolioTabEnum.RENTED ? "border-b-4  border-[#6CA1F7]" : ""} px-8 py-2 cursor-pointer transition ease-linear delay-75 whitespace-nowrap`}
            onClick={() => handleTabSwitch(PortfolioTabEnum.RENTED)}
          >
            Rented
          </div>
          <div
            className={`${activeTab === PortfolioTabEnum.PENDING_RENTAL ? "border-b-4  border-[#6CA1F7]" : ""} px-8 py-2 cursor-pointer transition ease-linear delay-75 whitespace-nowrap`}
            onClick={() => handleTabSwitch(PortfolioTabEnum.PENDING_RENTAL)}
          >
            Pending Rented
          </div>

          <div
            className={`${activeTab === PortfolioTabEnum.BIDS ? "border-b-4  border-[#6CA1F7]" : ""} px-8 py-2 cursor-pointer transition ease-linear delay-75 whitespace-nowrap`}
            onClick={() => handleTabSwitch(PortfolioTabEnum.BIDS)}
          >
            Bids and Offers
          </div>

          <div
            className={`${activeTab === PortfolioTabEnum.UNVERIFIED ? "border-b-4  border-[#6CA1F7]" : ""} px-8 py-2 cursor-pointer transition ease-linear delay-75 whitespace-nowrap`}
            onClick={() => handleTabSwitch(PortfolioTabEnum.UNVERIFIED)}
          >
            Pending Verification
          </div>
          <div
            className={`${activeTab === PortfolioTabEnum.REJECTED ? "border-b-4  border-[#6CA1F7]" : ""} px-8 py-2 cursor-pointer transition ease-linear delay-75 whitespace-nowrap`}
            onClick={() => handleTabSwitch(PortfolioTabEnum.REJECTED)}
          >
            Rejected
          </div>
        </div>
        {loading ? (
          <div>
            {" "}
            <Spinner />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-[15px] min-h-[20rem]">
              {activeTab === PortfolioTabEnum.UNVERIFIED && showPopup && (
                <div
                  className="flex w-full rounded-[30px] gap-[15px] bg-white"
                  style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }}
                >
                  <div className="md:w-[50%]  p-6  flex flex-col justify-center items-center md:gap-6 gap-4">
                    <h1 className="text-xl font-medium text-[#222222]  text-center">
                      🚀 Attention Airspace Owner!
                    </h1>
                    <h1 className="text-xl font-medium text-[#222222] block md:hidden">
                      Account verification
                    </h1>
                    <p className="text-sm font-normal text-[#838187] text-center leading-6">
                      Your airspace awaits verification by our operation team.
                      Your account is not verified. We verify the identity of
                      our customers to assess potential risks, prevent fraud,
                      and comply with legal and regulatory requirements.
                      Complete your KYC to expedite the process and ensure swift
                      approval. Plus,
                      <span className="text-[#87878D] text-sm font-bold">
                        {" "}
                        earn 10 SKY points{" "}
                      </span>{" "}
                      as a token of our appreciation! Don't delay - verify now
                      and unlock the full potential of your airspace!
                    </p>

                    <button
                      onClick={() => router.push("/my-account")}
                      className="text-sm font-medium w-full px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      Verify my identity Now
                    </button>
                  </div>
                  <div className="hidden md:block md:w-[50%]">
                    <img
                      src="/images/portfolio.png"
                      alt="Verification Image"
                      className="h-full w-full object-cover rounded-r-[30px]"
                    />
                  </div>
                </div>
              )}
              {airspaceList && airspaceList[0] ? (
                airspaceList?.map((airspace, index) => (
                  <PortfolioItem
                    airspace={airspace}
                    key={index}
                    tags={[true, false, false, false]}
                    requestDocument={airspace?.requestDocument}
                    selectAirspace={() => selectAirspace(airspace)}
                    setUploadedDoc={setUploadedDoc}
                  />
                ))
              ) : (
                <AirspacesEmptyMessage />
              )}
            </div>
            <div className="flex flex-col w-full text-gray-600">
              <div className="flex self-end items-center gap-2 w-[5rem]">
                <button
                  onClick={handlePrevPage}
                  disabled={pageNumber === 1}
                  className={`${pageNumber === 1 ? "cursor-not-allowed" : "cursor-pointer"} p-1 border rounded-lg border-gray-200`}
                >
                  <RxCaretLeft />
                </button>
                <div>{pageNumber}</div>
                <button
                  onClick={handleNextPage}
                  disabled={airspaceList?.length < 9}
                  className={`${airspaceList?.length < 9 ? "cursor-not-allowed" : "cursor-pointer"} p-1 border rounded-lg border-gray-200`}
                >
                  <RxCaretRight />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default PortfolioList;
