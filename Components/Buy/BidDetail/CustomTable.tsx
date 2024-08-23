import React, { useEffect } from "react";
import MarketplaceService from "@/services/MarketplaceService";

interface CustomTableProps{
  header:string[];
  auctionId:number;
}
const CustomTable:React.FC<CustomTableProps> = ({ header,auctionId }) => {
  const { getAuctionWithBid} = MarketplaceService();

  let body;
  useEffect(()=>{
    async function getBids(){
      body = await getAuctionWithBid(auctionId)
      console.log(body,"body")
    }
    getBids()
  },[])
  return (
    <div className="flex flex-col flex-1 min-w-[89%] sm:min-w-[600px] my-[15px]">
      <div className="flex justify-center overflow-y-auto thin-scrollbar sm:h-[80%] thin-scrollbar">
        <div className="w-[89%] sm:w-[100%] ">
          <div className="overflow-x-auto thin-scrollbar flex flex-col">
            <table className="w-[100%]">
              <thead className=" sticky top-0 z-[500] bg-white opacity-100 text-[#7D90B8] uppercase text-sm font-bold tracking-[0.5px]">
                <tr className="w-full py-[15px]">
                  {header.map((th, index) => (
                    <th
                      key={index}
                      className="whitespace-nowrap text-start text-sm font-bold px-2 !w-[28%] min-w-[120px] sm:w-[20%]"
                    >
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body && body.map((transaction, index) => (
                  <tr
                    key={transaction.id}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-[#F0F4FA] sm:bg-[#F6FAFF]"} !rounded-lg `}
                  >
                    <td
                      className={`px-2 leading-5 py-[6px] text-[#222222]  text-[16px] text-start w-[28%] min-w-[120px] sm:w-[20%] rounded-lg`}
                    >
                      {transaction?.price}
                    </td>
                    <td
                      className={`px-2 py-[6px] leading-5 text-[#222222] text-[16px]  text-clip text-start w-[28%] min-w-[120px] sm:w-[20%]`}
                    >
                        {transaction?.date}
                    </td>

                    <td
                      className={`px-2 py-[6px] leading-5 rounded-r-lg text-[#222222] text-[16px] text-center sm:text-start w-[28%] min-w-[120px] sm:w-[20%]`}
                    >
                      {transaction?.from}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomTable;
