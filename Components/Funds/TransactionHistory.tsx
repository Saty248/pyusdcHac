import React, { useState, useEffect } from 'react';

import { MagnifyingGlassIcon,RefreshIcon } from '../../Components/Icons';
import { useMobile } from '@/hooks/useMobile';
import {TransactionHistoryProps } from '../../types';
import { SolanaWallet } from '@web3auth/solana-provider';
import { Connection, PublicKey, SignaturesForAddressOptions, TransactionSignature } from '@solana/web3.js';
import moment from 'moment';

const TransactionHistory = ({  user,provider,setIsLoading }:TransactionHistoryProps) => {
  const limit=8
    const { isMobile } = useMobile();
    const [transactionHistory, setTransactionHistory] = useState<Array<any>>([]);
    let _signatureList:string[];
    const [signatureList, setSignatureList] = useState<Array<any>>([]);
 
    const [_lastTransactionHistorySignature,setLastTransactionHistorySignature]=useState<string>()
    const [_firstTransactionHistorySignature,setfirstTransactionHistorySignature]=useState<string>()    

      useEffect(() => {        
        if (user && provider && transactionHistory?.length<=0) {         
          getTransactions()
        }
      },[user,provider]);
 
      const fetchTransaction=async(TxOptions:SignaturesForAddressOptions)=>{
        const solanaWallet = new SolanaWallet(provider);
        const accounts = await solanaWallet.requestAccounts();
        const _user='2qVDbCEtdDGZR2dvvvPiFrrBSUcEvM7gWFQd2UvGA88w' /* accounts[0] */        
        const connection=new Connection(process.env.NEXT_PUBLIC_RPC_TARGET as string) 
        const transactionList = await connection.getSignaturesForAddress(new PublicKey(`${_user}`),TxOptions)
        console.log('gerer',transactionList)
        return transactionList
      }


      const getPrevTransactions=async()=>{
        try {
          setIsLoading(true)
          let TxOptions:SignaturesForAddressOptions;
          if(signatureList.length>0){
            TxOptions={until:_firstTransactionHistorySignature}
          }else{
            TxOptions={before:_firstTransactionHistorySignature}
          }       
        const connection=new Connection(process.env.NEXT_PUBLIC_RPC_TARGET as string) 
        let transactionList = await fetchTransaction(TxOptions)
        if(transactionList.length==0){
          return
        }
     
       _signatureList = transactionList.map(transaction=>transaction.signature);
       _signatureList=_signatureList.slice(-limit)
        
    
        let transactionDetails = await connection.getParsedTransactions(_signatureList as TransactionSignature[]);

        
       
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
          let TxOptions:SignaturesForAddressOptions={
          limit,
          before:_lastTransactionHistorySignature
        }              
        const connection=new Connection(process.env.NEXT_PUBLIC_RPC_TARGET as string) 
        let transactionList = await fetchTransaction(TxOptions)
        
       _signatureList = transactionList.map(transaction=>transaction.signature);
             
        let transactionDetails = await connection.getParsedTransactions(_signatureList as TransactionSignature[]);
      
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
          let TxOptions:SignaturesForAddressOptions={limit}     
               
        const connection=new Connection(process.env.NEXT_PUBLIC_RPC_TARGET as string) 
        let transactionList = await fetchTransaction(TxOptions)
         

             
       _signatureList = transactionList.map(transaction=>transaction.signature);
               console.log(_signatureList)
         let transactionDetails = await connection.getParsedTransactions(_signatureList as TransactionSignature[],{
          maxSupportedTransactionVersion:2
      });
        transactionDetails.forEach((item)=>{
            console.log(item?.transaction.message.accountKeys.forEach((item2)=>{
              console.log(item2.pubkey.toString())
            }))

        })
        console.log(transactionDetails[0]?.meta?.postTokenBalances)
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
                  let preTokenBalOcject=item.meta.preTokenBalances.filter((item)=>{
                    if(item.owner=='2qVDbCEtdDGZR2dvvvPiFrrBSUcEvM7gWFQd2UvGA88w' && item.mint=="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"){
                      return item
                    }
                  })
                  console.log('preTokenBalOcject',preTokenBalOcject)
                  let postTokenBalOcject=item.meta.postTokenBalances.filter((item)=>{
                    if(item.owner=='2qVDbCEtdDGZR2dvvvPiFrrBSUcEvM7gWFQd2UvGA88w' && item.mint=="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"){
                      return item
                    }
                  })
                  let difference=postTokenBalOcject[0]?.uiTokenAmount?.uiAmount - preTokenBalOcject[0]?.uiTokenAmount?.uiAmount
                  
                  let type=difference>0?'Deposit':'Withdraw';                  
                    let accounts=item?.transaction.message.accountKeys
                    
                    let accountInputs:Array<any>=accounts.map((item)=>{
                      console.log(item.pubkey.toString())
                      if(item.pubkey.toString()=="HmqstutaEpbddgt5hjhJAsnrXhTUfQpveCpyWEvEdnWM"){
                        
                        type='Rental fee'
                      } 
                    })
                    
                  
                    
                  
                  
                  return(<tr>
                    <td className='py-6 text-[#222222] px-5 w-2/12'>{moment.unix(item?.blockTime).format("YYYY-MM-DD HH:mm:ss")}</td>
                    <td className='py- text-[#222222] text-clip px-5 w-2/12'>{signatureList[idx].substring(0,25)}</td>
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
