import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "@/store/store";

export const useVerification = () => {
    const dispatch = useDispatch();
    const verificationCheck = async (users) => {
        const fetchedEmail = localStorage.getItem("email");
        const currentUser = users.filter(user => user.email === fetchedEmail);
        const currentUserId =  currentUser[0]?.id;
        console.log("CurrentUser => ", users);
        let userDetails = await fetch("/api/proxy", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "uri": `/users/find-one/${currentUserId}`
            }
        })
        const resp = await userDetails.json();
        if(resp.KYCStatusId == 2)
            dispatch(counterActions.newAirspaceModal());
        else if(resp.KYCStatusId == 1)
            alert("KYC is yet to be approved. It might take some time")
        else {
            console.log("Please do KYC");
            const client = new Persona.Client({
                templateId: 'itmpl_mp1885pUwnRvVwEoKxwyUiZz',
                referenceId: currentUserId,
                environmentId: 'env_m7beq2gaxaLfWVkYPaGdMHS3',
                onReady: () => client.open(),
                onComplete: ({ inquiryId, status, fields }) => {
                console.log(`Completed inquiry ${inquiryId} with status ${status}`);
                }
            });
        }
    }
    return {verificationCheck}
}