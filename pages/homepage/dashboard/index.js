import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import { useEffect } from "react";
// import { Chart } from "chart.js";
import Chart from "chart.js/auto";

const Dashboard = () => {
    useEffect(() => {
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
                // padding: 10,
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.5)',
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
    }, [])



    return <div className="flex flex-row mx-auto" style={{maxWidth: "1440px"}}>
        <Sidebar />
        <div style={{width: "1183px", height: "100vh", overflowY: "scroll"}}>
            <Navbar />
            <div className="flex flex-row">
                <div className="">
                    <div className="flex flex-row gap-5">
                        <div className="ms-5 my-5 p-5" style={{width: "262px", height: "169px", borderRadius: "10px", background: "#fff"}}>
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
                            <div className="mt-10">
                                <p>Balance</p>
                                <h3>$4,000.85</h3>
                            </div>
                        </div>
                        <div className="my-5 p-5" style={{width: "262px", height: "169px", borderRadius: "10px", background: "#fff"}}>
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
                            <div className="mt-10">
                                <p>My Airspace</p>
                                <h3>5</h3>
                            </div>
                        </div>
                        <div className="my-5 p-5" style={{width: "262px", height: "169px", borderRadius: "10px", background: "#fff"}}>
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
                            <div className="mt-10">
                                <p>UAVs</p>
                                <h3>5</h3>
                            </div>
                        </div>            
                    </div>
                    <div className="bg-white mx-5 pt-10 px-5" style={{width: "826px", height: "553px", borderRadius: "10px"}}>
                        <canvas id="chart"></canvas>
                    </div>
                    
                </div>
                <div>
                    <div className="bg-white my-5 me-2" style={{width: "292px", height: "298px", borderRadius: "10px",}}>
                        
                    </div>
                    <div className="bg-white my-5 me-2 py-5 px-4" style={{width: "292px", height: "424px", borderRadius: "10px"}}>
                            <h2 className="font-bold text-xl mb-3">News Feed</h2>
                        <div className="flex flex-row justify-between mb-5 items-center">
                            <p className="font-semibold" style={{color: "#722ACF"}}>4 Jul</p>
                            <hr style={{width: "150px"}}></hr>
                            <div className="flex flex-row ">
                                <p className="font-bold">.</p>
                                <p className="font-bold">.</p>
                                <p className="font-bold">.</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center mb-3">
                            <p>9:00am</p>
                            <div className="border-l-4 border-black ps-2 ms-2">
                                <h3>Title</h3>
                                <p className="text-sm">Lorem ipsum dolor sit amet, adipiscing elit, sed doeiusmod temporut.</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center mb-3">
                            <p>9:00am</p>
                            <div className="border-l-4 border-black ps-2 ms-2">
                                <h3>Title</h3>
                                <p className="text-sm">Lorem ipsum dolor sit amet, adipiscing elit, sed doeiusmod temporut.</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center mb-3">
                            <p>9:00am</p>
                            <div className="border-l-4 border-black ps-2 ms-2">
                                <h3>Title</h3>
                                <p className="text-sm">Lorem ipsum dolor sit amet, adipiscing elit, sed doeiusmod temporut.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="flex flex-row mt-10 justify-between items-center">
                <p className="ms-5">&copy; Skytrades 2023</p>
                <div className="flex flex-row -me-24 items-center gap-1">
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