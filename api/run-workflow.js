import axios from 'axios';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://career-builder-two.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const response = await axios.post(
      'https://api-v3.mindpal.io/api/workflow/run?workflow_id=67f8293957be881abb66f28b',
      req.body.data,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.MINDPAL_API_KEY,
        },
      }
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error calling Mindpal:', error.message);
    return res.status(500).json({ error: 'Failed to reach Mindpal API' });
  }
}
