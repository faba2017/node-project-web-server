//loading express
const express = require('express');
// loading hbs
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
// variable app to create express application
var app = express();

// this hbs.registerPartials is when you have codes that you wanna re-use it in every pages.(render pages only(hbs))
hbs.registerPartials(__dirname + '/views/partials')
//lets u run html code but in a dynamic way, like using one file to display the exact same data to all other pages
// it has alot of key word but the one we using here is 'view engine' with 'hbs' value
app.set('view engine', 'hbs');

// another express midlware that display the time and url the user requested
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
//writing on file system  the date, time and url the user requested
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
//
// });


//express midlware (app.use) to allow express to display files like html and others on browser
app.use(express.static(__dirname + '/public'));

//hbs.registerHelper helps to eliminate duplicating of code, like 'getCurrentYear' that can be used to every render page
//that have same information
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

// to make the contain of the page uppercase by using the key word screamIt in a render page
hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});

//http root handler: 'app.get': what would be display on home page
app.get('/', (req, res) => {
//render is a key word used if u running a view engine page like home.hbs
//pages with hbs extension are the ones that can get dynamic information
res.render('home.hbs', {
  pageTitle:'Home page',
  welcomeMessage:'welcome to our fantastic new website'
});
     //res.send: display the data on the browser
  // res.send({
  //   name:'Fabrice',
  //   likes: ['Bike','Video Game', 'Movies']
  // });
});
// http about handler: 'app.get' of about page
app.get('/about',(req, res) => {
res.render('about.hbs', {
  pageTitle: 'About page',
});
});

app.get('/project', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Project'
  });
});



app.get('/bad',(req, res) => {
res.send({
  errorMessage: 'Unable to find the page'
});
});

// the 'app.listen': its like binding the app to run from the terminal
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
