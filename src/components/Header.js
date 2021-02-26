import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="entete">
            <div className="bg-entete"></div>
            <h1 className="text-center">
                    <Link to="/welcome" className="link-h1">Frigo Manager</Link>
            </h1>
        </header>
    )
}

export default Header;