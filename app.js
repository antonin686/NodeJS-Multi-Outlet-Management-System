const express = require('express');
const expressLayout = require('express-ejs-layouts');
//const index = require('./controllers/index');
const users = require('./controllers/users');
const path = require('path');
const bodyParser = require('body-parser');
const admin = require('./controllers/admin');
const manager = require('./controllers/manager');
const seller = require('./controllers/seller');
const expSession = require('express-session');
const app = express();

// EJS
app.use(expressLayout);
app.set('view engine', 'ejs');
app.set("layout extractScripts", true)


app.use(bodyParser.urlencoded({extended:true}));
// Set Static Path
app.use(express.static(path.join(__dirname, 'public')))

app.use(expSession({secret:'my top secret value', saveUninitialized:true, resave: false}));

// Routes
//app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);
app.use('/manager', manager);
app.use('/seller', seller);

app.get('/', (req, res) => res.redirect('/users/login'));

app.listen(8000, console.log('Server started on port 8000...')); 