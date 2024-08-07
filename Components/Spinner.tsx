import Image from "next/image";
import React from "react";
import { ImSpinner9 } from "react-icons/im";

interface SpinnerProps {
  message?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center z-[500] md:z-50 ">
      <div className="relative flex items-center justify-center animate-spin">
        <ImSpinner9 className=" text-dark-blue w-12 h-12" />{" "}
        {/* <Image
          width={24}
          height={24}
          src={"/images/logo-no-chars.png"}
          alt="img"
          className="mt-2 ml-2 absolute"
        /> */}
      </div>
    </div>
  );
};

export default Spinner;
