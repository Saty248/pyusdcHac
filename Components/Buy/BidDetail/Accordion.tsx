"use client";
import React, { useState } from "react";
import { chevronDownIcon, chevronUpIcon } from "@/Components/Icons";
interface AccordionProps {
  content: React.ReactNode;
  title: string;
}

const Accordion: React.FC<AccordionProps> = ({ content, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="flex justify-between items-center "
        onClick={toggleAccordion}
        // disabled
      >
        {
          <div className="text-light-black text-[15px] leading-[22.5px] font-500">
            {title}
          </div>
        }

        <div className="transform transition-transform duration-300 text-[#868686]">
          {isOpen ? chevronDownIcon() : chevronUpIcon()}
        </div>
      </button>
      {isOpen && <div>{content}</div>}
    </div>
  );
};

export default Accordion;
