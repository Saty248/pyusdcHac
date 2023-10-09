import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
// import 'react-calendar/dist/Calendar.css';
import { counterActions } from "@/store/store";
import User from "@/models/User";
import Backdrop from "@/Components/Backdrop";
import Spinner from "@/Components/Spinner";

const Dashboard = (props) => {
    const dispatch = useDispatch();

    const { users } = props;
    const date = new Date()
    const month = date.toLocaleString('default', { month: 'short' })
    const day = date.getDate();

    console.log(month, day);
    
    const router = useRouter();

    const [value, onChange] = useState(new Date());

    const [user, setUser] = useState();
    const [token, setToken] = useState("");
    const [newsletters, setNewsletters] = useState([]);
    const [newslettersLoading, setNewslettersLoading] = useState(false);
    

    useEffect(() => {
        const fetchedEmail = localStorage.getItem("email");
        const fetchedToken = JSON.parse(localStorage.getItem("openlogin_store"));

        if(fetchedToken) {
            const tokenLength = Object.keys(fetchedToken).length;
            console.log(tokenLength);
            if(tokenLength.length < 1) {
                localStorage.removeItem("openlogin_store");
            };
        };

        if(!fetchedEmail || !fetchedToken) {
            router.push("/auth/join");
            return;
        };

        setToken(fetchedToken.sessionId);

        const singleUser = users.filter(user => user.email === fetchedEmail);
        setUser(singleUser[0]);
    }, []);

    useEffect(() => {
        setNewslettersLoading(true)
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
            setNewslettersLoading(false)
            setNewsletters(response.newsletters.reverse());
        })
        .catch(err => {
            console.log(err);
        }) 
    }, []);

    useEffect(() => {
        if(token && user) {
            const ctx = document.getElementById('chart').getContext('2d');

            if (ctx) {
                const existingChart = Chart.getChart(ctx);
        
                if (existingChart) {
                    existingChart.destroy();
                }
            }
            new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['August 21', 'August 22', 'August 23', 
                            'August 24', 'August 25', 'August 26',
                        ],
                datasets: [{
                label: 'Payment Overview',
                data: [2, 4, 2, 
                        4, 8, 12,  
                        ],
                //   backgroundColor: 'rgb(255, 211, 11)',
                color: "black",
                barThickness: 10,
                borderRadius: 10
                }]
            },
            options: {
                scales: {
                x: {
                    // display: false 
                },
                y: {
                    // display: false 
                }
                },
                plugins: {
                tooltip: {
                    backgroundColor: 'black', 
                    bodyColor: 'white',
                    yAlign: 'bottom',
                    titleFont: {
                        size: 14,
                    },
                    titleColor: "white",
                    bodyFont: {
                        color: 'red'
                    },
                    displayColors: false,
                    style: {
                        textAlign: 'center'
                    }
                },
                legend: {
                    // display: false, 
                },
                label: {
                    display: false
                },
                title: {
                    display: false,
                    text: "August 10"
                }
                }
            }
            });
        }
    }, []);

  

    const navigationHandler = (route) => {
        router.push(route)
    }

    const addAirspaceHandler = (event) => {
        event.stopPropagation();   
        router.push("/homepage/airspace");
        dispatch(counterActions.newAirspaceModal());
    }

    if(!user || !token) {
        return <Spinner />
    } 

    return <div className="flex flex-row mx-auto">
        <Sidebar />
        <div style={{width: "calc(100vw - 257px)", height: "100vh", overflowY: "scroll"}}>
            <Navbar name={user.name} />
            <div className="flex flex-row justify-between">
                <div className="mx-auto my-5" style={{width: "calc(100vw-569px)", maxWidth: "828px", height: "100vh"}}>
                    <div className="mx-auto flex flex-row justify-between gap-5" style={{height: "169px", width: "95%"}}>
                        <button onClick={navigationHandler.bind(null, "/homepage/wallet")} className="p-5 bg-white rounded-md hover:bg-blue-100 transition-all duration-500 ease-in-out" style={{width: "33%", maxWidth: "262px", height: "169px"}}>
                            <div className="flex flex-row justify-between items-center">
                                <div style={{width: "35px", height: "36px", background: "#BED9C7", borderRadius: "4px"}} className="flex flex-row justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="17" viewBox="0 0 21 17" fill="none">
                                        <path d="M13.4252 8.47717C13.4252 7.64875 14.0968 6.97717 14.9252 6.97717C15.7537 6.97717 16.4252 7.64875 16.4252 8.47717C16.4252 9.3056 15.7537 9.97717 14.9252 9.97717C14.0968 9.97717 13.4252 9.3056 13.4252 8.47717Z" fill="#1A572E"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M18.3666 3.15119C17.7088 1.60553 16.2554 0.494403 14.5259 0.312405L13.874 0.243809C10.5817 -0.102644 7.26098 -0.0797977 3.97374 0.311922L3.5418 0.363394C1.873 0.562254 0.550751 1.86606 0.328475 3.5319C-0.109491 6.81421 -0.109492 10.1402 0.328475 13.4225C0.550751 15.0883 1.873 16.3921 3.5418 16.591L3.97374 16.6425C7.26098 17.0342 10.5817 17.057 13.874 16.7106L14.5259 16.642C16.2554 16.46 17.7088 15.3488 18.3666 13.8032C19.4058 13.4938 20.199 12.5928 20.3292 11.4796C20.5625 9.48477 20.5625 7.4696 20.3292 5.47481C20.199 4.36159 19.4058 3.46062 18.3666 3.15119ZM13.7171 1.73557C10.536 1.40082 7.32741 1.4229 4.15123 1.80138L3.71929 1.85286C2.73048 1.97069 1.947 2.74323 1.8153 3.73029C1.3949 6.88093 1.3949 10.0734 1.8153 13.2241C1.947 14.2111 2.73048 14.9837 3.71929 15.1015L4.15123 15.153C7.32742 15.5315 10.536 15.5535 13.7171 15.2188L14.3689 15.1502C15.2195 15.0607 15.972 14.6415 16.4936 14.0191C14.9854 14.1071 13.4572 14.0678 11.967 13.9012C10.6976 13.7594 9.67103 12.7598 9.52129 11.4796C9.28799 9.48477 9.28799 7.4696 9.52129 5.47481C9.67103 4.19455 10.6976 3.19501 11.967 3.05314C13.4572 2.88659 14.9854 2.84729 16.4936 2.93524C15.972 2.31292 15.2195 1.89367 14.3689 1.80417L13.7171 1.73557ZM17.2026 4.49188C17.2032 4.49572 17.2038 4.49956 17.2044 4.5034L17.2105 4.54229L17.4091 4.51144C17.5119 4.52161 17.6145 4.53242 17.7169 4.54386C18.3043 4.60951 18.7721 5.07366 18.8394 5.64907C19.0591 7.52807 19.0591 9.4263 18.8394 11.3053C18.7721 11.8807 18.3043 12.3449 17.7169 12.4105C17.6145 12.422 17.5119 12.4328 17.4091 12.4429L17.2105 12.4121L17.2044 12.451C17.2038 12.4548 17.2032 12.4587 17.2026 12.4625C15.524 12.6143 13.8024 12.597 12.1336 12.4105C11.5462 12.3449 11.0784 11.8807 11.0111 11.3053C10.7914 9.4263 10.7914 7.52807 11.0111 5.64907C11.0784 5.07366 11.5462 4.60951 12.1336 4.54386C13.8024 4.35735 15.524 4.34002 17.2026 4.49188Z" fill="#1A572E"/>
                                    </svg>
                                </div>
                                <div className="flex flex-row ">
                                    <p className="font-bold">.</p>
                                    <p className="font-bold">.</p>
                                    <p className="font-bold">.</p>
                                </div>
                            </div>
                            <div className="mt-10 text-start">
                                <p className="text-sm">Balance</p>
                                <p className="text-2xl">$4,000.85</p>
                            </div>
                        </button>
                        <div onClick={navigationHandler.bind(null, "/homepage/airspace")} className="p-5 bg-white cursor-pointer hover:bg-blue-100 transition-all duration-500 ease-in-out" style={{width: "33%", maxWidth: "262px", height: "169px", borderRadius: "10px"}}>
                            <div className="flex flex-row justify-between items-center">
                                <div style={{width: "35px", height: "36px", background: "#AAC0EA", borderRadius: "4px"}} className="flex flex-row justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.5579 5.53472C12.6873 4.69936 11.3128 4.69936 10.4422 5.53472L5.8158 9.97405C5.70245 10.0828 5.6262 10.2245 5.59787 10.379C5.04373 13.4009 5.00283 16.4945 5.47687 19.53L5.58939 20.2505H8.56585V14.0391C8.56585 13.6249 8.90164 13.2891 9.31585 13.2891H14.6843C15.0985 13.2891 15.4343 13.6249 15.4343 14.0391V20.2505H18.4107L18.5232 19.53C18.9973 16.4945 18.9564 13.4009 18.4023 10.379C18.3739 10.2245 18.2977 10.0828 18.1843 9.97406L13.5579 5.53472ZM9.40369 4.4524C10.8546 3.06014 13.1455 3.06014 14.5964 4.4524L19.2229 8.89174C19.5634 9.21853 19.7925 9.64422 19.8777 10.1085C20.4622 13.2961 20.5053 16.5594 20.0053 19.7614L19.8245 20.9189C19.7498 21.3976 19.3375 21.7505 18.853 21.7505H14.6843C14.2701 21.7505 13.9343 21.4147 13.9343 21.0005V14.7891H10.0659V21.0005C10.0659 21.4147 9.73007 21.7505 9.31585 21.7505H5.14712C4.66264 21.7505 4.25035 21.3976 4.1756 20.9189L3.99484 19.7614C3.49479 16.5594 3.53794 13.2961 4.12247 10.1085C4.2076 9.64422 4.43668 9.21853 4.77725 8.89173L9.40369 4.4524Z" fill="#0653EA"/>
                                    </svg>
                                </div>
                                <div className="flex flex-row ">
                                    <p className="font-bold">.</p>
                                    <p className="font-bold">.</p>
                                    <p className="font-bold">.</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <div className="mt-10 text-start">
                                    <p className="text-sm">My Airspace</p>
                                    <p className="text-2xl">5</p>
                                </div>
                                <button onClick={addAirspaceHandler} className="bg-dark-blue rounded-md mt-12 text-sm text-white transition-all duration-500 ease-in-out hover:bg-blue-600" style={{width: "113px", height: "29px"}}>Claim AirSpace</button>
                            </div>
                        </div>
                        {/* <button onClick={navigationHandler.bind(null, "/homepage/uavs")} className="p-5 bg-white hover:bg-blue-100 transition-all duration-500 ease-in-out" style={{width: "33%", maxWidth: "262px", height: "169px", borderRadius: "10px"}}> */}
                        <button className="p-5 bg-white cursor-default transition-all duration-500 ease-in-out" style={{width: "33%", maxWidth: "262px", height: "169px", borderRadius: "10px"}}>
                            <div className="flex flex-row justify-between items-center">
                                <div style={{width: "35px", height: "36px", background: "#FFF4D1", borderRadius: "4px"}} className="flex flex-row justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <g clipPath="url(#clip0_462_9841)">
                                        <path d="M20.5002 18.9993H3.50022C2.95022 18.9993 2.50022 19.4493 2.50022 19.9993C2.50022 20.5493 2.95022 20.9993 3.50022 20.9993H20.5002C21.0502 20.9993 21.5002 20.5493 21.5002 19.9993C21.5002 19.4493 21.0502 18.9993 20.5002 18.9993ZM22.0702 9.6393C21.8502 8.8393 21.0302 8.3693 20.2302 8.5793L14.9202 9.9993L8.46022 3.9793C8.19022 3.7193 7.80022 3.6293 7.44022 3.7293C6.76022 3.9193 6.44022 4.6993 6.79022 5.3093L10.2302 11.2693L5.26022 12.5993L3.69022 11.3593C3.44022 11.1693 3.12022 11.0993 2.81022 11.1793L2.48022 11.2693C2.16022 11.3493 2.01022 11.7193 2.18022 11.9993L4.06022 15.2493C4.29022 15.6393 4.75022 15.8293 5.18022 15.7193L21.0002 11.4793C21.8002 11.2593 22.2802 10.4393 22.0702 9.6393Z" fill="#C8A32A"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_462_9841">
                                        <rect width="24" height="24" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="flex flex-row ">
                                    <p className="font-bold">.</p>
                                    <p className="font-bold">.</p>
                                    <p className="font-bold">.</p>
                                </div>
                            </div>
                            <div className="mt-10 text-start">
                                <p className="text-sm">UAVs</p>
                                <p className="text-2xl">0</p>
                            </div>
                        </button>            
                    </div>
                    <div className="mx-auto mt-5 bg-white pt-10 flex flex-row justify-center rounded-md" style={{width: "95%",  height: "calc(100vh - 189px)", maxHeight: "653px"}}>
                        <canvas id="chart"></canvas>
                    </div>
                </div>
                <div className="my-5 me-5 rounded-md" style={{width: "292px", height: "100vh",}}>
                    {/* <div className="bg-white my-5 me-2 p-3" style={{width: "100%", height: "342px", borderRadius: "10px",}}>
                        <div className="bg-light-blue-100 relative rounded-md py-5 px-3" style={{height: "175px"}}>
                            <div className="rounded-md flex flex-row justify-center items-center" style={{height: "118px", background: "linear-gradient(118deg, #AAC0EA 9.28%, #6A6AED 101.85%)"}}>
                                <div>
                                    <p className="text-light-blue-100">Cloudy</p>
                                    <p className="text-5xl text-light-blue-100 relative">31<span className="absolute top-0 text-sm">o</span></p>
                                </div>
                                <Image src="/images/cloud.png" alt="a cloud picture" width={86} height={86} />
                            </div>
                            <div className="bg-white absolute flex flex-row items-center justify-center top-1 rounded-2xl" style={{width: "60%", left: "20%", height: "22px"}}>
                                <p className="text-sm text-dark-brown">Tuesday, 4 July</p>
                            </div>
                            <div className="bg-white absolute flex flex-row items-center justify-between px-5 shadow-md rounded-md -bottom-8" style={{width: "90%", height: "61px"}}>
                                <div className="flex flex-col items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M15.4165 18.9583C13.4665 18.9583 11.8748 17.3667 11.8748 15.4167V15C11.8748 14.6583 12.1582 14.375 12.4998 14.375C12.8415 14.375 13.1248 14.6583 13.1248 15V15.4167C13.1248 16.6833 14.1498 17.7083 15.4165 17.7083C16.6832 17.7083 17.7082 16.6833 17.7082 15.4167C17.7082 14.15 16.6832 13.125 15.4165 13.125H1.6665C1.32484 13.125 1.0415 12.8417 1.0415 12.5C1.0415 12.1583 1.32484 11.875 1.6665 11.875H15.4165C17.3665 11.875 18.9582 13.4667 18.9582 15.4167C18.9582 17.3667 17.3665 18.9583 15.4165 18.9583Z" fill="#0653EA"/>
                                        <path d="M15.4165 10.6243H1.6665C1.32484 10.6243 1.0415 10.341 1.0415 9.99935C1.0415 9.65768 1.32484 9.37435 1.6665 9.37435H15.4165C16.6832 9.37435 17.7082 8.34935 17.7082 7.08268C17.7082 5.81602 16.6832 4.79102 15.4165 4.79102C14.1498 4.79102 13.1248 5.81602 13.1248 7.08268V7.49935C13.1248 7.84102 12.8415 8.12435 12.4998 8.12435C12.1582 8.12435 11.8748 7.84102 11.8748 7.49935V7.08268C11.8748 5.13268 13.4665 3.54102 15.4165 3.54102C17.3665 3.54102 18.9582 5.13268 18.9582 7.08268C18.9582 9.03268 17.3665 10.6243 15.4165 10.6243Z" fill="#0653EA"/>
                                        <path d="M7.75817 8.12591H1.6665C1.32484 8.12591 1.0415 7.84258 1.0415 7.50091C1.0415 7.15925 1.32484 6.87591 1.6665 6.87591H7.75817C8.64984 6.87591 9.37484 6.15091 9.37484 5.25924C9.37484 4.36758 8.64984 3.64258 7.75817 3.64258C6.8665 3.64258 6.1415 4.36758 6.1415 5.25924V5.57591C6.1415 5.91758 5.85817 6.20091 5.5165 6.20091C5.17483 6.20091 4.8915 5.91758 4.8915 5.57591V5.25924C4.8915 3.67591 6.17484 2.39258 7.75817 2.39258C9.3415 2.39258 10.6248 3.67591 10.6248 5.25924C10.6248 6.84258 9.3415 8.12591 7.75817 8.12591Z" fill="#0653EA"/>
                                    </svg>
                                    <p className="text-dark-brown font-semibold text-sml">6 km/h</p>
                                    <p className="text-dark-brown text-xxs">Wind</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10.5084 1.84102C10.2084 1.60768 9.79174 1.60768 9.49174 1.84102C7.90841 3.04935 3.2334 6.99101 3.2584 11.5827C3.2584 15.2993 6.28341 18.3327 10.0084 18.3327C13.7334 18.3327 16.7584 15.3077 16.7584 11.591C16.7667 7.06602 12.0834 3.05768 10.5084 1.84102Z" stroke="#0653EA" stroke-width="1.5" stroke-miterlimit="10"/>
                                    </svg>
                                    <p className="text-dark-brown font-semibold text-sml">16 %</p>
                                    <p className="text-dark-brown text-xxs">Humidity</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M12.9833 10.0009C12.9833 11.6509 11.6499 12.9842 9.99993 12.9842C8.34993 12.9842 7.0166 11.6509 7.0166 10.0009C7.0166 8.35091 8.34993 7.01758 9.99993 7.01758C11.6499 7.01758 12.9833 8.35091 12.9833 10.0009Z" stroke="#0653EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M9.99987 16.8913C12.9415 16.8913 15.6832 15.1579 17.5915 12.1579C18.3415 10.9829 18.3415 9.00794 17.5915 7.83294C15.6832 4.83294 12.9415 3.09961 9.99987 3.09961C7.0582 3.09961 4.31654 4.83294 2.4082 7.83294C1.6582 9.00794 1.6582 10.9829 2.4082 12.1579C4.31654 15.1579 7.0582 16.8913 9.99987 16.8913Z" stroke="#0653EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <p className="text-dark-brown font-semibold text-sml">1.4 km</p>
                                    <p className="text-dark-brown text-xxs">Visibility</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12">
                            <p>Today</p>
                            <div className="flex flex-row gap-2">
                                <div className="w-1/5 rounded mt-1 flex flex-col justify-center items-center" style={{height: "61px", background: "linear-gradient(118deg, #AAC0EA 9.28%, #6A6AED 101.85%)"}}>
                                    <p className="text-sml text-light-blue-100 relative">31<span className="absolute top-0 text-xxs">o</span></p>
                                    <Image src="/images/cloud.png" alt="a cloud picture" width={20} height={20} />
                                    <p className="text-sml text-light-blue-100 relative">11:00</p>
                                </div>
                                <div className="w-1/5 rounded mt-1 bg-bleach-white shadow flex flex-col justify-center items-center" style={{height: "61px",}}>
                                    <p className="text-sml text-dark-brown relative">29<span className="absolute top-0 text-xxs">o</span></p>
                                    <Image src="/images/cloud-drizzle.png" alt="a cloud picture" width={20} height={20} />
                                    <p className="text-sml text-dark-brown relative">12:00</p>
                                </div>
                                <div className="w-1/5 rounded mt-1 bg-bleach-white shadow flex flex-col justify-center items-center" style={{height: "61px",}}>
                                    <p className="text-sml text-dark-brown relative">33<span className="absolute top-0 text-xxs">o</span></p>
                                    <Image src="/images/cloud-lightning.png" alt="a cloud picture" width={20} height={20} />
                                    <p className="text-sml text-dark-brown relative">12:00</p>
                                </div>
                                <div className="w-1/5 rounded mt-1 bg-bleach-white shadow flex flex-col justify-center items-center" style={{height: "61px",}}>
                                    <p className="text-sml text-dark-brown relative">31<span className="absolute top-0 text-xxs">o</span></p>
                                    <Image src="/images/cloud-snow.png" alt="a cloud picture" width={20} height={20} />
                                    <p className="text-sml text-dark-brown relative">12:00</p>
                                </div>
                                <div className="w-1/5 rounded mt-1 bg-bleach-white shadow flex flex-col justify-center items-center" style={{height: "61px",}}>
                                    <p className="text-sml text-dark-brown relative">24<span className="absolute top-0 text-xxs">o</span></p>
                                    <Image src="/images/sun.png" alt="a cloud picture" width={20} height={20} />
                                    <p className="text-sml text-dark-brown relative">12:00</p>
                                </div>
                            </div>
                        </div>
                    </div> */}



                    <div className="bg-white me-2 py-5 px-4 overflow-y-auto" style={{width: "100%", height: "100%", borderRadius: "10px"}}>
                            <h2 className="font-bold text-xl mb-3">News Feed</h2>
                        <div className="flex flex-row justify-between mb-5 items-center">
                            <p className="font-semibold" style={{color: "#722ACF"}}>{month} {day}</p>
                            <hr style={{width: "150px"}}></hr>
                            <div className="flex flex-row ">
                                <p className="font-bold">.</p>
                                <p className="font-bold">.</p>
                                <p className="font-bold">.</p>
                            </div>
                        </div>
                        {(newslettersLoading && newsletters.length < 1) && <p className="text-sm text-center">Loading...</p>}
                        {newsletters.map(newsletter => {
                            return <div key={newsletter.id} className="flex flex-row items-center mb-3">
                                    <p className="text-sm w-1/4">{newsletter.date}</p>
                                    <div className="border-l-4 w-3/4 border-black ps-2 ms-2">
                                        <h3 className="text-sml font-bold">{newsletter.title}</h3>
                                        <p className="text-sm">{newsletter.text}</p>
                                        <a className="text-xs text-blue-600" href={newsletter.link}>continue reading</a>
                                    </div>
                                </div>
                            }) 
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-row mt-10 justify-between items-center">
                <p className="ms-5">&copy; Skytrades 2023</p>
                <div className="flex flex-row items-center gap-1 pe-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none">
                        <path d="M12.6 0H1.4C0.63 0 0 0.61875 0 1.375V9.625C0 10.3813 0.63 11 1.4 11H12.6C13.37 11 14 10.3813 14 9.625V1.375C14 0.61875 13.37 0 12.6 0ZM12.32 2.92188L7.742 5.73375C7.287 6.01562 6.713 6.01562 6.258 5.73375L1.68 2.92188C1.505 2.81188 1.4 2.62625 1.4 2.42688C1.4 1.96625 1.911 1.69125 2.31 1.93187L7 4.8125L11.69 1.93187C12.089 1.69125 12.6 1.96625 12.6 2.42688C12.6 2.62625 12.495 2.81188 12.32 2.92188Z" fill="black" fillOpacity="0.5"/>
                    </svg>
                    <p>help@skytrades.com</p>
                </div>
            </div>
        </div>
    </div>
}

export default Dashboard;

export async function getServerSideProps() {
    const users = await User.findAll();

    return {
        props: {
            users: JSON.parse(JSON.stringify(users))
        },
    }
}
