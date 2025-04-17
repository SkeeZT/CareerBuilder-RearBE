import axios from 'axios';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { run_id } = req.query;

  if (!run_id) {
    return res.status(400).json({ error: 'Missing run_id in query' });
  }

  try {
    const response = await axios.get(
      'https://api-v3.mindpal.io/api/workflow-run-result/retrieve-by-id',
      {
        params: { run_id },
        headers: {
          accept: 'application/json',
          'x-api-key': process.env.MINDPAL_API_KEY
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching workflow result:', error.message);
    res.status(500).json({ error: 'Failed to fetch workflow result' });
  }
}
