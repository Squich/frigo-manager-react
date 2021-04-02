import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserSessionContext from '../Contexts/UserSessionContext';

const Landing = props => {

    const userSessionContext = useContext(UserSessionContext);
    const {userSession} = userSessionContext;

    useEffect(() => userSession && props.history.push("/welcome"), [userSession, props.history]);

    return (
        <div className="bg-landing h-100 d-flex flex-column justify-content-center align-items-center">
            <Link to="/login">
                <button type="button" className="btn btn-primary btn-lg m-2">
                    Connexion
                </button>
            </Link>
            <Link to="/signup">
                <button type="button" className="btn btn-secondary btn-lg m-2">
                    Inscription
                </button>
            </Link>
        </div>
    )
}

export default Landing;