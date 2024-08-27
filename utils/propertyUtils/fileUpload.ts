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
    const formData = new FormData();
    formData.append("file", file);
    formData.append("url", url);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/documentUpload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response;
    } catch {
      return false;
    }
};