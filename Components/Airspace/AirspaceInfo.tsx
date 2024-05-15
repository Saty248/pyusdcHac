import React from "react";
import { LocationPointIcon } from "../Icons";

interface AirspaceInfoProps {
  data: any
  setData: React.Dispatch<React.SetStateAction<any>>;
}

const AirspaceInfo: React.FC<AirspaceInfoProps> = ({ data, setData }) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, name: e.target.value }));
  };

  return (
    <>
      <div className="flex items-center gap-[10px] py-4 px-[22px] rounded-lg" style={{ border: "1px solid #4285F4" }}>
        <div className="w-6 h-6">
          <LocationPointIcon />
        </div>
        <p className="font-normal text-[#222222] text-[14px] flex-1">{data.address}</p>
      </div>
      <div className="flex flex-col gap-[5px] mt-3 md:mt-4">
        <label htmlFor="name">
          Name of airspace<span className="text-[#E04F64]">*</span>
        </label>
        <input
          value={data.name}
          onChange={handleNameChange}
          className="py-[16px] px-[22px] rounded-lg text-[14px] outline-none text-[#222222] mt-0.5 md:mt-1"
          style={{ border: "1px solid #87878D" }}
          type="text"
          name="name"
          id="name"
          autoComplete="off"
        />
      </div>
    </>
  );
};

export default AirspaceInfo;
