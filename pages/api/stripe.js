const handler = (req, res) => {
    if(req.method === "GET") {
        const apiKey = "sk_test_51MRzIzIVelVZN1eROv5D4liCOoUHOH5UfbI2YUlVT3wGT1rkqeYnSJVfVxnt0g9Zk2nDn2ZOqFPTg0361oDlRJc1009xmc5dXi";
                
        fetch('https://api.stripe.com/v1/crypto/onramp_sessions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then(data => {
            console.log("This is from stripe", data)
            res.status(200).json({
                clientSecret: data.client_secret
            })
        })
        .catch(error => {
            console.error('Error:', error)
            res.status(500).json({
                message: "something went wrong. kindly try again"
            })
        });
    }
}

export default handler;