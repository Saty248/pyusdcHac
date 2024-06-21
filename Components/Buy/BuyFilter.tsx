import { useState } from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import ReactSlider from "react-slider";
import FilterTab from "./FilterTab";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { shallowEqual } from "react-redux";
import { setActiveFilters } from "@/redux/slices/userSlice";

const BuyFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [pricePerSqFt, setPricePerSqFt] = useState([0, 0]);
  const dispatch = useAppDispatch();

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
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
            setRange={(value: number[]) => setPriceRange(value)}
          />

          <FilterTab
            title="Price Per Square Foot"
            range={pricePerSqFt}
            setRange={(value: number[]) => setPricePerSqFt(value)}
          />
          <button
            onClick={handleSetActiveFilters}
            className="text-base bg-dark-blue py-2 w-full text-white rounded-lg"
          >
            Save Filter
          </button>
        </div>
        // <div className=" flex flex-col bg-white p-[20px] rounded-[20px] gap-4 max-w-[298px]">
        //   <div className="flex flex-col gap-4">
        //     <h4>Total Price Range</h4>
        //     <div>
        //       <ReactSlider
        //         className="horizontal-slider"
        //         thumbClassName="example-thumb"
        //         trackClassName="example-track"
        //         value={priceRange}
        //         onChange={handlePriceRangeChange}
        //         pearling
        //         minDistance={10}
        //       />
        //     </div>
        //     <div className="flex items-center justify-between">
        //       <div>
        //         <div className="text-sm text-light-grey">Minimum</div>
        //         <div>
        //           <input
        //             type="number"
        //             value={priceRange[0]}
        //             onChange={(e) =>
        //               handleInputChange(setPriceRange, 0, +e.target.value)
        //             }
        //             className="py-2 focus:outline-none border border-light-grey rounded-[8px] text-center max-w-[94px]"
        //           />
        //         </div>
        //       </div>
        //       <div className="w-4 h-[2px] bg-light-grey mt-4"></div>
        //       <div>
        //         <div className="text-sm text-light-grey">Maximum</div>
        //         <div>
        //           <input
        //             type="number"
        //             value={priceRange[1]}
        //             onChange={(e) =>
        //               handleInputChange(setPriceRange, 1, +e.target.value)
        //             }
        //             className="py-2 focus:outline-none border border-light-grey rounded-[8px] text-center max-w-[94px]"
        //           />
        //         </div>
        //       </div>
        //     </div>
        //   </div>

        //   <div className="flex flex-col gap-4">
        //     <h4>Price Per Square Foot</h4>
        //     <div>
        //       <ReactSlider
        //         className="horizontal-slider"
        //         thumbClassName="example-thumb"
        //         trackClassName="example-track"
        //         value={pricePerSqFt}
        //         onChange={handlePricePerSqFtChange}
        //         pearling
        //         minDistance={10}
        //       />
        //     </div>
        //     <div className="flex items-center justify-between">
        //       <div>
        //         <div className="text-sm text-light-grey">Minimum</div>
        //         <div>
        //           <input
        //             type="number"
        //             value={pricePerSqFt[0]}
        //             onChange={(e) =>
        //               handleInputChange(setPricePerSqFt, 0, +e.target.value)
        //             }
        //             className="py-2 focus:outline-none border border-light-grey rounded-[8px] text-center max-w-[94px]"
        //           />
        //         </div>
        //       </div>
        //       <div className="w-4 h-[2px] bg-light-grey mt-4"></div>
        //       <div>
        //         <div className="text-sm text-light-grey">Maximum</div>
        //         <div>
        //           <input
        //             type="number"
        //             value={pricePerSqFt[1]}
        //             onChange={(e) =>
        //               handleInputChange(setPricePerSqFt, 1, +e.target.value)
        //             }
        //             className="py-2 focus:outline-none border border-light-grey rounded-[8px] text-center max-w-[94px]"
        //           />
        //         </div>
        //       </div>
        //     </div>
        //   </div>

        //   <button className="text-base bg-dark-blue py-2 w-full text-white rounded-lg text-[14px]">
        //     Save Filter
        //   </button>
        // </div>
      )}
    </>
  );
};

export default BuyFilter;
