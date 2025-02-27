const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

router.post('/send-sms', async (req, res) => {
  const { phoneNumber, messageBody } = req.body; // Accept phone number and message body from the request

  try {
    // Validate phone number (basic validation)
    if (!phoneNumber || phoneNumber.length < 10 || !phoneNumber.startsWith('+')) {
      return res.status(400).json({ message: 'Invalid phone number. Ensure it is in E.164 format.' });
    }

    // Send SMS notification
    const message = await client.messages.create({
      body: messageBody, // Message body
      from: process.env.TWILIO_PHONE_NUMBER, // Use environment variable for Twilio phone number
      to: phoneNumber // The phone number provided in the request
    });

    console.log('SMS sent:', message.sid);
    res.status(200).json({ message: 'SMS sent successfully!', sid: message.sid });
  } catch (error) {
    console.error('Error sending SMS:', error); // Log the error
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;