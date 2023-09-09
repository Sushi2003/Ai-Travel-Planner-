const https = require('https');
const fs = require('fs');
const express = require('express');
const axios = require('axios');
const apiKey = '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';



const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const app = express();
app.use(express.static(__dirname));


app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to Ai Travel Planner Backend!');
});


app.get('/chat', async (req, res) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: `I am travelling to delhi india for 2 days. Plan my travel accordingly` }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });
        // Log the API response
        console.log('API Response:', response.data);

        // Send the response from ChatGPT back to the client
        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error('API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



const PORT = process.env.PORT || 443;

// Use Express app as your HTTPS server
const server = https.createServer(options, app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});                                                             5






// const express = require('express');
const bodyParser = require('body-parser');
// const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve static files (e.g., your HTML and JavaScript)
app.use(express.static('public'));

app.post('/generate-travel-plan', (req, res) => {
    // Parse user input from the request body
    const { location, date, duration, travelers } = req.body;

    // Placeholder for generating a travel plan (replace with actual logic)
    const travelPlan = `You are going to ${location} on ${date} for ${duration} days with ${travelers} travelers. Here's your travel plan: ...`;

    // Respond with the generated travel plan
    res.json({ travelPlan });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

