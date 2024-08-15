import React from 'react';
import { FileIcon } from '../Icons';

const UploadedDocuments = ({ uploadedDoc }:{uploadedDoc: File[]}) => {
  return (
    <div className="p-4 mt-4">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center ">
      <div className="md:w-[40%] w-full">
        <p className="mt-4 text-[#87878D] text-[12px]">
          We requested your “Document Name’ and “Document Name’
        </p>
      </div>
      <div className="md:w-[60%] w-full flex flex-col md:flex-row justify-end items-center gap-8">
        {uploadedDoc?.map((file) => {
          return (
            <div className="w-52 px-4 py-4 flex justify-start items-center border rounded-md gap-4">
            <FileIcon />
            <div>
              <p className="text-[#1F7DFD] text-xs">{file?.name}</p>
              <p className="text-xs">“Document Name”</p>
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
