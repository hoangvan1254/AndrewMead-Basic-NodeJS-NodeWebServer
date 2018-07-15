const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 8080;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, resp, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append file');
        }
    });
    next();
});

app.use('/maintainance', (req, resp, next) => {
    resp.render('maintainance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, resp) => {
    //resp.send('<h1>Hello Express!</h1>');
    resp.render('home.hbs', {
        pageTitle: 'Home page',
        name: 'Andrew',
    });
});

app.get('/about', (req, resp) => {
    resp.render('about.hbs', {
        pageTitle: 'About page',
    });
});

app.get('/bad', (req, resp) => {
    resp.send(JSON.stringify('Error'));
});

app.listen(port, () => {
    console.log(`Server is on port ${port}`)
});
