import classes from "./Addressinput.module.css";

const ConfirmModal = (props) => {
    return <div className={classes.map_confirmation}>   
                <div>
                    <p>Search successful! Address found.</p>
                    <p>Click OK to continue</p>
                    <button onClick={props.onConfirm}>OK</button>
                </div>
            </div>
}

export default ConfirmModal;