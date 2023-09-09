import { useState } from "react";

const NewAirspaceModal = (props) => {
    const [category, setCategory] = useState(); 

    const airspaceCategoryHandler = (e) => {
        e.preventDefault();
        props.onAddCategory(category);
    }

    const categoryHandler = (e) => {
        console.log(e.target.value)
        setCategory(e.target.value)
    }


    return <div className="bg-white rounded px-12 fixed z-20 " style={{width: "714px", height: "420px", 
        top: "331px",  // This is for live environment
        bottom: "401px",
        // top: "10px",  // This is for test environment
        left: "363px", 
        right: "363px" 
        }}>
            <form className="flex flex-col mt-20 justify-center items-center">
               <h2 className="font-bold text-2xl">Welcome to SkyTrades</h2>
               <p className="text-light-brown text-sml">Please Select the the category you belong to from the options below.</p>
               <div className="mt-11 flex flex-row gap-5">
                    <div className="flex flex-col items-center gap-4">
                        <button className="rounded-md text-sml font-medium" style={{width: "192px", height: "55px", border: "0.35px solid #0653EA"}}>Home Owner Association</button>
                        <input type="radio" id="home owner" value="Home Owner Association" onClick={categoryHandler} name="category" className="cursor-pointer" /> 
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <button className="rounded-md text-sml font-medium" style={{width: "192px", height: "55px", border: "0.35px solid #0653EA"}}>Individual</button>
                        <input type="radio" id="individual" value="Individual" onClick={categoryHandler} name="category" className="cursor-pointer" /> 
                    </div>
               </div>
               <div className="flex flex-row items-center mt-20 gap-3">
                    <button onClick={props.onClose} className="rounded-md text-dark-blue transition-all duration-500 ease-in-out hover:bg-bleach-blue" style={{border: "1px solid #0653EA", width: "120px", height: "40px"}}>Cancel</button>
                    <button onClick={airspaceCategoryHandler} disabled={!category} className="bg-dark-blue rounded-md text-white disabled:bg-zinc-400 disabled:hover:bg-zinc-500 transition-all duration-500 ease-in-out hover:bg-blue-600 hover:text-white font-medium" style={{width: "120px", height: "40px"}}>Next</button>
               </div>
            </form>
        </div>
}

export default NewAirspaceModal;