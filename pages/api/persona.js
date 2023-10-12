// import { buffer } from "micro";
const { createHmac, timingSafeEqual } = await import('node:crypto'); 

const handler = async (req, res) => {
    if(req.method === "POST") {
        console.log("referenceId => ", req.body.data.attributes.payload.data.attributes['reference-id']);
        // const sigParams = {}
        // req.headers['persona-signature']
        //     .split(',')
        //     .forEach(pair => {
        //         const [key, value] = pair.split('=');
        //         sigParams[key] = value;
        //     })
        // if (sigParams.t && sigParams.v1) {
        //     const hmac = createHmac('sha256', process.env.WEBHOOK_SECRET_KEY)
        //     .update(`${sigParams.t}.${req.body}`)
        //     .digest('hex');
        //     if (timingSafeEqual(Buffer.from(hmac), Buffer.from(sigParams.v1))) {
        //         // Handle verified webhook event
        //         console.log("event received successfully ");
        //         res.json({ received: true });
        //     }
        // }
        
    
    
        
        let event;
        try {
            event = req.body.data.attributes.name;
            const reqBody = {
              userId: Number(req.body.data.attributes.payload.data.attributes['reference-id']),
              event: event
            }
            const fetchOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                api_key: process.env.FRONTEND_API_KEY,
              },
              body: JSON.stringify(reqBody)
            };
            const fetchRes = await fetch(
              `${process.env.SERVER_URL}/services/persona`,
              fetchOptions
            );
            const resData = await fetchRes.json();

              if (resData?.data && resData?.data?.statusCode >= 400) {
                throw new Error(resData.data.message);
              }
          } catch (err) {
            let message = "Unknown Error";
            if (err instanceof Error) message = err.message;
            res.status(400).send(`Webhook Error: ${message}`);
            return;
          }

          

        // console.log("respose received => ", event); 
        // switch (event) {
        //     case "inquiry.approved":
        //       console.log("Yohoo!!!! Inquiry approved")
        //       break;
        //     case "inquiry.declined":
        //         console.log("oops!!! Inquiry declined")
        //         break;
        //     case "document.errored":
        //         console.log("there has been error in the document")
        //         break;
        //     case "inquiry.marked-for-review":
        //         console.log("Verification may take longer")
        //         break;
        //     default:
        //       console.log(`Unhandled event received ${event}`);
        //   }
          res.json({ received: true });
    }
}

export default handler;