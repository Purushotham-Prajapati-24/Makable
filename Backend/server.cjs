// c:\Users\rosha\Desktop\makable\backend\server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173' // Allow requests from your Vite frontend
}));
app.use(express.json({ limit: '10mb' })); // To parse JSON bodies, with a generous size limit

// Vercel API configuration
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID; // Optional: If you use a Vercel team
const VERCEL_API_URL = 'https://api.vercel.com/v13/deployments';

if (!VERCEL_TOKEN) {
    console.error("FATAL ERROR: VERCEL_TOKEN is not defined in your .env file.");
    process.exit(1);
}

// The deployment endpoint
app.post('/api/deploy', async (req, res) => {
    const { htmlContent } = req.body;

    if (!htmlContent) {
        return res.status(400).json({ error: 'htmlContent is required.' });
    }

    try {
        console.log('Starting deployment to Vercel...');

        const vercelPayload = {
            name: 'makable-ai-deployment', // A name for the project in Vercel
            files: [
                {
                    file: 'index.html',
                    data: htmlContent
                }
            ],
            projectSettings: {
                framework: null // We are deploying a static file
            }
        };

        const headers = {
            'Authorization': `Bearer ${VERCEL_TOKEN}`,
            'Content-Type': 'application/json'
        };
        
        // Add team ID to the URL if it's provided
        const apiUrl = VERCEL_TEAM_ID ? `${VERCEL_API_URL}?teamId=${VERCEL_TEAM_ID}` : VERCEL_API_URL;

        const vercelResponse = await axios.post(apiUrl, vercelPayload, { headers });

        const deploymentUrl = `https://${vercelResponse.data.url}`;
        console.log(`Deployment successful! URL: ${deploymentUrl}`);

        res.status(200).json({ url: deploymentUrl });

    } catch (error) {
        console.error('Vercel API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to deploy to Vercel.' });
    }
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
