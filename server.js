const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users.js');

const app = express();

// Body parser middlware & settings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('trust proxy', true);

// DB Config
const dbURI = require('./config/keys_dev.js').mongoURI;
const port = process.env.PORT || 8000;

// Connect to MongoDB
mongoose
  .connect(dbURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/api/users', users);

// serve static files
app.use('/', express.static(path.join(__dirname, './client/public')));

app.listen(port, () => console.log(`Server's good to go on port ${port}.`));
