// root page
app.get('/', function(req, res) {
    res.render('index');
 });



const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/chatgpt', async (req, res) => {
    const { userInput } = req.body;
    const fixedPrefix = "Edit the following text from masculine default language to gender neutral language, with as few word changes as possible: ";
    const prompt = fixedPrefix + userInput;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",
            messages: [{"role": "user", "content": prompt}]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});