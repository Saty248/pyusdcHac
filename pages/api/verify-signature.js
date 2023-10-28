const { SIWWeb3 } = require("@web3auth/sign-in-with-web3");


const handler = (req, res) => {
    if(req.method === "POST") {
        const refinedSignature = JSON.parse(req.headers.signature);
      

        async function verifyMessage(jsonPayload) {
            const { header, payload, signature, network } = JSON.parse(jsonPayload);
            const message = new SIWWeb3({
              header,
              payload,
              network,
            });

            // return await message.verify(payload, signature, network);
            const res = await message.verify(payload, signature, network);
            console.log(res);
          }

          const refinedHeader = JSON.stringify({
            header: {
              t: "sip99"
            },
            payload: refinedSignature.payload,
            signature: {
              s: refinedSignature.sign,
              t: "sip99"
            },
            network: "solana"
          })

          console.log("This is the finalized header", refinedHeader);

        
          const verify = async function () {
            const isVerified = await verifyMessage(refinedHeader);
            if (isVerified.success) {
              console.log("Verified!");
              res.status(200).json({
                message: "Your signature has been verified"
              })
            } else {
              console.log("Not Verified!");
              res.status(401).json({
                message: "sorry! we were unable to verify your signature"
              })
            }
          };
          
          verify();
    }
}

export default handler;