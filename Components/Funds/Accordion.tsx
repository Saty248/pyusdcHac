"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { AccordionProps, PaymentMethod } from "../../types";
import { chevronDownIcon,chevronUpIcon } from '../Icons';
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk"
import useAuth from '@/hooks/useAuth';

const supportedMethods = [
  {
    icon: "/images/Stripe.svg",
    name: "Stripe",
  },
  {
    icon: "/images/bank-note-arrow.svg",
    name: "Native",
  },
  {
    icon: "/images/ramp.svg",
    name: "Ramp",
  },
];

const Accordion = ({ selectedMethod, setSelectedMethod, activeSection }: AccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
  
    const handleSelection = (method: PaymentMethod) => {
      setSelectedMethod(method);
      setIsOpen(false);
      if (method.name === "Ramp") {
        showRampDepositeAndWithdrawal()
      }
    };
  
    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };

  const showRampDepositeAndWithdrawal = () => {
    new RampInstantSDK({
      url: "https://app.demo.ramp.network",
      hostAppName: 'SKYTRADE APP',
      hostLogoUrl: 'https://app.sky.trade/images/logo.svg',
      hostApiKey: String(process.env.NEXT_PUBLIC_RAMP_TEST_API_KEY),
      defaultAsset: 'SOLANA_USDC',
      userAddress: user?.blockchainAddress,
      enabledFlows: [activeSection === 0 ? 'ONRAMP' : 'OFFRAMP']
    }).show()
  }
  
    return (
      <div className="border rounded-lg ">
        <div
          className="flex justify-between items-center p-2 cursor-pointer"
          onClick={toggleAccordion}
        >
          {selectedMethod.name != "" ? (
            <div className="flex items-center cursor-pointer hover:bg-gray-100 p-2">
              <Image
                src={selectedMethod.icon}
                alt="Placeholder"
                className="w-8 h-8 mr-2"
                width={12}
                height={12}
              />
              <p>{selectedMethod.name}</p>
            </div>
          ) : (
            <div className="font-medium  text-[#838187] text-[12px]">Select</div>
          )}

          <div className="transform transition-transform duration-300">
            {isOpen ? chevronDownIcon() : chevronUpIcon()}
          </div>
        </div>
        {isOpen && (
          <div className=" p-4">
            <ul>
              {supportedMethods.map((method, index) => (
                <li
                  key={index}
                  onClick={() => handleSelection(method)}
                  className="flex items-center cursor-pointer hover:bg-gray-100 p-2"
                >
                  <Image
                    src={method.icon}
                    alt="Placeholder"
                    className="w-8 h-8 mr-2"
                    width={12}
                    height={12}
                  />
                  <p>{method.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

export default Accordion ;

