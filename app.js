const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');

const Photo = require('./models/Photo');

const app = express();

//connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Template Engine
app.set('view engine', 'ejs');
//Template Engine

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Middleware

//Routes
app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', {
    photos,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

app.get('*', (req, res) => {
  res.render('index');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
