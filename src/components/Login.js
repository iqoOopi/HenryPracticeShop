import React from 'react';
import {  Redirect } from 'react-router-dom';
import { login, isAuthenticated } from '../repository';

export default class Login extends React.Component {

    constructor() {
        super();
        this.username = React.createRef();
        this.password = React.createRef();
    }

    submitLogin = (event) => {
        event.preventDefault();
        const username = this.username.current.value;
        const password = this.password.current.value;
        login({ username, password })
            .then(token => this.props.history.push('/'))
            .catch(err => alert(err));
    }

    render() {
        const isAuthed = isAuthenticated();
        if (isAuthed){
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 ml6 offset-s2 offset-ml3">
                        <h3>Log in </h3>
                        <form onSubmit={this.submitLogin}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" className="form-control" name="name" ref={this.username} />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input type="password" className="form-control" name="password" ref={this.password} />
                            </div>
                            <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
