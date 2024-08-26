import React from 'react';
import { FileIcon } from '../Icons';

const UploadedDocuments = ({ uploadedDoc }:{uploadedDoc: File[]}) => {
  return (
    <div className="py-4 px-4 mt-8 rounded-[30px] bg-white shadow-lg" style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }}>
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center ">
      <div className="md:w-[40%] w-full">
      <h2 className="text-xl font-semibold">My Additional Documents</h2>
        <p className="mt-4 text-[#87878D] text-[12px]">
          We requested your Proof Of Ownership
        </p>
      </div>
      <div className="md:w-[60%] w-full flex flex-col md:flex-row justify-end items-center gap-8">
        {uploadedDoc?.map((file) => {
          return (
            <div className="w-52 px-4 py-4 flex justify-start items-center border rounded-md gap-4">
            <FileIcon />
            <div>
              <p className="text-[#1F7DFD] text-xs">{file?.name}</p>
              <p className="text-xs">Proof Of Ownership</p>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  </div>
  );
};

export default UploadedDocuments;