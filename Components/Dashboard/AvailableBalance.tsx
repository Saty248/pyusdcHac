import { FC } from "react";
import { useSelector } from "react-redux";
import { WalletIcon } from "@/Components/Icons";
import { BalanceLoader } from "@/Components/Wrapped";
import Item from "@/Components/Dashboard/Item";

const AvailableBalance: FC = () => {
  const userUSDWalletBalance = useSelector(
    (state: any) => state.value.userUSDWalletBalance
  );

  return (
    <Item
      title={"Available Balance"}
      icon={<WalletIcon isActive />}
      linkText={"View funds"}
      href={"/homepage/funds"}
      style="h-fit"
    >
      {userUSDWalletBalance.isLoading ? (
        <BalanceLoader />
      ) : (
        <div className="flex items-center justify-between">
          <p className="absolute bottom-[12px] left-[26px] text-3xl text-[#4285F4] font-medium">
            ${userUSDWalletBalance.amount}
          </p>
        </div>
      )}
    </Item>
  );
};

export default AvailableBalance;
