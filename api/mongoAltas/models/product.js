const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String },
    stock: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    imgUrl: { type: String },
    description: { type: String },
    // brand: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'brand'
    // }
});

mongoose.model('product', ProductSchema);