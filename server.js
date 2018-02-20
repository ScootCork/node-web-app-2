const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express(); // no argument, settings are done else where

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
  }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance');
// });


// server static content
app.use(express.static(__dirname + '/public')); //takes absolute path to folder


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello!'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page'
  })
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.get('/test/*', (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

app.listen(4000, () => {
  console.log('Server is up on port 4000');
});
