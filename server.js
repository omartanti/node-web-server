const express = require('express');
const hbs = require('hbs');
const app = express();

//To allow partials (like headers, footers, etc..) we need to call hbs.registerPartials
hbs.registerPartials(__dirname + '/views/partials');
//This Uses hbs (handlebars) to allow templating
app.set('view engine', 'hbs');
//This will serve localhost:3000/help.html
app.use(express.static(__dirname + '/public'));

//This will register data that can be used in all partials by referencing {{getCurrentYear}}
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

//This will process data and return it after some functionality to be used in partials
hbs.registerHelper('screamIt', (text) => text.toUpperCase() );

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

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});