// pages/api/sendLead.js

import Cors from 'cors';

// Initialize CORS middleware
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
  origin: '*', // Allow all origins — change to your domain for security
});

// Helper to run middleware before API logic
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Run the CORS middleware
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    try {
      // The payload you want to send to your external API
      const payload = {
        RegID: '2229',
        UID: '3254',
        FirstName: 'suresh sagar',
        Mobile: '8976756564626',
        Email: 'pawanspanco123@gmail.com',
        Company: 'ATC',
        Source: 'MetaWhatsAppReply',
        Requirement: 'we want to know about your erp',
      };

      // Replace with your actual API endpoint
      const apiUrl = 'https://yourwebsite.com/api/endpoint';

      // Call external API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      res.status(200).json({
        success: true,
        message: 'Data sent successfully',
        response: data,
      });
    } catch (error) {
      console.error('API error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send data',
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: 'Only POST method allowed' });
  }
}
