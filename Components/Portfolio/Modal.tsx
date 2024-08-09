import { formatDate } from "@/utils";
import React, { Fragment } from "react";

import { ArrowLeftIcon, CloseIcon, LocationPointIcon } from "../Icons";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
  Image,
} from "@react-pdf/renderer";
import { useAppSelector } from "@/redux/store";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    margin: 10,
    paddingVertical: 10,
    fontSize: 12,
    lineHeight: 1.5,
  },
  bold: {
    fontWeight: "bold",
  },
  footer: {
    fontSize: 12,
    textAlign: "left",
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 60,
    marginVertical: 20,
    margin: "right",
  },

  mapImage: {
    margin: "auto",
    width: 450,
    height: 300,
    marginVertical: 10,
  },
});

const Certificate = ({
  user,
  rentalId,
  dateOfRent,
  timeFrame,
  longitude,
  latitude,
  amount,
  logo,
  qrCode,
}) => (
  <Document>
    <Page style={styles.page}>
      {logo && <Image style={styles.image} src={"/images/logwo.png"} />}
      <Text style={styles.title}>Rental Certificate</Text>
      <View style={styles.section}>
        <Text>
          This certifies that {user.name}, with the blockchain address{" "}
          {user.blockchainAddress} has successfully rented an airspace on
          SkyTrade with the following details:
        </Text>
        <Text style={styles.bold}>Rental ID: {rentalId}</Text>
        <Text style={styles.bold}>Date of Rental: {dateOfRent}</Text>{" "}
        <Text style={styles.bold}>Time Frame: {timeFrame}</Text>
        <Text style={styles.bold}>Amount: {amount}</Text>
      </View>

      <Image
        style={styles.mapImage}
        src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${longitude},${latitude},14/600x600?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`}
      />

      <View style={styles.section}>
        <Text>
          This rental agreement is valid for the specified date and time frame
          mentioned above. This agreement is subject to SkyTrade's Rental
          Agreement and Terms of Service.
        </Text>

        <Text>
          If you have any questions or require more information, please contact
          the SkyTrade team and we will reach out at our earliest convenience.
        </Text>
      </View>
      <View style={styles.footer}>
        <Text>SkyTrade Team</Text>
        <Text>Website: https://app.sky.trade</Text>
        <Text>E-mail: info@sky.trade</Text>
      </View>
    </Page>
  </Document>
);

const Modal = ({ airspace, onCloseModal, isOffer = false }) => {
  const { user } = useAppSelector((state) => {
    const { user } = state.userReducer;
    return { user };
  });

  console.log({ user });
  const handleGenerateCertificate = async () => {
    const rentalId = airspace?.id;
    const dateOfRent = formatDate(airspace?.metadata?.endTime);
    const timeFrame = "9:00 AM - 5:00 PM"; // This should be dynamically set
    const amount = "$100"; // This should be dynamically set
    const logo = "/path/to/logo.png"; // Replace with actual path
    const qrCode = "/path/to/qr-code.png"; // Replace with actual path

    const certificate = (
      <Certificate
        user={user}
        longitude={2.12282}
        latitude={41.380898}
        rentalId={rentalId}
        dateOfRent={dateOfRent}
        timeFrame={timeFrame}
        amount={amount}
        logo={logo}
        qrCode={qrCode}
      />
    );

    const blob = await pdf(certificate).toBlob();
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");
  };

  return (
    <Fragment>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-[30px] md:rounded-[30px] px-[29px] w-full h-full md:h-auto md:w-[689px] z-[500] md:z-50 flex flex-col gap-[15px]">
        <div
          className="relative flex items-center gap-[20px] md:p-0 py-[20px] px-[29px] -mx-[29px] -mt-[30px] md:my-0 md:mx-0 md:shadow-none"
          style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }}
        >
          <div className="w-[16px] h-[12px] md:hidden" onClick={onCloseModal}>
            <ArrowLeftIcon />
          </div>
          <h2 className="text-[#222222] text-center font-medium text-xl break-words">
            {airspace?.address.length > 60
              ? airspace?.address.slice(0, 57) + " ..."
              : airspace?.address}
          </h2>
          <div
            onClick={onCloseModal}
            className="hidden md:block absolute top-0 right-0 w-[15px] h-[15px] ml-auto cursor-pointer"
          >
            <CloseIcon />
          </div>
        </div>
        <div
          className="flex items-center gap-[10px] py-4 px-[22px] rounded-lg"
          style={{ border: "1px solid #4285F4" }}
        >
          <div className="w-6 h-6">
            <LocationPointIcon />
          </div>
          <p className="font-normal text-[#222222] text-[14px] flex-1 break-words">
            {airspace?.address}
          </p>
        </div>

        <div className="flex gap-[15px]">
          <p className="text-[14px] font-normal text-[#222222]">ID:</p>
          <p className="text-[14px] font-normal text-[#87878D] break-all">
            {airspace?.id}
          </p>
        </div>

        {airspace?.metadata?.endTime && (
          <div className="flex gap-[15px]">
            <p className="text-[14px] font-normal text-[#222222]">
              Expiration Date:
            </p>
            <p className="text-[14px] font-normal text-[#87878D]">
              {formatDate(airspace?.metadata?.endTime)}
            </p>
          </div>
        )}

        {isOffer ? (
          <div
            className="flex gap-[20px] md:mt-[15px] mt-auto py-[16px] md:py-0 -mx-[30px] md:mx-0 md:mb-0 -mb-[30px] px-[14px] md:px-0 md:shadow-none"
            style={{ boxShadow: "0px 0px 4.199999809265137px 0px #00000040" }}
          >
            <div className="flex flex-col">
              <p className="font-normal text-[12px] text-[#838187]">
                Offer received
              </p>
              <p className="font-bold text-2xl text-[#222222]">
                {/*  {USDollar.format(99.87)} */}
              </p>
            </div>
            <div
              onClick={onCloseModal}
              className="flex-1 text-[#0653EA] rounded-[5px] bg-white text-center py-[10px] px-[20px] cursor-pointer flex items-center justify-center"
              style={{ border: "1px solid #0653EA" }}
            >
              Decline
            </div>
            <div
              className="flex-1 text-white rounded-[5px] bg-[#0653EA] text-center py-[10px] px-[20px] cursor-pointer flex items-center justify-center"
              style={{ border: "1px solid #0653EA" }}
            >
              Approve
            </div>
          </div>
        ) : (
          <div className="flex gap-[20px] md:mt-[15px] mt-auto -mx-[30px] md:mx-0 md:mb-0 -mb-[30px] px-[14px] md:px-0 py-[16px] md:py-0">
            <div
              onClick={onCloseModal}
              className="flex-1 text-[#0653EA] rounded-[5px] bg-white text-center py-[10px] px-[20px] cursor-pointer flex items-center justify-center"
              style={{ border: "1px solid #0653EA" }}
            >
              Cancel
            </div>
            <button
              onClick={handleGenerateCertificate}
              className="flex-1 text-white rounded-[5px] bg-blue-500 text-center py-[10px] px-[20px] flex items-center justify-center"
            >
              Generate Certificate
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Modal;
