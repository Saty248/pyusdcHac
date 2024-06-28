"use client";

import { useState } from "react";
import { AuctionPropertyI, PropertyData } from "@/types";
import { IoClose } from "react-icons/io5";
import AuctionItem from "./AuctionItem";
import Button from "../Shared/Button";
import useAuction from "@/hooks/useAuction";
import Spinner from "../Spinner";

interface CreateAuctionModalProps {
  onClose: any;
  data: AuctionPropertyI[];
  mobile?: boolean;
}

interface SelectedPropertyI {
  id: string;
  name: string;
  minSalePrice: number;
  endDate: Date | null;
}

const CreateAuctionModal: React.FC<CreateAuctionModalProps> = ({
  onClose,
  data,
  mobile,
}) => {
  const { airspaceList, loading } = useAuction();
  const [selectedItems, setSelectedItems] = useState<SelectedPropertyI[]>([]);

  const handleSelectItem = (item: PropertyData) => {
    setSelectedItems((prevSelectedItems) => {
      const isItemSelected = prevSelectedItems.find(
        (selectedItem) => selectedItem.id === item.id
      );

      let updatedItems;
      if (isItemSelected) {
        updatedItems = prevSelectedItems.filter(
          (selectedItem) => selectedItem.id !== item.id
        );
      } else {
        updatedItems = [
          ...prevSelectedItems,
          { id: item.id, name: item.name, minSalePrice: 0, endDate: null },
        ];
      }

      console.log("Updated Items:", updatedItems);
      return updatedItems;
    });
  };

  const handleUpdateItem = (
    id: string,
    minSalePrice: number,
    endDate: Date | null
  ) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = prevSelectedItems.map((selectedItem) =>
        selectedItem.id === id
          ? { ...selectedItem, minSalePrice, endDate }
          : selectedItem
      );
      console.log("Updated Items:", updatedItems);
      return updatedItems;
    });
  };

  const handleAddProperties = () => {
    console.log("Selected Items:", selectedItems);
  };

  if (mobile) {
    return (
      <div className="fixed bottom-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-end">
        <div className="relative w-full md:w-[689px] h-[685px] bg-white rounded-t-[30px] p-8">
          <div
            onClick={onClose}
            className="absolute right-[1rem] top-[1rem] cursor-pointer"
          >
            <IoClose className="w-4 h-4" />
          </div>

          <div className="text-center">Create Auction</div>
          <div>Select the properties you want to auction</div>

          <div className="flex flex-col gap-3 overflow-y-auto h-[450px] thin-scrollbar">
            {airspaceList.length > 0 &&
              airspaceList.map((item, index) => (
                <AuctionItem
                  data={item}
                  key={index}
                  onSelectItem={handleSelectItem}
                  onUpdateItem={handleUpdateItem}
                  selected={
                    !!selectedItems.find(
                      (selectedItem) => selectedItem.id === item.id
                    )
                  }
                />
              ))}
          </div>

          <div className="flex justify-between gap-4">
            <Button secondary label="Cancel" onClick={onClose} />
            <Button
              label="Add Properties to Auction"
              onClick={handleAddProperties}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative flex flex-col gap-8 dark:text-darkText w-full md:w-[689px] h-[685px] bg-white rounded-[30px] p-8">
        <div
          onClick={onClose}
          className="absolute right-[1rem] top-[1rem] cursor-pointer"
        >
          <IoClose className="w-4 h-4" />
        </div>

        <div className="text-center">Create Auction</div>
        <div>Select the properties you want to auction</div>

        {loading ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Spinner />
            <span className="mt-16">Fetching Verified Airspaces...</span>
          </div>
        ) : (
          <div className="flex flex-col gap-3 overflow-y-auto h-[450px] thin-scrollbar">
            {airspaceList &&
              airspaceList.map((item, index) => (
                <AuctionItem
                  data={item}
                  key={index}
                  onSelectItem={handleSelectItem}
                  onUpdateItem={handleUpdateItem}
                  selected={
                    !!selectedItems.find(
                      (selectedItem) => selectedItem.id === item.id
                    )
                  }
                />
              ))}
          </div>
        )}

        <div className="flex justify-between gap-4">
          <Button secondary label="Cancel" onClick={onClose} />
          <Button
            label="Add Properties to Auction"
            onClick={handleAddProperties}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateAuctionModal;
