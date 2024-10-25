import axios from 'axios';

app.post('/api/mpesa/initiate', async (req, res) => {
  const { phoneNumber, amount } = req.body;
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15);
  const password = Buffer.from(`${process.env.BUSINESS_SHORTCODE}${process.env.PASSWORD}${timestamp}`).toString('base64');

  const requestPayload = {
    BusinessShortCode: process.env.BUSINESS_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: process.env.BUSINESS_SHORTCODE,
    PhoneNumber: phoneNumber,
    CallBackURL: process.env.CALLBACK_URL,
    AccountReference: "YourAppName",
    TransactionDesc: "Payment for event ticket"
  };

  console.log('Request Payload:', requestPayload); // Log the payload

  try {
    const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', requestPayload, {
      headers: {
        Authorization: `Bearer ${yourAccessToken}`
      }
    });
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('MPESA Error:', error); // Log the error
    res.status(400).json({ success: false, message: 'Failed to initiate STK Push', error: error.response.data });
  }
});
