const OpenAI = require('openai')
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
app.use("/public", express.static(__dirname + '/public'));

// Needed for parsing form data
app.use(express.json());      
app.use(express.urlencoded({extended: true}));

// root page
app.get('/', function(req, res) {
    res.render('index');
 });

 // Tilt App page
app.get('/TiltThisText', function(req, res) {
    res.render('TiltThisText');
 });
 // Tilt App Mobile page
 app.get('/TiltThisTextMobile', function(req, res) {
    res.render('TiltThisTextMobile');
 });
// More Info page
app.get('/MoreInfo', function(req, res) {
    res.render('MoreInfo');
 });
 
app.post('/api/chatgpt', async (req, res) => {
    const { userInput } = req.body;
    const fixedPrefix = "Edit instances of masculine-default language in the following text into gender-neutral language with as few word changes as possible; where meaning is specific to a gender, keep the pronouns as specified. Where no gendered terms are used, do not change the text: ";
    const prompt = fixedPrefix + userInput;

    const openai = new OpenAI();
try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-4o",
    });
  
    console.log(completion.choices[0].message.content);
       
        res.json(completion.choices[0].message.content);

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});