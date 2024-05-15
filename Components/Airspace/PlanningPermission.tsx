import React from "react";

interface PlanningPermissionProps {
  data: {
    hasPlanningPermission: boolean | null;
  };
  setData: React.Dispatch<React.SetStateAction<{
    hasPlanningPermission: boolean | null;
  }>>;
}

const PlanningPermission: React.FC<PlanningPermissionProps> = ({
  data,
  setData,
}) => {
  return (
    <div className="mt-4">
      <p className="text-[16px] md:text-[14px] font-normal text-[#838187]">
        Do you currently have zoning or planning permission to develop above
        your land or property?{" "}
        <span className="italic text-[12px] md:text-[10px]">
          (Your answer won't affect your claim)
          <span className="text-[#E04F64]">*</span>
        </span>{" "}
      </p>
      <div className="flex items-center gap-[7px] text-[#87878D] text-[14px] mt-4">
        <Checkbox
          label="Yes"
          checked={data.hasPlanningPermission === true}
          onChange={() => setData((prev) => ({ ...prev, hasPlanningPermission: true }))}
        />
        <Checkbox
          label="No"
          checked={data.hasPlanningPermission === false}
          onChange={() => setData((prev) => ({ ...prev, hasPlanningPermission: false }))}
        />
        <Checkbox
          label="I don't Know"
          checked={data.hasPlanningPermission === null}
          onChange={() => setData((prev) => ({ ...prev, hasPlanningPermission: null }))}
        />
      </div>
    </div>
  );
};

interface CheckboxProps {
  label: string;
  checked: boolean | null;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <>
      <input
        className="relative h-[16.67px] w-[16.67px] cursor-pointer bg-cover p-[2.5px]"
        checked={checked || false}
        onChange={onChange}
        style={{
          appearance: "none",
          border: checked !== null ? "2px solid #222222" : "2px solid #0653EA",
          backgroundColor: checked ? "#0653EA" : "transparent",
          borderRadius: "50%",
          backgroundClip: "content-box",
        }}
        type="checkbox"
      />
      <label>{label}</label>
    </>
  );
};

export default PlanningPermission;
