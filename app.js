const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');
const routes = require('./routes');
//const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(cors());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
