const express = require('express');
require('dotenv').config();
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');
const routes = require('./routes');
const errorsHandler = require('./middlewares/errors');

const { PORT = 3001 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(cors());
app.use(routes);
app.use(errorsHandler);

app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
