import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div>
            <nav className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo ">Henry's Shop</Link>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><Link to="/">Shop</Link></li>
                        <li><Link to="/cart"><i className="material-icons left shoppingCartIcon">shopping_cart</i>Cart</Link></li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li className="sidenav-close"><Link to="/">Shop</Link></li>
                <li className="sidenav-close"><Link to="/cart">My cart</Link></li>
            </ul>
        </div>

    )
}

export default Navbar;