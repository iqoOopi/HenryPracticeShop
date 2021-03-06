const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('./data');
const middleware = require('./middleware');
const { graphqlHTTP } = require('express-graphql');
const _ = require('lodash');
const models = require('./mongoAltas/models');
const mongoose = require('mongoose');

const { Configure } = require('./configure');
const { verifyCart } = require('./serverHelper');
const { schema } = require('./schema/schema');

const app = express();

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb+srv://henryAdmin:AVRnGIcyZus8kmaa@henrystoremongodb.yfgft.mongodb.net/db?retryWrites=true&w=majority';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));



app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//new graphql API
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

//old rest API
app.get('/api/products', (req, res) => {
  return res.json(data.products);
});

app.get('/api/products/search', (req, res) => {
  const { searchValue } = req.query;
  const result = _.filter(data.products, e => e.name.toLowerCase().includes(searchValue));
  return res.json(result);
});

app.get('/api/account', middleware, (req, res) => {
  const { name: username } = req.decoded; // from MiddleWare
  const result = _.find(data.users, ['name', username]);
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
    const token_payload = { name: user[0].name };
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