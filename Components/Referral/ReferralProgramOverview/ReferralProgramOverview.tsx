import { EarthIcon, GiftIcon, ShareIcon } from "@/Components/Shared/Icons";
import { Fragment } from "react";
import Item from "./Item";
import HorizontalSeparatorLine from "./HorizontalSeparatorLine";
import { useMobile } from "@/hooks/useMobile";
interface ReferralProgramOverviewProps {
  activeSection: number;
  section: number;
}
const ReferralProgramOverview: React.FC<ReferralProgramOverviewProps> = ({
  activeSection,
  section,
}) => {
  const { isMobile } = useMobile();

  if (activeSection !== section && isMobile) return;
  return (
    <Fragment>
      <div className="px-[40px] flex flex-col gap-[15px]">
        <p className="text-[#222222] text-xl font-normal">
          Share and Earn! 🚀✨
        </p>
        <p className="text-[#87878D] text-[15px] font-normal">
          Invite your friends and neighbours to SkyTrade. If they register and
          claim airspaces, you receive:
        </p>
        <div className="text-[#4285F4] text-[15px] font-normal">
          <ul className="list-disc pl-5">
          <li>You earn <span className="font-bold text-[20px]">+5 SKY Points</span> for each successful referral registration when your friend creates an account and claims a property.</li>
          <li>Your friend also gets <span className="font-bold text-[20px]">+5 SKY Points</span> upon creating an account and claiming a property.</li>
          <li>On top of that, you'll receive a fantastic bonus: <span className="font-bold text-[20px]">+10%</span> on top of the passive income generated by those you refer, <span className="font-bold text-[20px]">FOREVER!</span></li>
          </ul>
       </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-9 px-[35px] md:px-[51px] md:mt-6">
        <Item
          icon={<ShareIcon color={undefined} />}
          title={"Share"}
          text={"Send your invite link or code to your friends and explain them how cool is SkyTrade"}
        />
        <HorizontalSeparatorLine />
        <Item
          icon={<EarthIcon  />}
          title={"Register & Claim"}
          text={"Let them register and claim their airspaces using your referral link or code"}
        />
        <HorizontalSeparatorLine />
        <Item
          icon={<GiftIcon  />}
          title={"Earn"}
          text={"You and your friends are rewarded with 5 SKY points and more"}
        />
      </div>
    </Fragment>
  );
};
export default ReferralProgramOverview;