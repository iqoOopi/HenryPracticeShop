import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem, addQuantity, subtractQuantity, postCheckout } from '../actions'
const _ = require('lodash');

class Cart extends Component {

    //to remove the item completely
    handleRemove = (id) => {
        this.props.removeItem(id);
    }
    //to add the quantity
    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id) => {
        this.props.subtractQuantity(id);
    }

    handleCheckout = () =>{
        this.props.checkout();
    }

    render() {
        const prodsInCart = this.props.cart.length ?
            (
                this.props.cart.map(item => {
                    return (
                        <li className="collection-item avatar" key={item.id}>
                            <div className="item-img">
                                <img src={item.imgUrl} alt={item.name} className="responsive-img" />
                            </div>

                            <div className="item-desc">
                                <span className="title">{item.name}</span>
                                <p>{item.desc}</p>
                                <p><b>Price: $ {item.price}</b></p>
                                <p>
                                    <b>Quantity: {item.qty}</b>
                                </p>
                                <div className="add-remove">
                                    <Link to="/cart"><i className="material-icons" onClick={() => { this.handleAddQuantity(item.id) }}>arrow_drop_up</i></Link>
                                    <Link to="/cart"><i className="material-icons" onClick={() => { this.handleSubtractQuantity(item.id) }}>arrow_drop_down</i></Link>
                                </div>
                                <p>
                                    <b>Item Subtotal: $ {item.price * item.qty}</b>
                                </p>
                                <button className="waves-effect waves-light btn pink remove" onClick={() => { this.handleRemove(item.id) }}>Remove</button>
                            </div>
                        </li>
                    )
                })
            ) :

            (
                <p>Nothing.</p>
            )
        return (
            <div className="container">
                <div className="cart">
                    <h5>You have ordered:</h5>
                    <ul className="collection">
                        {prodsInCart}
                    </ul>
                </div>
                <div className="container">
                    <div className="collection">
                        <li className="collection-item"><b>Total: {_.sumBy(this.props.cart, e => e.price * e.qty)} $</b></li>
                    </div>
                    <div className="checkout">
                        <button className="waves-effect waves-light btn" disabled = {!this.props.cart.length} onClick={() => { this.handleCheckout() }}>Checkout</button>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        products: state.products,
        cart: state.cart
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) => dispatch(removeItem(id)),
        addQuantity: (id) => dispatch(addQuantity(id)),
        subtractQuantity: (id) => dispatch(subtractQuantity(id)),
        checkout: () => dispatch(postCheckout())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)