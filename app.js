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

app.use((req, res, next) => {
  req.user = {
    _id: '636623eba707306c2bc70a40' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/', require('./routes/user.js'));
//app.use('/cards', require('./routes/card'));
/*
app.post('/users', (req, res) => {

  console.log(req.body)
  res.send("text");
})
  /*
  User.create({ name, about, avatar })
    .then(user => {
      console.log("создали")
      res.send({ data: user })
      })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

});
*/

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
});

