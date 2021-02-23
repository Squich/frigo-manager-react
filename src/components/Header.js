import React from 'react';

const Header = () => {
    return (
        <header className="row p-3 bg-primary">
            <div className="col">
                <h1 className="font-weight-light text-uppercase text-center">
                    <a className="text-light" href="/frigo-manager-react/">Frigo Manager</a>
                </h1>
            </div>
        </header>
    )
}

export default Header;