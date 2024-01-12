export const checkNameIsValid = (name) => {
    return !!name;
}

export const checkPhoneIsValid = (phoneNumber) => {
    return !(!phoneNumber || isNaN(+(phoneNumber.slice(1,))) || phoneNumber.charAt(0) !== '+')
}

export const checkReferralCodeIsValid = (referralCode) => {
    return true;
}