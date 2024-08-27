import axios from "axios";

export function isFileSizeValid(file: File, maxSizeInMB: number = 20): boolean {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
  }
  
export function formatTextToReadable(text: string) {
    return text?.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, char => char.toUpperCase()) ?? "";
  }
  
export const isValidFileType = (fileName: string) => {
    const allowedExtensions = [
      ".jpg", ".jpeg", ".png", ".pdf", ".doc", ".docx", ".tiff", ".xls", ".xlsx",
      ".txt", ".rtf", ".odt", ".ods", ".html", ".htm", ".ppt", ".pptx"
    ];
    const fileExtension = fileName.toLowerCase().slice(fileName.lastIndexOf('.'));
    return allowedExtensions.includes(fileExtension);
  };


export  const uploadImage = async (response: any,file:File) => {
    const url = response?.uploadUrl?.uploadUrl;
    console.log(url,"test")
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.put(
        url,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return true;
    } catch {
      return false;
    }
};