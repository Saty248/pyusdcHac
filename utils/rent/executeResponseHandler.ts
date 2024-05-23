import { toast } from "react-toastify";

export const handleExecuteResponse = (response: any,setFinalAns:React.Dispatch<React.SetStateAction<{status:string;message:string;tokenId?:string;}>>,setShowSuccess:React.Dispatch<React.SetStateAction<boolean>>) => {
  if (response && response.errorMessage) {
    toast.error(response.errorMessage);
    return false;
  }
  if (response) {
    if (response.data.status === "success") {
      setFinalAns({
        status: "Rent Successful",
        message: response.data.message,
        tokenId: response.data.tokenId,
      });
    } else {
      setFinalAns({
        status: "Rent failed",
        message: response.data.message,
      });
    }
    setShowSuccess(true);
  }
  return true;
};
