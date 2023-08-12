import { useRef, useState } from "react";
// import classes from "../Components/Addressinput.module.css";
import classes from "./register-drone.module.css";
import swal from "sweetalert";

const registerDrone = () => {
    const [ownerNameValid, setOwnerNameValid] = useState(true);
    const [operatorNameValid, setOperatorNameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [addressValid, setAddressValid] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);
    const [droneValid, setDroneValid] = useState(true);
    const [serialValid, setSerialValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const ownerName = useRef();
    const operatorName = useRef();
    const mailingAddress = useRef();


    const address = useRef();
    const email = useRef();
    const phoneNumber = useRef();
    const droneModel = useRef();
    const serialNumber = useRef();
    const regNumber = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const firstNameChangeHandler = () => {
        const ownerNameValue = ownerName.current.value;

        if(ownerNameValue === "") {
            setOwnerNameValid(false)
        } else {
            setOwnerNameValid(true);
        }
    }

    const lastNameChangeHandler = () => {
        const operatorNameValue = operatorName.current.value;

        if(operatorNameValue === "") {
            setOperatorNameValid(false)
        } else {
            setOperatorNameValid(true);
        }
    }

    // const middleNameChangeHandler = () => {
    //     const lastNameValue = middleName.current.value;
    // }

    const emailChangeHandler = () => {
        const emailValue = email.current.value;

        const regex = /^\S+@\S+\.\S+/
        const emailValid = regex.test(emailValue);

        if(!emailValid) {
            setEmailValid(false)
        } else {
            setEmailValid(true);
        }
    }

    const addressChangeHandler = () => {
        const addressValue = address.current.value;

        if(addressValue === "") {
            setAddressValid(false)
        } else {
            setAddressValid(true);
        }
    }

    const phoneChangeHandler = () => {
        const phoneValue = phoneNumber.current.value;

        if(phoneValue === "" || isNaN(phoneValue)) {
            setPhoneValid(false)
        } else {
            setPhoneValid(true);
        }
    }

    const droneChangeHandler = () => {
        const droneValue = droneModel.current.value;

        if(droneValue === "") {
            setDroneValid(false)
        } else {
            setDroneValid(true);
        }
    }

    const serialNumberChangeHandler = () => {
        const serialNumberValue = serialNumber.current.value;

        if(serialNumberValue === "") {
            setSerialValid(false)
        } else {
            setSerialValid(true);
        }
    }

    const passwordChangeHandler = () => {
        const passwordValue = password.current.value;

        if(passwordValue === "") {
            setPasswordValid(false)
        } else {
            setPasswordValid(true);
        }
    }

    const confirmPasswordChangeHandler = () => {
        const confirmPasswordValue = confirmPassword.current.value;
        const passwordValue = password.current.value;

        if(confirmPasswordValue !== passwordValue) {
            setConfirmPasswordValid(false)
        } else {
            setConfirmPasswordValid(true);
        }
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();

        const ownerNameValue = ownerName.current.value;
        const operatorNameValue = operatorName.current.value;
        const mailingAddressValue = mailingAddress.current.value;
        const emailValue = email.current.value;
        const addressValue = address.current.value;
        const phoneValue = phoneNumber.current.value;
        const droneValue = droneModel.current.value;
        const serialNumberValue = serialNumber.current.value;
        const regNumberValue = regNumber.current.value;
        const confirmPasswordValue = confirmPassword.current.value;
        const passwordValue = password.current.value;
        
        const regex = /^\S+@\S+\.\S+/
        const emailValid = regex.test(emailValue);

        if(!ownerNameValue || 
            !operatorNameValue ||
            !emailValid ||
            !addressValue ||
            isNaN(phoneValue) ||
            !droneValue ||
            !serialNumberValue ||
            !passwordValue ||
            confirmPasswordValue !== passwordValue
            ) {
                swal({
                    title: "oops!",
                    text: "Kindly fill all fields correctly.",
                    timer: 2000
                  });
                firstNameChangeHandler();
                lastNameChangeHandler();
                phoneChangeHandler();
                emailChangeHandler();
                addressChangeHandler();
                droneChangeHandler();
                serialNumberChangeHandler();
                passwordChangeHandler();
                confirmPasswordChangeHandler();
                return;
            }
    
        const droneArr = [];

        const droneCredentials = {
            droneModel: droneValue,
            serialNumber: serialNumberValue,
            regNumber: regNumberValue
        }

        droneArr.push(droneCredentials);

        const formValue = {
            ownerName: ownerNameValue,
            operatorName: operatorNameValue,
            mailingAddress: mailingAddressValue,
            email: emailValue,
            physicalAddress: addressValue,
            phone: phoneValue,
            drone: droneArr,
            password: passwordValue,
            confirmPassword: confirmPasswordValue
        }

        console.log(formValue);

        setIsLoading(true);
        setError(false);

        
        
        fetch("/api/register-drone", {
            method: "POST",
            body: JSON.stringify(formValue),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if(!res.ok) {
                return res.json()
                .then(errorData => {
                    throw new Error(errorData.error);
                });
            }
            swal({
                title: "Submitted",
                text: "drone registered successfully",
                icon: "success",
                button: "Ok"
              }).then(() => {
                setIsLoading(false)
                setError("")
                ownerName.current.value = "";
                operatorName.current.value = "";
                mailingAddress.current.value = "";
                email.current.value = "";
                address.current.value = "";
                phoneNumber.current.value = "";
                droneModel.current.value = "";
                serialNumber.current.value = "";
                confirmPassword.current.value = "";
                password.current.value = "";
                regNumber.current.value = "";
              })
            
        })
        .catch(err => {
            console.log(err);
            setError(err.message || "oops! something went wrong. please try again");
            setIsLoading(false)
        })
        // console.log(formValue);
    }

    return  <form className={classes.confirm_submit}>
      
        <div>
            <input type="text" name="name" ref={ownerName} placeholder="Name of drone owner" 
            onChange={firstNameChangeHandler} 
            onBlur={firstNameChangeHandler} />
        </div>
        {!ownerNameValid && <p className={classes.error__text}>name cannot be empty</p>}
        <div>
            <input type="text" name="name" placeholder="Name of drone operator (if applicable)" 
            ref={operatorName} 
            onChange={lastNameChangeHandler} 
            onBlur={lastNameChangeHandler} />
        </div>
        {!operatorNameValid && <p className={classes.error__text}>name cannot be empty</p>}
        <div>
            <input type="text" name="address" placeholder="physical address" ref={address} 
            onChange={addressChangeHandler} onBlur={addressChangeHandler} />
        </div>
        {!addressValid && <p className={classes.error__text}>field cannot be empty</p>}
        <div>
            <input type="text" name="address" placeholder="mailing address (if different from physical address)" 
            ref={mailingAddress} 
            />
        </div>
        
        <div>
            <input type="email" name="email" placeholder="email address" ref={email} 
                onChange={emailChangeHandler} onBlur={emailChangeHandler} />
        </div>
        {!emailValid && <p className={classes.error__text}>email is invalid</p>}
        <div>
            <input type="tel" name="phone" placeholder="phone number" ref={phoneNumber} 
                onChange={phoneChangeHandler} onBlur={phoneChangeHandler} />
        </div>
        {!phoneValid && <p className={classes.error__text}>field must contain a number</p>}
        <div>
            <input type="text" name="drone" placeholder="drone model" ref={droneModel} 
                onChange={droneChangeHandler} onBlur={droneChangeHandler} />
        </div>
        {!droneValid && <p className={classes.error__text}>field cannot be empty</p>}
        <div>
            <input type="text" name="serial number" placeholder="drone serial number" ref={serialNumber} 
                onChange={serialNumberChangeHandler} onBlur={serialNumberChangeHandler} />
        </div>
        {!serialValid && <p className={classes.error__text}>field cannot be empty</p>}
        <div>
            <input type="text" name="registration number" placeholder="FAA registration number" 
            ref={regNumber} 
            />
        </div>
        <div>
            <input type="file" name="image" />
        </div>
        <div>
            <input type="password" name="password" placeholder="password" ref={password} 
                onChange={passwordChangeHandler} onBlur={passwordChangeHandler} />
        </div>
        {!passwordValid && <p className={classes.error__text}>password cannot be empty</p>}
        <div>
            <input type="password" name="confirm password" placeholder="confirm password" ref={confirmPassword} 
                onChange={confirmPasswordChangeHandler} onBlur={confirmPasswordChangeHandler} />
        </div>
        {!confirmPasswordValid && <p className={classes.error__text}>value must be the same with password</p>}

        {error && <p className={classes.text__error}>{error}</p>}
        {isLoading && <p className={classes.loading__text}>Loading...</p>}

        <div className={classes.modal_button}>
            {/* <button className={classes.cancel_btn} onClick={props.onClose}>Cancel</button> */}
            <button className={classes.confirm__btn} onClick={formSubmitHandler}>Submit</button>
        </div>
    </form>
}

export default registerDrone;