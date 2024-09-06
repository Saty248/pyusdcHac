import { useEffect, useState } from "react";
import { loadStripeOnramp } from "@stripe/crypto";
import axios from "axios";

export default function OnrampComponent({clientSecret,setClientSecret,showOnramp,setShowOnramp}) {
  // const [clientSecret, setClientSecret] = useState<string>("");
  const [onramp, setOnramp] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  // const [showOnramp, setShowOnramp] = useState<boolean>(false); // State to toggle the widget
  console.log(process.env.STRIPEONRAMP_APIKEY,"process.env.STRIPEONRAMP_APIKEY")
  const stripeOnrampPromise = loadStripeOnramp('pk_test_51MRzIzIVelVZN1eRHjwBDzNvOb5lc65TvVoMtYFMUlZiyzXNXZE63TtoPspFu22pGAoSdlEeOgn6VWlu3XmKmMSd00LgkRYTfv');

  // Fetch client secret when button is clicked (to avoid unnecessary API calls)
  // const handleButtonClick = async () => {
  //   const res = await axios.post('http://localhost:8888/public/stripe/onramp-session',{
  //     "transaction_details": {
  //       "destination_currency": "usdc",
  //       "destination_exchange_amount": "13.37",
  //       "destination_network": "solana"
  //     }
  //   })
  //   setShowOnramp(true);
    
  //   setClientSecret(res.data.clientSecret);
  // }
  useEffect(() => {
    if (clientSecret) {
      stripeOnrampPromise.then((stripeOnramp) => {
        if (!stripeOnramp) {
          console.error("Failed to load Stripe Onramp");
          return;
        }

        const onrampSession = stripeOnramp.createSession({
          clientSecret,
          // appearance: {
          //   theme: "dark",
          // },
        });

        setOnramp(onrampSession);
        onrampSession.mount("#onramp-element");
      });
    }
  }, [clientSecret]);


  return (
    <div>
      {/* Button to show the Onramp widget */}
      {/* {!showOnramp && (
        <button onClick={handleButtonClick} style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
          Deposit USDC
        </button>
      )} */}

      {/* Conditionally render the Onramp widget */}
      {showOnramp && (
        <div className="fixed left-0  md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-white md:rounded-[30px] rounded-t-3xl  overflow-y-auto overflow-x-hidden z-[500] sm:z-50 flex flex-col fund-table-scrollbar">
          <div>
            <div id="onramp-element" style={{ height:"500px", minWidth: "320px" }}></div>
            {message && <div id="onramp-message">{message}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
