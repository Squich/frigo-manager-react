import React from 'react';

const Header = () => {
    return (
        <header className="entete">
            <div className="bg-entete"></div>
            <h1 className="font-weight-light text-uppercase text-center">
                    <a className="text-light" href="/frigo-manager-react/">Frigo Manager</a>
            </h1>
        </header>
    )
}

export default Header;