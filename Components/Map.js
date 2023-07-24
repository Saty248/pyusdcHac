import classes from "./Addressinput.module.css";

const Map = (props) => {
    return   <div className={`${classes.mappings_sec} ${classes.mappings_divisio}`}>   
        <div id='map'>
            
        </div>
        <p style={{textAlign: "center", marginBottom: "0px", fontSize: "0.7rem", padding: "0 1rem"}}>
            Kindly adjust the map (zoom in or out) to confirm you address.
        </p>
        <div className={classes.modal_button}>
            <button className={classes.cancel_btn} onClick={props.onClose}>Close</button>
            <button className={classes.confirm__btn} onClick={props.onConfirm}>Confirm</button>
        </div>
    </div>
}

export default Map;