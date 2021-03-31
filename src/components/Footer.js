import React from 'react';
import { ImHeart } from "react-icons/im";

const Footer = () => {   
    return (
        <footer className="row p-3 bg-dark">
            <div className="col">
                <p className="text-light text-center mb-0">Fait avec <ImHeart color="#8b8b8b"/> par <a className="font-weight-bold text-light" href="https://github.com/Squich" target="_blank" rel="noopener noreferrer">Squich</a></p>
            </div>
        </footer>
    )
}

export default Footer;