"use client";

import React, { useState } from "react";
import Image from "next/image";
import { chevronDownBidIcon, chevronUpBidIcon } from "@/Components/Icons";

const Accordion = ({ content, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleAccordion}
      >
        {
          <div className="text-light-black text-[15px] leading-[22.5px] font-500">
            {title}
          </div>
        }

        <div className="transform transition-transform duration-300">
          {isOpen ? chevronUpBidIcon() : chevronDownBidIcon()}
        </div>
      </div>
      {isOpen && <div>{content}</div>}
    </div>
  );
};

export default Accordion;
