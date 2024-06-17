import React, { useState, useEffect } from 'react';

import { MagnifyingGlassIcon,RefreshIcon } from '../../Components/Icons';
import { useMobile } from '@/hooks/useMobile';
import {TransactionHistoryProps } from '../../types';
import { SolanaWallet } from '@web3auth/solana-provider';
import { Connection, PublicKey, SignaturesForAddressOptions, TransactionSignature } from '@solana/web3.js';
import moment from 'moment';

const TransactionHistory = ({  user,provider,setIsLoading }:TransactionHistoryProps) => {
  enum PAGE {
    reset,
    before,
    after
  }
  const limit=6
    const { isMobile } = useMobile();
    const [transactionHistory, setTransactionHistory] = useState<Array<any>>([]);
    let _signatureList:string[];
    const [signatureList, setSignatureList] = useState<Array<any>>([]);
    let FirstTransactionHistorySignature:string|null=null
    let lastTransactionHistorySignature:string|null=null
    const [currentPage, setCurrentPage] = useState(1);
      
    



      useEffect(() => {
        //console.log('here effect only',transactionHistory?.length)
        if (user && provider && transactionHistory?.length<=0) {
          console.log(user,provider)
          //console.log('here effect condition')
          getTransactions(PAGE.reset)
        }
      },[user,provider]);

      //console.log(signatureList,FirstTransactionHistorySignature,lastTransactionHistorySignature)
      const getTransactions=async(page:PAGE)=>{
        try {
          setIsLoading(true)
          let TxOptions:SignaturesForAddressOptions;
          //console.log(signatureList)
          FirstTransactionHistorySignature=signatureList?.length>0?signatureList[0]:null
          lastTransactionHistorySignature=signatureList?.length>0?signatureList[signatureList.length-1]:null      
          //console.log(FirstTransactionHistorySignature,lastTransactionHistorySignature)
          
          if(page==PAGE.reset){
            TxOptions={limit}
          }else if(page==PAGE.before){            
            TxOptions={
              limit,
              before:lastTransactionHistorySignature as string
            }
            if(!lastTransactionHistorySignature){
              setCurrentPage(0)
            }
            //console.log(lastTransactionHistorySignature,TxOptions)
          }else{
            if(FirstTransactionHistorySignature){
              //console.log(FirstTransactionHistorySignature)
              TxOptions={
                until:FirstTransactionHistorySignature as string
              }  
            }else{
              console.log(FirstTransactionHistorySignature)
              TxOptions={limit}
              setCurrentPage(1)
            }
            
          }
  
         const solanaWallet = new SolanaWallet(provider);
        const accounts = await solanaWallet.requestAccounts();        
        const connection=new Connection(process.env.NEXT_PUBLIC_RPC_TARGET as string) 
       let transactionList =await connection.getSignaturesForAddress(new PublicKey(`${accounts[0]}`),TxOptions)

       if(transactionList.length==0 && currentPage>1){
        transactionList =await connection.getSignaturesForAddress(new PublicKey(`${accounts[0]}`),{limit})
        setCurrentPage(0)
       }
       if(page=PAGE.after){
        transactionList=transactionList.slice(-limit)
       }  
       //console.log(transactionList)      
       _signatureList = transactionList.map(transaction=>transaction.signature);
        //console.log(_signatureList)        
        let transactionDetails = await connection.getParsedTransactions(_signatureList as TransactionSignature[]);
        //console.log(transactionDetails)
         setTransactionHistory(transactionDetails )
        setSignatureList(_signatureList) 
        } catch (error) {
          console.log(error)
        }
        finally{
          setIsLoading(false)
        }
      
      }
      const handleNextTxPage=async()=>{
        await getTransactions(PAGE.before)
        setCurrentPage((oldpage)=>oldpage+1)
      }

      const handlePrevTxPage=async()=>{
        await getTransactions(PAGE.after)
        setCurrentPage((oldpage)=>oldpage-1)
      }
      return (
        <div className="flex flex-col  gap-5 flex-1 min-w-[89%] sm:min-w-[600px]">
          <div className="flex sm:flex-col md:flex-row  justify-start sm:justify-between items-center">
            <p className="flex font-medium text-xl pt-[14px] pb-[14px] sm:p-0 text-[#222222] w-[89%] ">
              Transaction History
            </p>
            <div
              className="relative px-[22px] py-[16px] bg-white w-[89%] sm:w-[272px] rounded-lg"
              style={{ border: "1px solid #87878D" }}
            >
              <input
                type="text"
                name="searchTransactions"
                id="searchTransactions"
                placeholder="Search Transactions"
                className="outline-none w-full pr-[20px]"
              />
              <div className="w-[17px] cursor-pointer h-[17px] absolute top-1/2 -translate-y-1/2 right-[22px]" 
              
              >
                <MagnifyingGlassIcon />
              </div>
              
            </div>
            <div className='sm:w-[1px] md:w-[5%] cursor-pointer  bg-[#0653EA] text-center font-medium ml-5 p-1 rounded-md'
            onClick={()=>{getTransactions(PAGE.reset)}}
            >
            <RefreshIcon />
            </div>
          </div>
          <div
          className={`flex justify-center overflow-y-auto fund-table-scrollbar h-auto 
          sm:h-[80%] fund-table-scrollbar`}
          style={{ direction: `${isMobile ? "rtl" : "ltr"}` }}
          >
            <div style={{direction: "ltr"}} className="w-[89%] sm:w-[100%] " >
              <div className="overflow-x-auto fund-table-scrollbar">
    
              <table className="w-[100%]" >
                <thead className="sticky top-0 bg-white sm:bg-[#F6FAFF] opacity-100 text-[#7D90B8] uppercase text-sm font-bold tracking-[0.5px]">
                  <tr className="w-full">
                  <th className="text-start py-5 px-5">Date</th>
                  <th className="text-start py-5 px-5">Transaction Id</th>
                  <th className="text-start py-5 px-5">type</th>
                  <th className="text-start py-5 px-5">amount</th>
                  <th className="py-5 px-5 text-start">status</th>
                  </tr>
                </thead>
                {transactionHistory?.map((item,idx)=>{
                  let difference=item?.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount - item?.meta?.preTokenBalances[0]?.uiTokenAmount?.uiAmount
                  //console.log(difference)
                  let type=difference>0?'Deposit':'Withdraw';
                  if(difference.toString()=='NaN'){
                    return null;
                  }
                  return(<tr>
                    <td className='py-6 text-[#222222] px-5 w-2/12'>{moment.unix(item?.blockTime).format("YYYY-MM-DD HH:mm:ss")}</td>
                    <td className='py- text-[#222222] text-clip px-5 w-2/12'>{signatureList[idx].substring(0,25)}</td>
                    <td className='py-6 text-[#222222] px-5 w-2/12'>{type}</td>
                    <td className='py-6 text-[#222222] px-5 w-2/12'> {difference}</td>
                    <td className='py-6 text-[#222222]  px-5 w-2/12'>Finalized</td>
                  </tr>)
                })}
              <tbody> 
            </tbody>
          </table>
          </div>
    
          <div className="flex items-center justify-end">
            <div className="mx-auto flex gap-[11.71px]">
           
            <div
              className={`${currentPage==1?'disabled:true text-[#0653EA] text-base font-normal pointer-events-none	':' disabled:false text-[#0653EA] text-base font-normal'}`}
             onClick={handlePrevTxPage}
            >
              prev
            </div>
          
          {(
            <div
              className={`text-[#0653EA] cursor-pointer text-base font-normal`}
              onClick={handleNextTxPage}
            >
              Next
            </div>
          )}
              
            </div>
            <div className="text-[#87878D] text-left text-[14px] font-normal -tracking-[0.5px] px-5 ">
            Page {currentPage}
          </div>

          </div>
          </div>
          </div>
    
        </div>
      );
    };
    export default TransactionHistory;