import React from "react";

interface AirspaceOptionsProps {
  data: any
  setData: React.Dispatch<React.SetStateAction<any>>;
}

const AirspaceOptions: React.FC<AirspaceOptionsProps> = ({ data, setData }) => {
  const handleRentChange = () => {
    setData((prev) => ({
      ...prev,
      rent: !prev.rent,
      sell: false,
    }));
  };

  const handleSellChange = () => {
    setData((prev) => ({
      ...prev,
      sell: !prev.sell,
      rent: false,
    }));
  };

  return (
    <div className="flex flex-col gap-[10px] mt-2 md:mt-3">
      <p className="text-[14px] font-normal text-[#838187]">
        Are you looking to Rent or Sell your airspace?
      </p>
      <div className="flex items-center gap-[7px]">
        <Checkbox
          label="Rent"
          checked={data.rent}
          onChange={handleRentChange}
        />
        <Checkbox
          label="Sell"
          checked={data.sell}
          disabled
          onChange={handleSellChange}
        />
      </div>
    </div>
  );
};

interface CheckboxProps {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, disabled, onChange }) => {
  return (
    <>
      <input
        className="h-[18px] w-[18px] cursor-pointer"
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label htmlFor={label}>{label}</label>
    </>
  );
};

export default AirspaceOptions;
