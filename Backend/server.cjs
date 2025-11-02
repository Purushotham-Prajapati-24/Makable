// c:\Users\rosha\Desktop\makable\backend\server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
// const port = 3001; // This line is no longer needed on Vercel

// --- 💡 CRITICAL CHANGE HERE ---
// You MUST allow your frontend's production URL.
// 'http://localhost:5173' is only for development.
const allowedOrigins = [
    'http://localhost:5173', // For local dev
    'https://makable-ai.vercel.app' // ❗️ REPLACE THIS with your actual Vercel frontend URL
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
// --- End of CORS change ---


app.use(express.json({ limit: '10mb' })); // To parse JSON bodies

// Vercel API configuration
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID; // Optional
const VERCEL_API_URL = 'https://api.vercel.com/v13/deployments';

if (!VERCEL_TOKEN) {
    console.error("FATAL ERROR: VERCEL_TOKEN is not defined in your .env file.");
    // On Vercel, this will just fail gracefully, but it's good to keep
}

// The deployment endpoint
app.post('/api/deploy', async (req, res) => {
    const { htmlContent } = req.body;

    if (!htmlContent) {
        return res.status(400).json({ error: 'htmlContent is required.' });
    }

    // You must check for the token inside the handler for serverless
    if (!VERCEL_TOKEN) {
        console.error("FATAL ERROR: VERCEL_TOKEN is not set in Vercel Environment Variables.");
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    try {
        console.log('Starting deployment to Vercel...');

        const vercelPayload = {
            name: 'makable-ai-deployment',
            files: [
                {
                    file: 'index.html',
                    data: htmlContent
                }
            ],
            projectSettings: {
                framework: null
            }
        };

        const headers = {
            'Authorization': `Bearer ${VERCEL_TOKEN}`,
            'Content-Type': 'application/json'
        };
        
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

// --- 💡 THIS IS THE MAIN CHANGE FOR VERCEL ---
//
// app.listen(port, () => {
//     console.log(`Backend server listening at http://localhost:${port}`);
// });
//
// We remove app.listen() and export the app instead.
// Vercel handles the listening part.
module.exports = app;