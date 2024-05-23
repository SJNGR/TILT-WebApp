const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Setting where the location of your EJS files are
app.set('views', '.')

// Needed for EJS
app.set('view engine', 'ejs');

// Needed for public directory
app.use(express.static(__dirname + '/public'));

// Needed for parsing form data
app.use(express.json());      
app.use(express.urlencoded({extended: true}));

// root page
app.get('/', function(req, res) {
    res.render('index');
 });

 // Tilt App page
app.get('./TiltThisText', function(req, res) {
    res.render('TiltThisText');
 });

// More Info page
app.get('./MoreInfo', function(req, res) {
    res.render('MoreInfo');
 });
 
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
        const data = await response.json();
        
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});