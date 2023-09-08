const https = require('https');
const fs = require('fs');
const express = require('express');
const axios = require('axios');

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const app = express();

// Define a route to handle incoming HTTP requests
app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to Ai Travel Planner Backend!');
});

// Define a route to interact with the ChatGPT API
app.get('/chat', async (req, res) => {
    try {
        // Make an API call to ChatGPT (replace with your API endpoint)
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            message: 'Hello, ChatGPT!'
        });

        // Send the response from ChatGPT back to the client
        res.json({ reply: response.data.reply });
    } catch (error) {
        console.error('Error interacting with ChatGPT API:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 443;

// Use Express app as your HTTPS server
const server = https.createServer(options, app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const port = process.env.PORT || 3000;
//
// app.use(bodyParser.json());
//
// // Serve static files (e.g., your HTML and JavaScript)
// app.use(express.static('public'));
//
// app.post('/generate-travel-plan', (req, res) => {
//     // Parse user input from the request body
//     const { location, date, duration, travelers } = req.body;
//
//     // Placeholder for generating a travel plan (replace with actual logic)
//     const travelPlan = `You are going to ${location} on ${date} for ${duration} days with ${travelers} travelers. Here's your travel plan: ...`;
//
//     // Respond with the generated travel plan
//     res.json({ travelPlan });
// });
//
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
//
