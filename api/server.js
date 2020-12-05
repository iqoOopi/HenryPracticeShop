const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('./data');
const middleware = require('./middleware');

const {verifyCart} = require('./serverHelper');

app.use(express.static(__dirname +'/public'));
console.log(__dirname)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/products', (req, res) => {
  return res.json(data.products);
});

app.post('/api/checkout', (req, res) => {
  const cart = req.body.cart;
  const checkCart = verifyCart(cart,data.products);
  return checkCart? res.status(200).send('Enough Stock, Proceed to pay'):res.status(801).send("Not enough Stock, please edit Cart");
});

app.post('/api/auth', (req,res) => {
  let user = data.users.filter((user) => {
    return user.name == req.body.name && user.password == req.body.password;
  });
  if (user.length){
      // create a token using user name and password vaild for 2 hours
      let token_payload = {name: user[0].name, password: user[0].password};
      let token = jwt.sign(token_payload, "jwt_secret_password", { expiresIn: '2h' });
      let response = { message: 'Token Created, Authentication Successful!', token: token };

      // return the information including token as JSON
      return res.status(200).json(response);

  } else {
      return res.status("409").json("Authentication failed. admin not found.");
  }
});

const PORT = 8081;

app.listen(PORT);
console.log('api runnging on port ' + PORT + ': ');