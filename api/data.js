
const {Configure:{serverUrl}} = require('./configure');

const products = [
  {
    id: "01",
    name: 'Shoe',
    stock: 5,
    price: 450,
    brandId: 1,
    imgUrl:`${serverUrl}/images/item1.jpg`,
    description: 'Lorem ipsum dolor sit amet, iusto appellantur vix te, nam affert feugait menandri eu. Magna simul ad est. Nostrum neglegentur ius at, at pertinax repudiare vel. Vim an adolescens quaerendum.'
  },

  {
    id: "02",
    name: 'Apple',
    stock: 7,
    price: 50,
    brandId: 1,
    imgUrl:`${serverUrl}/images/item2.jpg`,
    description: 'Lorem ipsum dolor sit amet, iusto appellantur vix te, nam affert feugait menandri eu. Magna simul ad est. Nostrum neglegentur ius at, at pertinax repudiare vel. Vim an adolescens quaerendum.'
  },

  {
    id: "03",
    name: 'House',
    stock: 0,
    price: 500,
    brandId: 1,
    imgUrl:`${serverUrl}/images/item3.jpg`,
    description: 'Lorem ipsum dolor sit amet, iusto appellantur vix te, nam affert feugait menandri eu. Magna simul ad est. Nostrum neglegentur ius at, at pertinax repudiare vel. Vim an adolescens quaerendum.'
  },

  {
    id: "04",
    name: 'Tank',
    stock: 4,
    price: 1500,
    brandId: 2,
    imgUrl:`${serverUrl}/images/item4.jpg`,
    description: 'Lorem ipsum dolor sit amet, iusto appellantur vix te, nam affert feugait menandri eu. Magna simul ad est. Nostrum neglegentur ius at, at pertinax repudiare vel. Vim an adolescens quaerendum.'
  },
];

const brand =[
  {
    id:1,
    name: "A company"
  },
  {
    id:2,
    name: "B company"
  },
  {
    id:3,
    name: "C company"
  }
]


const users = [
    {
      name: 'henry',
      password: 'henry',
      balance: 999999999
    },
    {
      name: 'admin',
      password: 'admin',
      balance: 10
    }
];

module.exports = { 'products': products, users: users, brand }