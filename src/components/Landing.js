import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <Fragment>
            <div className="text-center mb-3">
                <Link to="/frigo-manager-react/signup">
                    <button type="button" className="btn btn-light">
                        Inscription
                    </button>
                </Link>
            </div>
            <div className="text-center">
                <Link to="/frigo-manager-react/login">
                    <button type="button" className="btn btn-light">
                        Connexion
                    </button>
                </Link>
            </div>
        </Fragment>
    )
}

export default Landing;
