const express = require('express');
const path = require('node:path');
const app = express();
const router = require('./routes/router');
require('dotenv').config();

// parse the form data into req.body
app.use(express.urlencoded({ extended: true }));
// serve static files from public directory
app.use(express.static('public'));

// sets the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
