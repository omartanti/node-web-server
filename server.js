const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

//To allow partials (like headers, footers, etc..) we need to call hbs.registerPartials
hbs.registerPartials(__dirname + '/views/partials');
//This Uses hbs (handlebars) to allow templating
app.set('view engine', 'hbs');

//This will register data that can be used in all partials by referencing {{getCurrentYear}}
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

//This will process data and return it after some functionality to be used in partials
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

//Register a Middleware with express
app.use((request, response, next) => {

    let now = new Date().toString();
    let log = `${now}: ${request.method} - ${request.url}`;

    //Log the request to console and logfile
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to log to server.log');
        }
    });

    //this will instruct the app to continue processing request
    next();

});

//This middleware we will send all requests to maintenance page - without calling next();
// app.use((request, response, next) => {
//     response.render('maintenance.hbs', {
//         pageTitle: "We'll be right back",
//         message: "The site is currently under maintenance"
//     });
// });

//This will serve localhost:3000/help.html
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    //This will send json object as response instead of html and header content-type will automatically change to 'application/json'
    //response.send({name: "Omar", age: 31, job: "Developer"});

    //This will render the template in './views' folder including data
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to our new Web Server Website!!'
    });

}).get('/about', (request, response) => {
    //This will send html as response instead of html and header content-type will automatically change to 'text/html'
    //response.send('<h1>About Me!</h1>');

    //This will render the template in './views' folder including data
    response.render('about.hbs', {
        pageTitle: 'About Page'
    });

}).get('/bad', (request, response) => {
    response.send({errorMessage: 'Unable to handle request'});
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});