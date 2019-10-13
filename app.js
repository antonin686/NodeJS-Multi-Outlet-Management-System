const express = require('express');
const expressLayout = require('express-ejs-layouts');
const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// EJS
app.use(expressLayout);
 
app.set('view engine', 'ejs');


// Routes

app.use('/', index);
app.use('/users', users);

app.listen(8000, console.log('Server started on port 8000...')); 