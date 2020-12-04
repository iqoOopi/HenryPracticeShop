import React, { Component } from 'react';

export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.searchValue = React.createRef();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const searchValue = this.searchValue.current.value.toLowerCase();
        this.props.handleSearchResults(searchValue)
    }

    handleCancel = () => {
        this.searchValue.current.value='';
        this.props.handleSearchResults("")
    }

    render() {
        return (
            <div className="container nav-wrapper">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field">
                        <input id="search" type="search" ref={this.searchValue} />
                        <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                        <i className="material-icons" onClick = {this.handleCancel}>close</i>
                    </div>
                </form>
            </div>
        )
    }


}