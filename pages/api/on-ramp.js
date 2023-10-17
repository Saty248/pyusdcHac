// const fetch = require('node-fetch');
import fetch from "node-fetch";

const handler = (req, res) => {
    if(req.method === "POST") {
        const stripeSecretKey = 'sk_test_51MRzIzIVelVZN1eROv5D4liCOoUHOH5UfbI2YUlVT3wGT1rkqeYnSJVfVxnt0g9Zk2nDn2ZOqFPTg0361oDlRJc1009xmc5dXi';
        const walletAddress = req.body.wallet;

        const apiUrl = 'https://api.stripe.com/v1/crypto/onramp_sessions';

        const requestData = {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${Buffer.from(stripeSecretKey + ':').toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `wallet_addresses[ethereum]=${walletAddress}`,
        // Add any additional parameters here
        };

        fetch(apiUrl, requestData)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log("An error occurred")
            console.error(error);
        });
    }
}

export default handler;
