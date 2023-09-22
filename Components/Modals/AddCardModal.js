import Image from "next/image";
import mastercard from "../../public/images/mastercard-logo.png";

const AddCardModal = (props) => {
    return <div className="bg-white rounded fixed z-20 overflow-y-auto pb-5" style={{width: "500px", height: "90vh", maxHeight: "847px", 
            top: "7vh", // This is for live environment
            left: "calc(50% - 250px)", 
        }}>
            <div className="text-center relative mt-9 font-medium text-xl">   
                <button onClick={props.onClose} className="absolute left-9 top-1" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M11.0303 8.53033C11.3232 8.23744 11.3232 7.76256 11.0303 7.46967C10.7374 7.17678 10.2626 7.17678 9.96967 7.46967L5.96967 11.4697C5.82322 11.6161 5.75 11.8081 5.75 12C5.75 12.1017 5.77024 12.1987 5.80691 12.2871C5.84351 12.3755 5.89776 12.4584 5.96967 12.5303L9.96967 16.5303C10.2626 16.8232 10.7374 16.8232 11.0303 16.5303C11.3232 16.2374 11.3232 15.7626 11.0303 15.4697L8.31066 12.75H18C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H8.31066L11.0303 8.53033Z" fill="#252530"/>
                    </svg>
                </button>
                <h3>Add New Card</h3>
            </div>
            <form className="mx-auto px-24">
                <h3 className="text-light-dark font-semibold mt-8">Card details</h3>
                <div className="mt-8 relative">
                    <label htmlFor="card number" className="text-light-brown">Card Number</label> <br />
                    <input type="text" className="rounded mt-1 ps-4 pt-3" placeholder="****  ****  ****  ****" id="card number" name="card number" style={{border: "0.35px solid #0653EA", width: "300px", height: "37px"}} />
                    <Image src={mastercard} alt="mastercard logo" width={26} height={16} className="absolute right-5 top-10" />
                </div>
                <button className="flex flex-row items-center mt-4 gap-2">
                    <Image src="/images/scan.png" alt="scan icon" width={24} height={24} />
                    <p className="font-medium text-light-brown">Scan card</p>
                </button> 
                <div className="flex flex-row justify-between mt-8" style={{width: "300px",}}>
                    <div className="">
                        <label htmlFor="card number" className="text-light-brown">Expiry</label> <br />
                        <input type="text" className="rounded mt-1 text-sm ps-4" placeholder="MM/YYYY" id="card number" name="card number" style={{border: "0.35px solid #0653EA", width: "140px", height: "37px"}} />
                    </div>
                    <div className="relative">
                        <label htmlFor="card number" className="text-light-brown">CVV</label> <br />
                        <input type="text" className="rounded mt-1 text-sm pt-2 ps-4" placeholder="***" id="card number" name="card number" style={{border: "0.35px solid #0653EA", width: "140px", height: "37px"}} />
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" className="absolute top-1 right-1" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M5.00016 0.833984C2.70433 0.833984 0.833496 2.70482 0.833496 5.00065C0.833496 7.29648 2.70433 9.16732 5.00016 9.16732C7.296 9.16732 9.16683 7.29648 9.16683 5.00065C9.16683 2.70482 7.296 0.833984 5.00016 0.833984ZM4.68766 3.33398C4.68766 3.16315 4.82933 3.02148 5.00016 3.02148C5.171 3.02148 5.31266 3.16315 5.31266 3.33398V5.41732C5.31266 5.58815 5.171 5.72982 5.00016 5.72982C4.82933 5.72982 4.68766 5.58815 4.68766 5.41732V3.33398ZM5.3835 6.82565C5.36266 6.87982 5.3335 6.92148 5.296 6.96315C5.25433 7.00065 5.2085 7.02982 5.1585 7.05065C5.1085 7.07148 5.05433 7.08398 5.00016 7.08398C4.946 7.08398 4.89183 7.07148 4.84183 7.05065C4.79183 7.02982 4.746 7.00065 4.70433 6.96315C4.66683 6.92148 4.63766 6.87982 4.61683 6.82565C4.596 6.77565 4.5835 6.72148 4.5835 6.66732C4.5835 6.61315 4.596 6.55898 4.61683 6.50898C4.63766 6.45898 4.66683 6.41315 4.70433 6.37148C4.746 6.33398 4.79183 6.30482 4.84183 6.28398C4.94183 6.24232 5.0585 6.24232 5.1585 6.28398C5.2085 6.30482 5.25433 6.33398 5.296 6.37148C5.3335 6.41315 5.36266 6.45898 5.3835 6.50898C5.40433 6.55898 5.41683 6.61315 5.41683 6.66732C5.41683 6.72148 5.40433 6.77565 5.3835 6.82565Z" fill="#6F6D80"/>
                        </svg>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="mt-5 -ms-12" width="404" height="2" viewBox="0 0 404 2" fill="none">
                    <path d="M0 1H404" stroke="#0653EA" stroke-width="0.35"/>
                </svg>
                <h3 className="text-light-dark font-semibold mt-8">Billing information</h3>
                <div className="mt-4 relative">
                    <label htmlFor="name on the card" className="text-light-brown">Name on Card</label> <br />
                    <input type="text" className="rounded text-sml mt-1 ps-4 placeholder:text-dark-brown" placeholder="John Doe" id="card number" name="card number" style={{border: "0.35px solid #0653EA", width: "300px", height: "37px"}} />
                </div>
                <div className="mt-4 relative">
                    <label htmlFor="address" className="text-light-brown">Address</label> <br />
                    <input type="text" className="rounded text-sml mt-1 ps-4 placeholder:text-dark-brown" placeholder="8502 Preston Rd. Inglewood " id="address" name="address" style={{border: "0.35px solid #0653EA", width: "300px", height: "37px"}} />
                </div>
                <div className="flex flex-row justify-between mt-4" style={{width: "300px",}}>
                    <div>
                        <label htmlFor="card number" className="text-light-brown">State</label> <br />
                        <input type="text" className="rounded mt-1 text-sml ps-4 placeholder:text-dark-brown" placeholder="Maine" id="card number" name="card number" style={{border: "0.35px solid #0653EA", width: "140px", height: "37px"}} />
                    </div>
                    <div>
                        <label htmlFor="card number" className="text-light-brown">Postal Code</label> <br />
                        <input type="text" className="rounded mt-1 text-sml ps-4 placeholder:text-dark-brown" placeholder="98380" id="card number" name="card number" style={{border: "0.35px solid #0653EA", width: "140px", height: "37px"}} />
                    </div>
                </div>
                <div className="mt-4 relative">
                    <label htmlFor="country" className="text-light-brown">Country</label> <br />
                    <input type="text" className="rounded text-sml mt-1 ps-4 placeholder:text-dark-brown" placeholder="United States" id="country" name="country" style={{border: "0.35px solid #0653EA", width: "300px", height: "37px"}} />
                </div>
                <button className="bg-dark-blue rounded-md text-white my-5" style={{width: "300px", height: "42px"}}>Add Card</button>
            </form>
    </div>
}

export default AddCardModal;