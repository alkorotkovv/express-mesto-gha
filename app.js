const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {});

const addId = (req, res, next) => {
  req.user = {
    _id: '636a3db2bb298af34444554f',
  };
  next();
};

app.use(addId);
app.use('/', require('./routes/user'));
app.use('/', require('./routes/card'));

app.use((req, res) => {
  res.status(404).send({ message: 'Что-то пошло не так' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
