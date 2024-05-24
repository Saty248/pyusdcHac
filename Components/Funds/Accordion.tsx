import React, { useState } from 'react';
import Image from 'next/image';
import { AccordionProps, PaymentMethod } from "../../types";

const Accordion = ({ selectedMethod, setSelectedMethod }: AccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleSelection = (method: PaymentMethod) => {
      setSelectedMethod(method);
      setIsOpen(false);
    };
  
    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };
  
    const supportedMethods = [
      {
        icon: "/images/Stripe.svg",
        name: "Stripe",
      },
      {
        icon: "/images/bank-note-arrow.svg",
        name: "Native",
      },
    ];
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

const chevronDownIcon = () => (
    <svg width="24" height="24" fill="currentColor" className="bi bi-chevron-down">
      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 011.708-.708L12 13.293l8.646-8.646a.5.5 0 01.708.708l-9 9a.5.5 0 01-.708 0l-9-9z" />
    </svg>
  );
  
  const chevronUpIcon = () => (
    <svg width="24" height="24" fill="currentColor" className="bi bi-chevron-up">
      <path fillRule="evenodd" d="M1.646 15.354a.5.5 0 01.708-.708L12 20.293l8.646-8.647a.5.5 0 01.708.708l-9 9a.5.5 0 01-.708 0l-9-9z" />
    </svg>
  );