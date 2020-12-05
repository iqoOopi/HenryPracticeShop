import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchAllProducts, addToCart, fetchSearchProducts } from '../actions'
import ItemCard from './ItemCard'
import { SearchBar } from './SearchBar'

class Home extends Component {
    componentDidMount() {
        this.props.fetchAllProducts();
    }

    handleClick = (id) => {
        this.props.addToCart(id);
    }

    handleSearchResults = (searchValue) => {
        this.props.fetchSearchProducts(searchValue);
    }

    render() {
        const productsList = this.props.products.map(item => <ItemCard
            key={item.id}
            item={item}
            handleClick={this.handleClick}
        />)

        return (
            <div className="container">
                <SearchBar
                    handleSearchResults={this.handleSearchResults}
                />

                <h3 className="center">Products</h3>
                <div className="row center">
                    {productsList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id) => dispatch(addToCart(id)),
        fetchAllProducts: () => dispatch(fetchAllProducts()),
        fetchSearchProducts: (searchValue) => dispatch(fetchSearchProducts(searchValue))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)