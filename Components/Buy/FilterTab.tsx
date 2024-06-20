import ReactSlider from "react-slider";

interface FilterTabProps {
  title: string;
  range: number[];
  setRange: (value: number[]) => void;
}

const FilterTab: React.FC<FilterTabProps> = ({ title, range, setRange }) => {
  const handleInputChange = (setter: any, index: number, value: number) => {
    const newRange = [...range];
    newRange[index] = value;
    setter(newRange);
  };

  return (
    <div className="flex flex-col gap-4">
      <h4>{title}</h4>
      <div>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          value={range}
          onChange={setRange}
          pearling
          minDistance={10}
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-light-grey">Minimum</div>
          <div>
            <input
              type="number"
              value={range[0]}
              onChange={(e) => handleInputChange(setRange, 0, +e.target.value)}
              className="py-2 focus:outline-none border border-light-grey rounded-[8px] text-center max-w-[94px]"
            />
          </div>
        </div>
        <div className="w-4 h-[2px] bg-light-grey mt-4"></div>
        <div>
          <div className="text-sm text-light-grey">Maximum</div>
          <div>
            <input
              type="number"
              value={range[1]}
              onChange={(e) => handleInputChange(setRange, 1, +e.target.value)}
              className="py-2 focus:outline-none border border-light-grey rounded-[8px] text-center max-w-[94px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTab;
