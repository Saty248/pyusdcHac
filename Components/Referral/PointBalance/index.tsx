import { GiftIcon } from "@/Components/Icons";
import { BalanceLoader } from "@/Components/Wrapped";
import { FC } from "react";


interface PropsI {
  point: string | null;
  isLoading: boolean;
}

const PointBalance: FC<PropsI> = ({ point, isLoading }) => {

  return (
    <div className="w-full md:w-[45%] px-4 md:px-[44px]">
      <div className="py-5 px-4 md:px-[15px] rounded-[30px] bg-white gap-4 md:gap-[15px] w-full shadow-xl" style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }}>
        <div className="flex items-end justify-end">
          <div className="w-12 h-12 md:w-[44px] md:h-[42px] rounded-full bg-[#E9F5FE] flex items-center justify-center">
            <div className="w-6 h-6"><GiftIcon isActive={true} /></div>
          </div>
        </div>
        <div className="text-xl md:text-xl font-semibold">SKY Points Balance</div>
        {isLoading ? (
          <div className="mt-4 md:my-5 md:h-14 flex justify-start items-center">
            <BalanceLoader />
          </div>
        ) : (
          <div className="text-blue-500 font-semibold text-xl md:text-xl my-2 md:my-5">{point} SKY Points</div>
        )}

      </div>

    </div>
  );
};

export default PointBalance;