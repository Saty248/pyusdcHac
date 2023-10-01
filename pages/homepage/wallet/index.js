import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import User from "@/models/User";
import Backdrop from "@/Components/Backdrop";
import Spinner from "@/Components/Spinner";

const Wallet = (props) => {
    const { users } = props;

    const router = useRouter();

    const [user, setUser] = useState();
    const [token, setToken] = useState("");

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

    const depositRouteHandler = () => {
        router.push("/homepage/wallet/deposit");
    }

    const withdrawalRouteHandler = () => {
        router.push("/homepage/wallet/withdraw");
    }

    if(!user || !token) {
        return <div>            
                <Backdrop />
                <Spinner />
            </div>
    }     

    return <div className="flex flex-row">
        <Sidebar />
        <div style={{width: "calc(100vw - 257px)", height: "100vh"}} className="overflow-y-auto">
            <Navbar name={user.name} />
            <div className="bg-bleach-green flex flex-col mt-5 mx-auto relative items-center rounded-lg p-7" style={{width: "395px", height: "169px", boxShadow: "0px 2px 20px 0px rgba(0, 0, 0, 0.13)"}}>
                <div className="z-20 text-center">
                    <p className="text-light-brown">My Wallet</p>
                    <p className="text-light-brown font-semibold mt-2 text-2xl">$<span>4.000.85</span></p>
                </div>
                <div className="z-20 flex flex-row justify-center items-center gap-4 absolute -bottom-3">
                    <button onClick={depositRouteHandler} className="flex flex-row justify-center gap-2 rounded-lg items-center transition-all duration-500 ease-in-out hover:bg-bleach-blue bg-white" style={{width: "151px", height: "52px"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5.75 12C5.75 11.5858 5.41421 11.25 5 11.25C4.58579 11.25 4.25 11.5858 4.25 12L4.25 18C4.25 18.9665 5.0335 19.75 6 19.75L18 19.75C18.9665 19.75 19.75 18.9665 19.75 18L19.75 12C19.75 11.5858 19.4142 11.25 19 11.25C18.5858 11.25 18.25 11.5858 18.25 12L18.25 18C18.25 18.1381 18.1381 18.25 18 18.25L6 18.25C5.86193 18.25 5.75 18.1381 5.75 18L5.75 12Z" fill="black"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8848 3.25C10.1944 3.25 9.63478 3.80964 9.63478 4.5L9.63478 9.1126C9.56136 9.11912 9.48795 9.12595 9.41457 9.13308L8.85869 9.18711C8.01058 9.26954 7.50267 10.1701 7.87093 10.9386C8.65413 12.5728 9.82945 14.1514 11.1382 15.4049C11.6229 15.8691 12.3872 15.8691 12.8719 15.4049L12.9755 15.3057C14.2842 14.0522 15.356 12.5728 16.1392 10.9386C16.5074 10.1701 15.9995 9.26954 15.1514 9.18711L14.5955 9.13308C14.5221 9.12595 14.4487 9.11912 14.3753 9.1126L14.3753 4.5C14.3753 3.80964 13.8157 3.25 13.1253 3.25L10.8848 3.25ZM10.4693 10.5532C10.8463 10.5107 11.1348 10.1913 11.1348 9.80797L11.1348 4.75L12.8753 4.75L12.8753 9.80797C12.8753 10.2041 13.1833 10.5319 13.5786 10.5565C13.8695 10.5747 14.1601 10.5978 14.4504 10.626L14.6118 10.6417C13.9393 11.9466 13.0591 13.1342 12.005 14.1577C11.5649 13.7303 11.1552 13.2744 10.7781 12.7932C10.2522 12.122 9.79002 11.4018 9.39834 10.6417L9.55968 10.626C9.84995 10.5978 10.1406 10.5747 10.4315 10.5565C10.4442 10.5557 10.4568 10.5546 10.4693 10.5532Z" fill="black"/>
                        </svg>
                        <p>Deposit</p>
                    </button>
                    <button onClick={withdrawalRouteHandler} className="flex flex-row justify-center gap-2 rounded-lg  transition-all duration-500 ease-in-out hover:bg-bleach-blue items-center bg-white" style={{width: "151px", height: "52px"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5.75 12C5.75 11.5858 5.41421 11.25 5 11.25C4.58579 11.25 4.25 11.5858 4.25 12L4.25 18C4.25 18.9665 5.0335 19.75 6 19.75L18 19.75C18.9665 19.75 19.75 18.9665 19.75 18L19.75 12C19.75 11.5858 19.4142 11.25 19 11.25C18.5858 11.25 18.25 11.5858 18.25 12L18.25 18C18.25 18.1381 18.1381 18.25 18 18.25L6 18.25C5.86193 18.25 5.75 18.1381 5.75 18L5.75 12Z" fill="black"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.63478 14.5031C9.63478 15.1934 10.1944 15.7531 10.8848 15.7531L13.1253 15.7531C13.8157 15.7531 14.3753 15.1934 14.3753 14.5031L14.3753 9.89048C14.4487 9.88396 14.5221 9.87713 14.5955 9.86999L15.1514 9.81597C15.9995 9.73354 16.5074 8.83294 16.1392 8.06451C15.356 6.43029 14.2842 4.95085 12.9755 3.69735L12.8719 3.59816C12.3872 3.13395 11.6229 3.13395 11.1382 3.59815L11.0346 3.69735C9.72587 4.95085 8.65413 6.43029 7.87093 8.06451C7.50267 8.83293 8.01058 9.73354 8.85869 9.81597L9.41457 9.87C9.48795 9.87713 9.56136 9.88396 9.63478 9.89048L9.63478 14.5031ZM11.1348 9.19511C11.1348 8.92874 10.9955 8.69326 10.784 8.56008C10.681 8.49523 10.5609 8.45464 10.4315 8.44656C10.1406 8.42842 9.84995 8.40524 9.55968 8.37703L9.39834 8.36135C9.93226 7.3253 10.5972 6.36316 11.3761 5.49838C11.5782 5.27402 11.7879 5.05622 12.005 4.84538C13.0591 5.86892 13.9393 7.05651 14.6118 8.36135L14.4504 8.37703C14.1601 8.40524 13.8695 8.42842 13.5786 8.44656C13.1833 8.47122 12.8753 8.79902 12.8753 9.19511L12.8753 14.2531L11.1348 14.2531L11.1348 9.19511Z" fill="black"/>
                        </svg>
                        <p>Withdraw</p>
                    </button>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-4 right-6 z-10" width="146" height="121" viewBox="0 0 146 121" fill="none">
                    <path d="M95.5943 60.4999C95.5943 54.5876 100.376 49.7947 106.275 49.7947C112.174 49.7947 116.956 54.5876 116.956 60.4999C116.956 66.4122 112.174 71.2051 106.275 71.2051C100.376 71.2051 95.5943 66.4122 95.5943 60.4999Z" fill="#1A572E" fill-opacity="0.1"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M130.779 22.4894C126.096 11.4583 115.747 3.52846 103.432 2.22957L98.79 1.74002C75.3471 -0.732551 51.7018 -0.5695 28.295 2.22613L25.2194 2.59347C13.3367 4.01269 3.92162 13.3177 2.3389 25.2065C-0.779634 48.6317 -0.779634 72.3683 2.3389 95.7935C3.92162 107.682 13.3367 116.987 25.2194 118.407L28.295 118.774C51.7018 121.57 75.3471 121.733 98.79 119.26L103.432 118.77C115.747 117.472 126.096 109.542 130.779 98.5105C138.179 96.3022 143.827 89.8722 144.754 81.9273C146.415 67.691 146.415 53.309 144.754 39.0727C143.827 31.1278 138.179 24.6977 130.779 22.4894ZM97.6723 12.3864C75.0213 9.9974 52.1748 10.1549 29.5588 12.8561L26.4832 13.2235C19.4423 14.0644 13.8636 19.5779 12.9258 26.6224C9.93238 49.1078 9.93238 71.8922 12.9258 94.3776C13.8636 101.422 19.4423 106.936 26.4832 107.777L29.5588 108.144C52.1748 110.845 75.0213 111.003 97.6723 108.614L102.314 108.124C108.37 107.485 113.729 104.493 117.442 100.052C106.704 100.679 95.8219 100.399 85.2108 99.2103C76.1724 98.1978 68.8625 91.0643 67.7963 81.9273C66.1351 67.691 66.1351 53.309 67.7963 39.0727C68.8625 29.9357 76.1724 22.8022 85.2108 21.7897C95.8219 20.601 106.704 20.3205 117.442 20.9482C113.729 16.5068 108.37 13.5148 102.314 12.876L97.6723 12.3864ZM122.491 32.0577C122.495 32.0851 122.5 32.1125 122.504 32.1399L122.547 32.4174L123.961 32.1972C124.693 32.2698 125.424 32.347 126.153 32.4287C130.336 32.8972 133.666 36.2097 134.146 40.3163C135.71 53.7264 135.71 67.2736 134.146 80.6837C133.666 84.7903 130.336 88.1028 126.153 88.5713C125.424 88.653 124.693 88.7302 123.961 88.8028L122.547 88.5826L122.504 88.8601C122.5 88.8875 122.495 88.9149 122.491 88.9423C110.538 90.0261 98.2801 89.9025 86.3972 88.5713C82.2146 88.1028 78.884 84.7903 78.4048 80.6837C76.8399 67.2736 76.8399 53.7264 78.4048 40.3163C78.884 36.2097 82.2146 32.8972 86.3972 32.4287C98.2801 31.0975 110.538 30.9739 122.491 32.0577Z" fill="#1A572E" fill-opacity="0.1"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 z-10" width="137" height="103" viewBox="0 0 137 103" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M130.63 103H10C4.47717 103 0 98.5229 0 93V10.0757C13.4341 3.66759 29.0313 0 45.6673 0C96.1093 0 137.001 33.7183 137.001 75.3118C137.001 85.0882 134.742 94.4294 130.63 103Z" fill="#AECCB8"/>
                </svg>
            </div>
            <div className="bg-white mx-auto ps-6 pe-2.5 rounded-md mt-10 flex flex-row justify-between items-center" style={{width: "calc(100vw - 257px)", maxWidth: "1139px", height: "47px"}}>
                <h3>Transaction History</h3>
                <form className="flex flex-row justify-center gap-2 items-center">
                    <input type="text" className="bg-light-grey ps-3 rounded placeholder:text-sm placeholder:text-light-brown focus:outline-blue-200" placeholder="Search Transaction" style={{width: "211px", height: "27px"}} />
                    <button className="bg-blue text-white rounded px-1 text-sm" style={{width: "73px", height: "27px"}}>SEARCH</button>
                    <select type="text" className="bg-light-grey ps-3 text-sm rounded placeholder:text-sm placeholder:text-light-brown focus:outline-blue-200" style={{width: "123px", height: "27px"}}>
                        <option disabled selected>Last 30 Days</option>
                    </select>
                </form>
            </div>
            <div className="mx-auto ps-6 pe-16 gap-x-6 font-semibold rounded-md mt-2 flex flex-row justify-between items-center" style={{width: "calc(100vw - 257px)", maxWidth: "1139px", height: "47px"}}>
                <p className="w-1/12">Date</p>
                <p className="w-2/12">Transaction ID</p>
                <p className="w-4/12">Transaction Details</p>
                <p className="w-1/12">In/Out</p>
                <p className="w-3/12">Amount</p>
                <p className="w-1/12">Status</p>
            </div>
            <div className="mx-auto bg-white gap-x-6 ps-6 pe-16 rounded-md mt-2 flex flex-row justify-between items-center" style={{height: "47px"}}>
                <p className="w-1/12">28/10/2012</p>
                <p className="w-2/12">509630</p>
                <p className="w-4/12">Transaction Details</p>
                <p className="w-1/12">$<span>44.00</span></p>
                <p className="w-3/12">Amount</p>
                <p className="w-1/12 bg-bleach-green rounded-lg text-light-dark text-sml flex flex-row items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                        <circle cx="3" cy="3" r="3" fill="#1A572E"/>
                    </svg>
                    Active
                </p>
            </div>
            <div className="mx-auto bg-white gap-x-6 ps-6 pe-16 rounded-md mt-2 flex flex-row justify-between items-center" style={{height: "47px"}}>
                <p className="w-1/12">28/10/2012</p>
                <p className="w-2/12">509630</p>
                <p className="w-4/12">Transaction Details</p>
                <p className="w-1/12">$<span>44.00</span></p>
                <p className="w-3/12">Amount</p>
                <p className="w-1/12 bg-bleach-green rounded-lg text-light-dark text-sml flex flex-row items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                        <circle cx="3" cy="3" r="3" fill="#1A572E"/>
                    </svg>
                    Active
                </p>
            </div>
            <div className="mx-auto bg-white gap-x-6 ps-6 pe-16 rounded-md mt-2 flex flex-row justify-between items-center" style={{height: "47px"}}>
                <p className="w-1/12">28/10/2012</p>
                <p className="w-2/12">509630</p>
                <p className="w-4/12">Transaction Details</p>
                <p className="w-1/12">$<span>44.00</span></p>
                <p className="w-3/12">Amount</p>
                <p className="w-1/12 bg-bleach-green rounded-lg text-light-dark text-sml flex flex-row items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                        <circle cx="3" cy="3" r="3" fill="#1A572E"/>
                    </svg>
                    Active
                </p>
            </div>
            <div className="mx-auto bg-white gap-x-6 ps-6 pe-16 rounded-md mt-2 flex flex-row justify-between items-center" style={{height: "47px"}}>
                <p className="w-1/12">28/10/2012</p>
                <p className="w-2/12">509630</p>
                <p className="w-4/12">Transaction Details</p>
                <p className="w-1/12">$<span>44.00</span></p>
                <p className="w-3/12">Amount</p>
                <p className="w-1/12 bg-bleach-green rounded-lg text-light-dark text-sml flex flex-row items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                        <circle cx="3" cy="3" r="3" fill="#1A572E"/>
                    </svg>
                    Active
                </p>
            </div>
        </div>
    </div>
}

export default Wallet;

export async function getStaticProps () {
    const users = await User.findAll();

    return {
        props: {
            users: JSON.parse(JSON.stringify(users))
        },
        revalidate : 60 * 30
    }
}