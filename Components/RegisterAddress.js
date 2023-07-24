import classes from "./Addressinput.module.css";

const RegisterAddress = (props) => {
    return <div className={props.confirm ? `${classes.confirm_sect}` : `${classes.confirm_division}`}>   
                <form className={classes.confirm_submit}>
                    {props.submitError && <p className={classes.text__error}>{props.submitError}</p>}
                    <div>
                        <input type="text" name="First Name" ref={props.firstName} placeholder="First Name" 
                        onChange={props.changeFirstName} 
                        onBlur={props.changeFirstName} />
                    </div>
                    {!props.firstNameValid && <p className={classes.error__text}>first name cannot be empty</p>}
                    <div>
                        <input type="text" name="Last Name" placeholder="Last Name" 
                        ref={props.lastName} 
                        onChange={props.changeLastName} 
                        onBlur={props.changeLastName} />
                    </div>
                    {!props.lastNameValid && <p className={classes.error__text}>last name cannot be empty</p>}
                    <div>
                        <input type="email" name="email" placeholder="Email" ref={props.email} 
                            onChange={props.changeEmail} onBlur={props.changeEmail} />
                    </div>
                    {!props.emailValid && <p className={classes.error__text}>email is invalid</p>}
                    <div>
                        <input type="email" name="address" placeholder="address" value={props.address} disabled />
                    </div>
                    {props.submitLoading && <p className={classes.loading__text}>Loading...</p>}
                    <div className={classes.modal_button}>
                        <button className={classes.cancel_btn} onClick={props.onClose}>Cancel</button>
                        <button className={classes.confirm__btn} onClick={props.onConfirm}>Submit</button>
                    </div>
                </form>
            </div>
}

export default RegisterAddress;