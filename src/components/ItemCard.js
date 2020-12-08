import React from 'react';
import { connect } from 'react-redux'
import { addToCart } from '../actions'

const ItemCard = ({ item, addToCart }) => {
    return (
        <div className="col s12 m6 l3">
            <div className="card" key={item.id}>
                <div className="card-image">
                    <img src={item.imgUrl} alt={item.name} />
                    <span className="card-title">{item.name}</span>
                    {
                        item.stock === 0 ?
                            null :
                            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={() => { addToCart(item.id) }}><i className="material-icons">add</i></span>
                    }
                </div>

                <div className="card-content">
                    <p>{item.description}</p>
                    <p><b>Price: ${item.price}</b></p>
                    <p><b>Stock: {item.stock}</b></p>
                </div>
            </div>
        </div>
    )
}

export default connect(
    null,
    { addToCart }
)(ItemCard)