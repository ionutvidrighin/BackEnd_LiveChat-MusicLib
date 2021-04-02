const express = require('express');
const mongoose = require('mongoose');
const ProfileModel = require('./ProfileModel.js');
const MusicLibrary = require('./MusicLibrary.js');
var cors = require('cors');
require('dotenv/config');


const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors())


//Get all profile pictures
app.get('/', async (req, res) => {
    try {
        const data = await ProfileModel.find();
        res.send(data);
    } catch(err) {
        res.send(err);
    }
})

//Get all songs 
app.get('/songs', async (req, res) => {
    try {
        const data = await MusicLibrary.find();
        res.send(data);
    } catch(err) {
        res.send(err);
    }
})



//Get specific element
app.get('/:id', async (req, res) => {
    try {
        const recipe = await ProfileModel.findById(req.params.id);
        res.send(recipe)
    } catch(err) {
        res.send(err)
    }
})


//Delete
app.delete('/recipes/:id', async (req, res) => {
    try {
        const recipe = await ProfileModel.remove({_id: req.params.id});
        res.send("Recipe deleted!");
    } catch(err) {
        res.send(err)
    }
})


//Update
app.patch('/recipes/:id', async (req, res) => {
    try {
        const updateRecipe = await ProfileModel.updateOne(
            {_id: req.params.id},
            {$set: 
                { 
                    name: req.body.name,
                    ingredients: req.body.ingredients,
                    description: req.body.description
                }
            }
        );
        res.send("Recipe has been updated");
    } catch(err) {
        res.send(err)
    }
})


//Post new profile picture
app.post('/profile', (req, res) => {
    const dbData = req.body;
    ProfileModel.create(dbData, (error, data) => {
        if (error){
            res.status(500).send(error)
        } else {
            res.status(201).send("Profile created!")
        }
    })
});

//Post new song for Music Library
app.post('/musiclibrary', (req, res) => {
    const dbData = req.body;
    MusicLibrary.create(dbData, (error, data) => {
        if (error){
            res.status(500).send(error)
        } else {
            res.status(201).send("Song added successfully!")
        }
    })
});


//Server running on PORT
app.listen(port, () => console.log('Server Up'));


//Connection to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('connected to Mongo!')
);