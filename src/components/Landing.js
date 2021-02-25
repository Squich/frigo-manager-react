import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <Fragment>
            <div className="text-center mb-3">
                <Link to="/login">
                    <button type="button" className="btn btn-primary">
                        Connexion
                    </button>
                </Link>
            </div>
            <div className="text-center">
                <Link to="/signup">
                    <button type="button" className="btn btn-outline-secondary">
                        Inscription
                    </button>
                </Link>
            </div>
        </Fragment>
    )
}

export default Landing;
