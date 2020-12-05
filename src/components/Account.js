import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated, getUserAccountInfo } from '../repository';

export const Account = () => {
    const [balance, setBalance] = React.useState(null);
    const [name, setName] = React.useState(null);
    const isAuthed = isAuthenticated();

    useEffect(() => {
        getUserAccountInfo().then(response => {
            setBalance(response.data.balance);
            setName(response.data.name)
        })
    }, [])

    if (!isAuthed) {
        return <Redirect to="/" />
    }
    return (
        <div className="container center">
            <h3> Protected Content </h3>
            <h4> Balance For {name} is: {balance}</h4>
        </div>
    )
}