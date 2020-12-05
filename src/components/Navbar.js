import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../repository'
import {Configure} from '../configure'

const logOut = () => {
    localStorage.removeItem(Configure.localStorageKey);
}

const Navbar = () => {
    const isAuthed = isAuthenticated();
    return (
        <div>
            <nav className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo ">Henry's Shop</Link>
                    <Link to="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
                    <ul className="right hide-on-med-and-down">
                        <li><Link to="/">Shop</Link></li>
                        <li><Link to="/cart"><i className="material-icons left shoppingCartIcon">shopping_cart</i>Cart</Link></li>
                        <li> {
                            (isAuthed) ?
                                (<Link to="/" onClick={logOut}>Log out</Link>) :
                                (<Link to="/login">Log in</Link>)
                        }
                        </li>
                        <li> {
                            (isAuthed) ?
                                (<Link to="/account">Account</Link>) : ''
                        }
                        </li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li className="sidenav-close"><Link to="/">Shop</Link></li>
                <li className="sidenav-close"><Link to="/cart">My cart</Link></li>
                <li className="sidenav-close">{
                    (isAuthed) ?
                        (<Link to="/" onClick={logOut}>Log out</Link>) :
                        (<Link to="/login">Log in</Link>)
                }
                </li>
                <li className="sidenav-close"> {
                    (isAuthed) ?
                        (<Link to="/account">Account</Link>) : ''
                }
                </li>
            </ul>
        </div>

    )
}

export default Navbar;