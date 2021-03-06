import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchAllProducts, fetchSearchProducts } from '../actions'

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.searchValue = React.createRef();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const searchValue = this.searchValue.current.value.toLowerCase();
        this.props.fetchSearchProducts(searchValue);
    }

    handleCancel = () => {
        this.searchValue.current.value = '';
        this.props.fetchAllProducts();
    }

    render() {
        return (
            <div className="container nav-wrapper z-depth-1 searchBar">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field">
                        <input id="search" type="search" ref={this.searchValue} />
                        <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                        <i className="material-icons" onClick={this.handleCancel}>close</i>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(
    null,
    { fetchAllProducts, fetchSearchProducts }
)(SearchBar)