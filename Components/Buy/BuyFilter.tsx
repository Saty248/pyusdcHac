import { useState } from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import FilterTab from "./FilterTab";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { shallowEqual } from "react-redux";
import {
  setActiveFilters,
  setPriceRange,
  setIsTriggerRefresh,
} from "@/redux/slices/userSlice";

const BuyFilter = () => {
  const { priceRange } = useAppSelector((state) => {
    const { priceRange } = state.userReducer;
    return { priceRange };
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [pricePerSqFt, setPricePerSqFt] = useState([0, 0]);
  const dispatch = useAppDispatch();

  const handlePriceRangeChange = (newRange: number[]) => {
    dispatch(setPriceRange(newRange));
  };

  const handlePricePerSqFtChange = (newRange) => {
    setPricePerSqFt(newRange);
  };

  const handleInputChange = (setter: any, index: number, value: number) => {
    const newRange = [...setter];
    newRange[index] = value;
    setter(newRange);
  };

  const { activeFilters } = useAppSelector((state) => {
    const { activeFilters } = state.userReducer;
    return { activeFilters };
  }, shallowEqual);

  const calculateActiveFilters = () => {
    let activeFilters = 0;
    if (priceRange[0] > 0 || priceRange[1] > 0) activeFilters++;
    if (pricePerSqFt[0] > 0 || pricePerSqFt[1] > 0) activeFilters++;
    return activeFilters;
  };

  const handleSetActiveFilters = () => {
    const activeFilters = calculateActiveFilters();
    dispatch(setActiveFilters(activeFilters));
    dispatch(setIsTriggerRefresh(true));
  };

  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <div className="flex gap-2 items-center justify-center w-[102px] bg-white/50 p-[10px] rounded-[8px] h-full h-[54px]">
          Filter
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="relative bg-white py-[5px] px-[10px] rounded-[8px] whitespace-nowrap hover:text-white hover:bg-dark-blue transition transition-all ease-in-out duration-150"
          >
            {activeFilters > 0 && (
              <div className="absolute text-xs -top-[5px] text-white -left-[5px] w-4 h-4 bg-dark-blue rounded-full text-center">
                {activeFilters}
              </div>
            )}
            <GiSettingsKnobs />
          </button>
        </div>
        <div className="flex items-center justify-between w-[283px] gap-2 bg-white/50 p-[10px] rounded-[8px] h-[54px]">
          <div className="whitespace-nowrap">{"Didn't find location?"}</div>
          <button className="bg-white py-[5px] px-[10px] rounded-[8px] whitespace-nowrap hover:text-white hover:bg-dark-blue transition transition-all ease-in-out duration-150">
            Request it
          </button>
        </div>
      </div>

      {isFilterOpen && (
        <div className=" flex flex-col bg-white p-[20px] rounded-[20px] gap-4 max-w-[298px]">
          <FilterTab
            title="Total Price Range"
            range={priceRange}
            setRange={(value: number[]) => handlePriceRangeChange(value)}
          />
          <button
            onClick={handleSetActiveFilters}
            className="text-base bg-dark-blue py-2 w-full text-white rounded-lg"
          >
            Save Filter
          </button>
        </div>
      )}
    </>
  );
};

export default BuyFilter;
