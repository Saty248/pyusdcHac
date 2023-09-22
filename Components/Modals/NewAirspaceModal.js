import { useState } from "react";
import { useDispatch } from "react-redux";

import { counterActions } from "@/store/store";

const NewAirspaceModal = (props) => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState(); 


    const closeModalHandler = (e) => {
        e.preventDefault();
        dispatch(counterActions.closeNewAirspaceModal());
    }


    const categoryHandler = (e) => {
        console.log(e.target.value)
        setCategory(e.target.value)
    }

    const categorySelectHandler = (value, e) => {
        e.preventDefault();
        setCategory(value);
        console.log(category);
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(counterActions.airspaceData({
            ownerCategory: category
        }));

        dispatch(counterActions.closeNewAirspaceModal());
        dispatch(counterActions.confirmOnMapModal());
    }


    return <div className="bg-white rounded px-12 fixed z-20 " style={{width: "714px", height: "420px", 
        top: "20vh", 
        left: "calc(50% - 357px)", 
        }}>
            <form className="flex flex-col mt-20 justify-center items-center">
               <h2 className="font-bold text-2xl">Welcome to SkyTrades</h2>
               <p className="text-light-brown text-sml">Please Select the the category you belong to from the options below.</p>
               <div className="mt-11 flex flex-row gap-5">
                    <div className="flex flex-col items-center gap-4">
                        <button onClick={categorySelectHandler.bind(null, "Home Owner Association")} className="rounded-md text-sml font-medium" style={{width: "192px", height: "55px", border: "0.35px solid #0653EA"}}>Home Owner Association</button>
                        <input type="radio" id="home owner" checked={category === "Home Owner Association"}  value="Home Owner Association" onClick={categoryHandler} name="category" className="cursor-pointer" /> 
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <button onClick={categorySelectHandler.bind(null, "Individual")}  className="rounded-md text-sml font-medium" style={{width: "192px", height: "55px", border: "0.35px solid #0653EA"}}>Individual</button>
                        <input type="radio" id="individual" checked={category === "Individual"} value="Individual" onClick={categoryHandler} name="category" className="cursor-pointer" /> 
                    </div>
               </div>
               <div className="flex flex-row items-center mt-20 gap-3">
                    <button onClick={closeModalHandler} className="rounded-md text-dark-blue transition-all duration-500 ease-in-out hover:bg-bleach-blue" style={{border: "1px solid #0653EA", width: "120px", height: "40px"}}>Cancel</button>
                    <button onClick={formSubmitHandler} disabled={!category} className="bg-dark-blue rounded-md text-white disabled:bg-light-blue disabled:cursor-not-allowed transition-all duration-500 ease-in-out hover:bg-blue-600 hover:text-white font-medium" style={{width: "120px", height: "40px"}}>Next</button>
               </div>
            </form>
        </div>
}

export default NewAirspaceModal;