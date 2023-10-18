// todo: Add documentation

// Proxy URL: ${frontendHttp}/api/proxy
const handler = async (req, res) => {
  try {
    const requestBody = JSON.stringify(req.body);

    const fetchOptions = {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        api_key: process.env.FRONTEND_API_KEY,
      },
    };

    // todo: somehow prevent the user to call unexistent routes or w/ the wrong method
    if (req.method !== "GET") {
      fetchOptions.body = requestBody;
    }

    console.log(process.env.SERVER_URL);

    const fetchRes = await fetch(
      `${process.env.SERVER_URL}${req.headers.uri}`,
      fetchOptions
    );

    const resData = await fetchRes.json();
    console.log(resData);

    if (resData?.data && resData?.data?.statusCode >= 400) {
      throw new Error(resData.data.message);
    }

    return res.json(resData);
  } catch (err) {
    // todo: return error from backend server
    console.error(err.message);
    return res.status(500).json({ ok: false, errorMessage: err.message });
  }
};

export default handler;
