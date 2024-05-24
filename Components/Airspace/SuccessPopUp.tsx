import { SuccessIcon } from "../Icons";
interface PopUpProps {
    isVisible: boolean;
  }
const PopUp:React.FC<PopUpProps> = ({ isVisible }) => {
    return (
      <div
        className={` z-20 absolute top-[14px] ${isVisible ? "right-0" : "-right-[100%]"} bg-white p-5 flex items-center gap-5 duration-500`}
      >
        <div className="flex items-center justify-center w-[18px] h-[18px]">
          <SuccessIcon />
        </div>
        Congratulations on claiming your piece of the sky successfully!
      </div>
    );
  };
  export default PopUp;