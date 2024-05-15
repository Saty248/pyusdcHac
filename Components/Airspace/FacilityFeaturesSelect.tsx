import React, { useState } from "react";

interface FacilityFeatures {
  hasLandingDeck: boolean;
  hasChargingStation: boolean;
  hasStorageHub: boolean;
}

interface FacilityFeaturesSelectProps {
  data: FacilityFeatures;
  setData: React.Dispatch<React.SetStateAction<FacilityFeatures>>;
}

const FacilityFeaturesSelect: React.FC<FacilityFeaturesSelectProps> = ({
  data,
  setData,
}) => {
  const handleChange = (
    feature: keyof FacilityFeatures,
    value: boolean
  ): void => {
    setData((prev) => ({ ...prev, [feature]: value }));
  };

  return (
    <div className="flex-col flex md:flex-row md:items-center gap-[10px] leading-[2rem]">
      <FeatureCheckbox
        label="Landing Deck"
        id="hasLandingDeck"
        checked={data.hasLandingDeck}
        onChange={(value) => handleChange("hasLandingDeck", value)}
      />
      <FeatureCheckbox
        label="Charging Station"
        id="hasChargingStation"
        checked={data.hasChargingStation}
        onChange={(value) => handleChange("hasChargingStation", value)}
      />
      <FeatureCheckbox
        label="Storage Hub"
        id="hasStorageHub"
        checked={data.hasStorageHub}
        onChange={(value) => handleChange("hasStorageHub", value)}
      />
    </div>
  );
};

interface FeatureCheckboxProps {
  label: string;
  id: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const FeatureCheckbox: React.FC<FeatureCheckboxProps> = ({
  label,
  id,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-[5px]">
      <input
        className="w-[18px] h-[18px] cursor-pointer"
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label
        htmlFor={id}
        className="text-[#87878D] text-[14px] font-normal"
      >
        {label}
      </label>
    </div>
  );
};

export default FacilityFeaturesSelect;
