import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="entete">
            <div className="bg-entete"></div>
            <h1 className="font-weight-light text-uppercase text-center">
                    <Link className="text-light" to="/welcome">Frigo Manager</Link>
            </h1>
        </header>
    )
}

export default Header;