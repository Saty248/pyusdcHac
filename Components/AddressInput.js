import { useState, useEffect, useRef } from "react";
import ReactDom from "react-dom";
import maplibregl from 'maplibre-gl';
import swal from "sweetalert";

import classes from "./Addressinput.module.css";

import Map from "./Map";
import RegisterAddress from "./RegisterAddress";
import ConfirmModal from "./ConfirmModal";


const Backdrop = () => {
    return <div className={classes.modal_backdrop}></div>
}

const AddressInput = () => {
    const [address, setAddress] =  useState("");
    const [addresses, setAddresses] =  useState([]);
    const [showOptions, setShowOptions] = useState(true);
    const [showForm, setShowForm] = useState(true);
    const [showMap, setShowMap] = useState(false);
    const [confirmFormSubmit, setConfirmFormSubmit] = useState(false);
    const [confirmSubmit, setConfirmSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [addressData, setAddressData] = useState({});
    const [error, setError] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);


    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();

    const locationiqKey = "pk.715caf1e4ee375ad5db1db5f9ff277df";

    useEffect(() => {
        if(addressData.lon && addressData.lat){
            const endPoint = []
    
            endPoint.push(addressData.lon)
            endPoint.push(addressData.lat)

            const map = new maplibregl.Map({
                container: 'map',
                attributionControl: false, 
                style: 'https://tiles.locationiq.com/v3/streets/vector.json?key='+locationiqKey,
                zoom: 18,
                center: endPoint
            });

    
            if(!addressData.geojson || addressData.geojson.type !== "Polygon") {
                console.log(endPoint)
                
                if(map) {
                    // const el2 = document.createElement('p');
                    // el2.className = 'marker';
                    // el2.style.backgroundImage = 'url(https://maps.locationiq.com/v3/samples/marker50px.png)';
                    // el2.style.width = '500px';
                    // el2.style.height = '500px';
    
                    // new maplibregl.Marker(el2)
                    // .setLngLat(endPoint)
                    // .addTo(map);

                    var el = document.createElement('div');
                    el.id = 'markerWithExternalCss';
                    // finally, create the marker
                    var markerWithExternalCss = new maplibregl.Marker(el)
                        .setLngLat(endPoint)
                        .addTo(map);
    
                    return;
                }
             
    
                return;
            }
            
            map.on('load', function () {
                map.addLayer({
                    'id': 'maine',
                    'type': 'fill',
                    'source': {
                        'type': 'geojson',
                        'data': {
                            'type': 'Feature',
                            'geometry': addressData.geojson
                        }
                    },
                    'layout': {},
                    'paint': {
                        'fill-color': '#D20C0C',
                        'fill-opacity': 0.5
                        }
                    });
                });
            }
    }, [addressData])

    
    useEffect(() => {
        if(address) {        
        const addressHandler = setTimeout(() => {
            fetch(`https://api.locationiq.com/v1/autocomplete?key=${locationiqKey}&q=${address}`)
            .then(res => {
                if(!res.ok) {
                    return res.json()
                    .then(errorData => {
                        throw new Error(errorData.error);
                    });
                }
                return res.json()
            })
            .then(resData => {
                setAddresses(resData);
            })
            .catch((err) => {
                console.log(err)
            })
        }, 500)
        return () => {
            clearTimeout(addressHandler);
        }
    }
       

    }, [address]);


    const firstNameHandler = () => {
        const firstNameValue = firstName.current.value;

        if(firstNameValue === "") {
            setFirstNameValid(false)
        } else {
            setFirstNameValid(true)
        }
    }

    const lastNameHandler = () => {
        const lastNameValue = lastName.current.value;

        if(lastNameValue === "") {
            setLastNameValid(false)
        } else {
            setLastNameValid(true)
        }
    }

    const emailHandler = () => {
        const emailValue = email.current.value;

        const regex = /^\S+@\S+\.\S+/
        const emailValid = regex.test(emailValue)

        if(!emailValid) {
            setEmailValid(false)
        } else {
            setEmailValid(true)
        }
    }


    const addressChangeHandler = (e) => {
        if(!showOptions) {
            setShowOptions(true)
        }

        setAddress(e.target.value)
    }

    const buttonSelectHandler = (e) => {
            e.preventDefault(), 
            setAddress(e.target.value), 
            setShowOptions(false)
    }

    const closeConfirmModal = (e) => {
        e.preventDefault()

        if(isSubmitLoading) {
            return;
        }

        setConfirmSubmit(false)
        setIsSubmitLoading(false);
        setIsLoading(false);
        setFirstNameValid(true);
        setLastNameValid(true);
        setEmailValid(true);
        setSubmitError("")
        firstName.current.value = ""
        lastName.current.value = ""
        email.current.value = ""
    }

    const confirmFormSubmitHandler = () => {
        setConfirmFormSubmit(false);
        setShowForm(false);       
    }

    const mapLoadHandler = (e) => {
        e.preventDefault(); 
        
        if(!address) {
            swal({
                title: "oops!",
                text: "Kindly enter your address.",
                timer: 2000
              });
            return;
        }

        setIsLoading(true)


        fetch(`https://us1.locationiq.com/v1/search?key=pk.715caf1e4ee375ad5db1db5f9ff277df&q=${address}&format=json&polygon_geojson=1`)
        .then(res => {
            if(!res.ok) {
                return res.json()
                .then(errorData => {
                    throw new Error(errorData.error);
                });
            }
            return res.json()
        })
        .then(resData => {
            if(resData.error) {
                setError(resData.error);
                setIsLoading(false)
                return;
            }
            
            // setShowMap(true)
            setAddressData(resData[0]);
            
            setError("")
            setIsLoading(false)
            setShowForm(false)
            setShowMap(true)
            // setConfirmFormSubmit(true)
            console.log(addressData)
        })
        .catch((err) => {
            setError(err.message || "oops! something went wrong. please try again")
            setIsLoading(false)
        });     
    }

    const confirmSubmitHandler = (e) => {
        e.preventDefault();


        const firstNameValue = firstName.current.value;
        const lastNameValue = lastName.current.value;
        const emailValue = email.current.value;

        const regex = /^\S+@\S+\.\S+/
        const emailValid = regex.test(emailValue)

        if(!firstNameValue || 
            !lastNameValue || 
            !emailValid
            ) {
                swal({
                    title: "oops!",
                    text: "Kindly fill all fields correctly.",
                    timer: 2000
                  });
                firstNameHandler()
                lastNameHandler()
                emailHandler()
                return;
            }

        const formValue = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            address: address,
            longitude: addressData.lon,
            latitude: addressData.lat,
            // coordinates: addressData.geojson ? addressData.geojson.coordinates : []
        }

        setIsSubmitLoading(true);

        // fetch("https://addressvalidator.onrender.com/register", {
        fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(formValue),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if(!res.ok) {
                return res.json()
                    .then(errorData => {
                        throw new Error(errorData.message);
                    });
            }
            swal({
                title: "Submitted",
                text: "Address registered successfully",
                icon: "success",
                button: "Ok"
              }).then(() => {
                setIsSubmitLoading(false)
                setShowMap(false);
                setShowForm(true)
                setConfirmSubmit(false)
                setAddress("")
                setSubmitError("")
                firstName.current.value = ""
                lastName.current.value = ""
                email.current.value = ""
              })
            
        })
        .catch((err) => {
            setIsSubmitLoading(false)
            setSubmitError(err.message || "opps! something went wrong. Kindly check your address.");
        })
    }

    const confirmMapHandler = (e) => {
        e.preventDefault()
        setConfirmSubmit(true)
    }

    const closeMapHandler = () => {
        setShowForm(true);
        setShowMap(false)
    }

   

    return (
        <div>
            {showForm && 
            <form className={classes.add_collection} onSubmit={mapLoadHandler} onClick={() => {setShowOptions(false)}}>
                {error && <p className={classes.error__text}>{error}</p>}
                <textarea cols="40" rows="5" placeholder="Enter your address here" className={classes.text_area} onChange={addressChangeHandler} value={address} /> <br />
                <button className={classes.confirm__btn}>Confirm Address</button>
                {addresses.length > 0 &&
                <div className={classes.add_value} 
                            style={!showOptions ? { display: "none" } : null} 
                            onBlur={() => {setShowOptions(false)}}>
                    <p>These are address suggestions. If any of 
                        the listed addresses meet exactly what you are searching for, 
                        kindly click on it to confirm.
                    </p>
                    <div className={classes.address__suggestions} >
                        {addresses.length > 0 && addresses.map(address => {
                                return <button value={address.display_address} key={address.osm_id + Math.random()} onClick={buttonSelectHandler} >
                                    {address.display_address}
                                </button>
                            }) 
                        }
                    </div>
                </div> }
            </form> 
            }
            {showMap &&
                <Map onClose={closeMapHandler} onConfirm={confirmMapHandler} />
            }

            {(confirmSubmit || confirmFormSubmit || isLoading) && <Backdrop />}
            {/* {(confirmSubmit || confirmFormSubmit || isLoading) && ReactDom.createPortal(<Backdrop />, document.getElementById("backdrop-root"))} */}
            
            {confirmFormSubmit && <ConfirmModal onConfirm={confirmFormSubmitHandler} />}
            {/* {confirmFormSubmit && ReactDom.createPortal(<ConfirmModal onConfirm={confirmFormSubmitHandler} />, document.getElementById("modal-root"))} */}
            
            {/* {confirmSubmit && <ConfirmModal onConfirm={confirmFormSubmitHandler} />} */}
            <RegisterAddress 
                            confirm={confirmSubmit}
                            submitError={submitError}
                            firstName={firstName}
                            changeFirstName={firstNameHandler}
                            firstNameValid={firstNameValid}
                            lastName={lastName}
                            changeLastName={lastNameHandler}
                            lastNameValid={lastNameValid}
                            changeEmail={emailHandler}
                            email={email}
                            emailValid={emailValid}
                            address={address}
                            submitLoading={isSubmitLoading}
                            onClose={closeConfirmModal}
                            onConfirm={confirmSubmitHandler}
                        />
            {/* {ReactDom.createPortal(<RegisterAddress 
                            confirm={confirmSubmit}
                            submitError={submitError}
                            firstName={firstName}
                            changeFirstName={firstNameHandler}
                            firstNameValid={firstNameValid}
                            lastName={lastName}
                            changeLastName={lastNameHandler}
                            lastNameValid={lastNameValid}
                            changeEmail={emailHandler}
                            email={email}
                            emailValid={emailValid}
                            address={address}
                            submitLoading={isSubmitLoading}
                            onClose={closeConfirmModal}
                            onConfirm={confirmSubmitHandler}
                        />, 
                    document.getElementById("modal-root"))}  */}
        </div>
    )
}

export default AddressInput;