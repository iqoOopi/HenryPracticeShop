import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchAllProducts, addToCart } from '../actions'
import ItemCard from './ItemCard'
import { SearchBar } from './SearchBar'

class Home extends Component {
    state = {
        searchValue: ""
    }

    componentDidMount() {
        this.props.fetchAllProducts();
    }

    handleClick = (id) => {
        this.props.addToCart(id);
    }

    handleSearchResults = (searchValue) => {
        this.setState({
            searchValue
        })
    }

    render() {
        const productsList = this.props.products.filter(e => e.name.toLowerCase().includes(this.state.searchValue)).map(item => <ItemCard
            key={item.id}
            item={item}
            handleClick={this.handleClick}
        />)

        return (
            <div className="container">
                <SearchBar
                    handleSearchResults={this.handleSearchResults}
                />

                <h3 className="center">Our items</h3>
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
        fetchAllProducts: () => dispatch(fetchAllProducts())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)