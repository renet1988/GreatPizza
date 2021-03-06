import React from 'react';
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container" id="navbarNav">
            <div className="navbar-collapse" id="navbarSupportedContent">
                <Link className="navbar-brand" to="/">Home</Link>
                <Link className="navbar-brand" to="/order">New Order</Link>
            </div>
        </div>
    </nav>
  );
}

export default Header;