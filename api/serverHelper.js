const _ = require('lodash');

const verifyCart = (cart, products) => {
    const isOverSold = _.some(cart, e=> {
        const prodInStock = _.find(products,['id',e.id]);
        return e.qty > prodInStock.stock
    })

    return !isOverSold;
}

module.exports = { verifyCart }