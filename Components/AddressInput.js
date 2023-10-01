import { useState, useEffect, useRef } from "react";

import classes from "./Addressinput.module.css";



const AddressInput = () => {
    const formSubmitHandler = (e) => {
        e.preventDefault();

        fetch("/api/newsletters", {
            method: "POST",
            body: JSON.stringify({
                title: "Welcome to a new dispensation",
                text: "This is the begining of your journey.",
                link: "https://tailwindcss.com/docs/installation"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(!res.ok) {
                return res.json()
                .then(errorData => {
                    throw new Error(errorData.message);
                });
            }
            return res.json()
            .then((response) => console.log(response));
        })
        .catch(err => {
            console.log(err);
        }) 
    }

    const getHandler = () => {
        fetch("/api/newsletters")
        .then(res => {
            if(!res.ok) {
                return res.json()
                .then(errorData => {
                    throw new Error(errorData.message);
                });
            }
            return res.json();
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err);
        }) 
    }


    return (
        <div>
            <div>
                <button onClick={getHandler} className={classes.confirm__btn}>GET</button>
            </div>
            <div>
                <button onClick={formSubmitHandler} className={classes.confirm__btn}>POST</button>
            </div>
        </div>
    )
}

export default AddressInput;