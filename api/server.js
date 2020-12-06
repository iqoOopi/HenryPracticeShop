const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('./data');
const middleware = require('./middleware');

const { Configure } = require('./configure');
const { verifyCart } = require('./serverHelper');
const _ = require('lodash');

console.log(Configure.serverUrl);
app.use(express.static(__dirname + '/public'));
console.log(__dirname)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/products', (req, res) => {
  return res.json(data.products);
});

app.get('/api/products/search', (req, res) => {
  const { searchValue } = req.query;
  const result = _.filter(data.products, e => e.name.toLowerCase().includes(searchValue));
  return res.json(result);
});

app.get('/api/account', middleware, (req, res) => {
  const {name:username} = req.decoded; // from MiddleWare
  const result = _.find(data.users, ['name',username]);
  return res.json(result);
});

app.post('/api/checkout', (req, res) => {
  const cart = req.body.cart;
  const checkCart = verifyCart(cart, data.products);
  return checkCart ? res.status(200).send('Enough Stock, Proceed to pay') : res.status(801).send("Not enough Stock, please edit Cart");
});

app.post('/api/auth', (req, res) => {
  const user = data.users.filter((user) => {
    return user.name == req.body.name && user.password == req.body.password;
  });
  if (user.length) {
    // create a token using user name and password vaild for 2 hours
    const token_payload = { name: user[0].name, password: user[0].password };
    const token = jwt.sign(token_payload, Configure.tokenSecret, { expiresIn: '2h' });
    const response = { message: 'Token Created, Authentication Successful!', token: token };

    // return the information including token as JSON
    return res.status(200).send(response);

  } else {
    return res.status(802).send("Authentication failed. admin not found.");
  }
});


app.listen(Configure.serverPort);
console.log('api runnging on port ' + Configure.serverPort + ': ');