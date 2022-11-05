const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  //useNewUrlParser: true
  //useCreateIndex: true,
  //useFindAndModify: false
});

const addId = (req, res, next) => {
  req.user = {
    _id: '636623eba707306c2bc70a40' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
};


app.use('/', require('./routes/user'));
app.use(addId);
app.use('/', require('./routes/card'));



app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
});

