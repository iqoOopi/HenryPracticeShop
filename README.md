![Screenshot](doc/image/docImage.png)
# Henry's Practise E-commerce Shop
This simple application is used by Henry to practice coding skills. 
With React as FrontEnd, Express as Backend Server

## Key Library
* React + Redux to build FrontEnd and Cart.
* Materialize Css to handle style and responsive design https://materializecss.com/
* React-Route to route between different page.
* redux-persist to prevent losing cart after refresh page, redux-thunk and axio to make api call. 
* Express to build a simple backend with json data.
* jsonwebtoken to generate token for authentication.

## Features
* Add products to cart
* Search products from server
* Complete Cart function, add/remove item and checkout
* Login Feature to access protected Account Page
* Responsive Design

# Getting started
### Requirements

* Node.js
* NPM

### Package installation
```bash
npm install -g nodemon
npm install
```

### Start the Express Backend
```bash
npm run api
```
The backend will start on http://localhost:8081

### Start the React App
 Excute the following command: 
```bash
npm start
```
The application will start automatically in your browser on http://localhost:3000

## Things for me to practise in future
* Implement a Redis db on Server side to verify cart item stock. 
* Implement GraphQL with a simple MongoDB on server side.
* Implement TypeScript 
