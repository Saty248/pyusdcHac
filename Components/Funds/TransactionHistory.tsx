import React, { useState, useEffect } from 'react';

import { MagnifyingGlassIcon,RefreshIcon } from '../../Components/Icons';
import { useMobile } from '@/hooks/useMobile';
import {TransactionHistoryProps } from '../../types';
import { SolanaWallet } from '@web3auth/solana-provider';
import { Connection, PublicKey, SignaturesForAddressOptions, TransactionSignature, ParsedTransactionWithMeta } from '@solana/web3.js';
import moment from 'moment';
import Link from 'next/link';

const TransactionHistory = ({  user,provider,setIsLoading }:TransactionHistoryProps) => {
  const limit=8
    const { isMobile } = useMobile();
    const [transactionHistory, setTransactionHistory] = useState<Array<ParsedTransactionWithMeta | null>>([]);
    let _signatureList:string[];
    const [signatureList, setSignatureList] = useState<Array<string>>([]);
 
    const [lastTransactionHistorySignature,setLastTransactionHistorySignature]=useState<string>()
    const [firstTransactionHistorySignature,setfirstTransactionHistorySignature]=useState<string>()    

      useEffect(() => {        
        if (user && provider && transactionHistory?.length<=0) {         
          getTransactions()
        }
      },[user,provider]);
 
      const fetchTransaction=async(txOptions:SignaturesForAddressOptions)=>{   
        const connection=new Connection(process.env.NEXT_PUBLIC_RPC_TARGET as string) 
        const tokenAcc=await connection.getTokenAccountsByOwner(new PublicKey(`${user?.blockchainAddress}`),{mint:new PublicKey(process.env.NEXT_PUBLIC_MINT_ADDRESS as string)})
        
        const transactionList = await connection.getSignaturesForAddress(new PublicKey(`${tokenAcc.value[0].pubkey.toString()}`),txOptions)
        
        return transactionList
      }


      const getPrevTransactions=async()=>{
        try {
          setIsLoading(true)
          let txOptions:SignaturesForAddressOptions;
          if(signatureList.length>0){
            txOptions={until:firstTransactionHistorySignature}
          }else{
            txOptions={before:firstTransactionHistorySignature}
          }       
        const connection=new Connection(process.env.NEXT_PUBLIC_RPC_TARGET as string) 
        let transactionList = await fetchTransaction(txOptions)
        if(transactionList.length==0){
          return
        }
     
       _signatureList = transactionList.map(transaction=>transaction.signature);
       _signatureList=_signatureList.slice(-limit)
        
    
       let transactionDetails = await connection.getParsedTransactions(_signatureList as TransactionSignature[],{
        maxSupportedTransactionVersion:2
    });
       
         setTransactionHistory(transactionDetails )
         setSignatureList(_signatureList)
         setfirstTransactionHistorySignature(_signatureList[0])
         setLastTransactionHistorySignature(_signatureList.at(-1))
          
        } catch (error) {
          console.log(error)
          setIsLoading(false)
        }
        finally{
          setIsLoading(false)
        }
      
      } 

      const getNextTransactions=async()=>{     
        try {
          setIsLoading(true)
          let txOptions:SignaturesForAddressOptions={
          limit,
          before:lastTransactionHistorySignature
        }              
        const connection=new Connection(process.env.NEXT_PUBLIC_RPC_TARGET as string) 
        let transactionList = await fetchTransaction(txOptions)
        
       _signatureList = transactionList.map(transaction=>transaction.signature);
             
       let transactionDetails = await connection.getParsedTransactions(_signatureList as TransactionSignature[],{
        maxSupportedTransactionVersion:2
    });
         setTransactionHistory(transactionDetails )
         setSignatureList(_signatureList)
         if(_signatureList.length>0){
          
         setfirstTransactionHistorySignature(_signatureList[0])
         setLastTransactionHistorySignature(_signatureList.at(-1))         
         }
          
        } catch (error) {
          console.log(error)
          setIsLoading(false)
        }
        finally{
          setIsLoading(false)
        }
      
      } 
      
      




       const getTransactions=async()=>{
        try {
          setIsLoading(true)
          let txOptions:SignaturesForAddressOptions={limit}     
               
        const connection=new Connection(process.env.NEXT_PUBLIC_RPC_TARGET as string) 
        let transactionList = await fetchTransaction(txOptions)
         

             
       _signatureList = transactionList.map(transaction=>transaction.signature);
               
         let transactionDetails = await connection.getParsedTransactions(_signatureList as TransactionSignature[],{
          maxSupportedTransactionVersion:2
      });
        
         setTransactionHistory(transactionDetails ) 
         setSignatureList(_signatureList)
         
         setfirstTransactionHistorySignature(_signatureList[0])
         setLastTransactionHistorySignature(_signatureList.at(-1))
         
          
        } catch (error) {
          console.error(error)
          setIsLoading(false)
        }
        finally{
          setIsLoading(false)
        }
      
      } 
      


      const handleNextTxPage=async()=>{
        if(transactionHistory.length==0){
          return
        }
         await getNextTransactions() 
         
        
      }

      const handlePrevTxPage=async()=>{
        await getPrevTransactions()
        
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
            onClick={()=>{getTransactions()}}
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
                  let preTokenBalOcject=item?.meta?.preTokenBalances?.filter((item)=>{
                    if(item.owner==user?.blockchainAddress && item.mint==process.env.NEXT_PUBLIC_MINT_ADDRESS ){
                      return item
                    }
                  })
                  
                  let postTokenBalOcject=item?.meta?.postTokenBalances?.filter((item)=>{
                    if(item.owner==user?.blockchainAddress && item.mint==process.env.NEXT_PUBLIC_MINT_ADDRESS){
                      return item
                    }
                  })
                  
                  
                  let difference=0;
                  if(preTokenBalOcject || postTokenBalOcject){
                    if(preTokenBalOcject && postTokenBalOcject){
                      difference=(postTokenBalOcject[0]?.uiTokenAmount?.uiAmount as number) - (preTokenBalOcject[0]?.uiTokenAmount?.uiAmount as number)
                      
                    }else if(preTokenBalOcject==undefined && postTokenBalOcject){
                      difference=postTokenBalOcject[0]?.uiTokenAmount?.uiAmount as number
                      
                    }else if(preTokenBalOcject){
                      difference=-(preTokenBalOcject[0]?.uiTokenAmount?.uiAmount as number)
                     
                    }
                  }
                  
                  
                  
                  let type=difference>0?'Deposit':'Withdraw';                  
                    let accounts=item?.transaction.message.accountKeys
                    
                    accounts?.map((item)=>{
                      
                      if(item.pubkey.toString()=="HmqstutaEpbddgt5hjhJAsnrXhTUfQpveCpyWEvEdnWM"){
                        
                        type='Rental fee'
                      } 
                    })
                    
                  
                    
                  
                  
                  return(<tr>
                    <td className='py-6 text-[#222222] px-5 w-2/12'>{moment.unix(item?.blockTime as number).format("YYYY-MM-DD HH:mm:ss")}</td>
                    <td className='py- text-[#222222] text-clip px-5 w-2/12'><Link href={`https://explorer.solana.com/tx/${signatureList[idx]}`} target='_blank'>{signatureList[idx].substring(0,25)}</Link></td>
                    <td className='py-6 text-[#222222] px-5 w-2/12'>{type}</td>
                    <td className='py-6 text-[#222222] px-5 w-2/12'> {difference.toString()=='NaN'?'Non Usdc Transaction':difference}</td>
                    <td className='py-6 text-[#222222]  px-5 w-2/12'>Finalized</td>
                  </tr>)
                })}
              <tbody> 
            </tbody>
          </table>
          </div>
    
          <div className="flex items-center justify-end">
          {transactionHistory.length==0 && <div className="mx-auto flex gap-[11.71px]">
          <div
                  className={` text-[#87878D] text-base font-normal`}
                  
                >
                  No transactions found.
                </div>
            
            </div>  }
            <div
              className={` text-[#0653EA] text-base font-normal mx-5`}
             onClick={handlePrevTxPage}
            >
              prev
            </div>
           
            
            {(
            <div
              className={`${transactionHistory.length==0?'text-[#87878D]':'text-[#0653EA]'} cursor-pointer text-base font-normal mx-1`}
              onClick={handleNextTxPage}
            >
              Next
            </div>
          )}
          </div>
          </div>
          </div>
    
        </div>
      );
    };
    export default TransactionHistory;
