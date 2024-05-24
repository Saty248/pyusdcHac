interface ItemProps {
  icon:React.ReactNode;
  title:string;
  text:string;
}

const Item:React.FC<ItemProps> = ({ icon, title, text }) => {
    return (
      <div
        className="py-5 px-[15px] rounded-[30px] bg-white flex flex-col gap-[15px] items-center md:min-w-[225px] md:h-[223px] w-full shadow-[0_12px_34px_-10px_rgba(58,77,233,0.15)]"
      >
        <div
          className="w-[63px] h-[63px] bg-[#E9F5FE] flex items-center justify-center rounded-[50%]"
        >
          <div className="w-9 h-9 flex items-center justify-center">{icon}</div>
        </div>
        <p className="text-[#4285F4] font-semibold text-[18px]">{title}</p>
        <p className="text-[#222222] font-normal text-[14px] text-center">
          {text}
        </p>
      </div>
    );
  };
  export default Item;