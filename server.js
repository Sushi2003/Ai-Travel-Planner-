const https = require('https');
const fs = require('fs');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
// todo: Move the API key to a .env file and add it to .gitignore
const apiKey = 'YOUR API KEY';
const PORT = process.env.PORT || 443;

// Use a library for this.
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const app = express();
// Public folder contains the HTML, CSS, and JavaScript files
app.use(express.static(__dirname));
// app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies


// Moving more specific routes to the top
app.post('/generate-travel-plan', (req, res) => {
  // Parse user input from the request body
  console.log('---\n\nreq.body\n-----\n', req.body);
  const { location, date, duration, travelers } = req.body;

  // Placeholder for generating a travel plan (replace with actual logic)
  const travelPlan = `You are going to ${location} on ${date} for ${duration} days with ${travelers} travelers. Here's your travel plan: ...`;

  // Respond with the generated travel plan
  res.json({ travelPlan });
});
app.get('/chat', async (req, res) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a travel agent working for a reputed travel firm that deals with premium clients.' },
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
// todo: Critical - this has a to be a JSON response
app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Welcome to Ai Travel Planner Backend!');
});

// Use Express app as your HTTPS server
const server = https.createServer(options, app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


