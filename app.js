require('dotenv').config()
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://tanviJ25:Qwerty@1234@cluster0.sopog.mongodb.net/danceDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const port = process.env.PORT | 8000;

//mongoose schema
const cntactSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: String,
    gender: String,
    dance: String
});

const Contact = mongoose.model('Contact', cntactSchema);

//EXPRESS stuff
app.use("/static", express.static('static'))
app.use(express.urlencoded())

//PUG stuff/configarations
app.set('view engine', 'pug')//set template enhine as pug
app.set('views', path.join(__dirname, 'views'))//set veiws directory

//endpoint
app.get('/', (req, res) => {
    const p = {}
    res.status(200).render('home.pug', p);
    // res.status(200).render('index.pug',p);
})

app.get('/contact', (req, res) => {
    const p = {}
    res.status(200).render('contact.pug', p);
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        p={
            msg:"Your response has been saved to the database."
        }
        res.status(200).render('contact.pug', p);
        // res.send("Your response has been saved to the database.")
    }).catch(()=>{
        res.status(400).send("Your response was not saved to the database.")
    });
    // res.status(200).render('contact.pug');
})

//start server
app.listen(port, () => {
    console.log(`sucessfull application ${port}`);
});

