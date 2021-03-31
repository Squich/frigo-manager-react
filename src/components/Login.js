import React, { useState, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import FirebaseContext from './FirebaseContext';

const Login = props => {

    const firebaseContext = useContext(FirebaseContext);

    const initialLoginData = {
        email: "",
        password: "",
    }

    const [loginData, setLoginData] = useState(initialLoginData);
    const [error, setError] = useState("");

    const {email, password} = loginData;

    const handleChange = e => setLoginData({...loginData, [e.target.id]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        firebaseContext.loginUser(email, password)
        .then(() => {
            setLoginData({...initialLoginData});
            props.history.push("/welcome");
        })
        .catch(error => {
            setError(error);
            setLoginData({...initialLoginData});
        })
    }

    const btn = (
        <button type="submit" className="btn btn-primary" disabled={!email || password.length < 6}>
            Connexion
        </button>
    );

    const errorMsg = 
        error && (
            <div className="alert alert-danger mb-5" role="alert">
                {error.message}
            </div>
        );

    return (
        <Fragment>
            {errorMsg}
            <p className="h2 mb-6">Connexion</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" onChange={handleChange} value={email} type="email" id="email" autoComplete="on" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password">Mot de passe</label>
                    <input className="form-control" onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                </div>
                {btn}
            </form>
            <div className="mt-6">
                <Link to="/signup">Pas encore de compte ? Inscrivez-vous.</Link>
            </div>
            <div>
                <Link to="/forgetpassword">Mot de passe oublié ? Récupérez-le.</Link>
            </div>
        </Fragment>
    )
}

export default Login;
