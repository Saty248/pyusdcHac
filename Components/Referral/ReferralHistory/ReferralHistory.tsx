// components/ReferralHistory.tsx

import { useState } from 'react';
import {HistoryArrowIcon } from "../../Icons";

interface Transaction {
  date: string;
  amount: string;
  fromTo: string;
  balance: number;
}

const ReferralHistory: React.FC = () => {
  const data: Transaction[] = [
    { date: '1 Apr 24', amount: '+50', fromTo: 'John Doe referral link', balance: 50 },
    // Add more rows as needed
  ];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="">
      <table className="min-w-[600px] bg-white rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 text-[15px] text-[#222222]">Date</th>
            <th className="px-4 py-2 text-[15px] text-[#222222]">Amount</th>
            <th className="px-4 py-2 text-[15px] text-[#222222]">From / To</th>
            <th className="px-4 py-2 text-[15px] text-[#222222]">Balance</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentRows.map((row, index) => (
            <tr key={index}>
              <td className="px-4 py-2 text-[#87878D] text-[15px]">{row.date}</td>
              <td className={`px-4 py-2 ${row.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{row.amount}</td>
              <td className="px-4 py-2 text-[#87878D] text-[15px]">{row.fromTo}</td>
              <td className="px-4 py-2 text-[#87878D] text-[15px]">{row.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4 gap-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => handleClick(pageNumber)}
            className={`mx-1 w-8 h-8 flex items-center justify-center rounded-full ${currentPage === pageNumber ? 'bg-[#5D7285] text-white' : 'text-[#5D7285]'}`}
          >
            {pageNumber}
          </button>
        ))}
        <div className='flex justify-center items-center'>
        <button
         onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-2 px-3 py-1 rounded text-[#5D7285]"
        >
          Next
        </button>
        <HistoryArrowIcon />
        </div>
      </div>
    </div>
  );
};

export default ReferralHistory;
