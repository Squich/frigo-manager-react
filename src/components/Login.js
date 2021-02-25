import React, { useState, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from './Firebase';

const Login = props => {

    const firebase = useContext(FirebaseContext);

    const data = {
        email: "",
        password: "",
    }

    const [loginData, setLoginData] = useState(data);
    const [error, setError] = useState("");

    const {email, password} = loginData;

    const handleChange = e => setLoginData({...loginData, [e.target.id]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        firebase.loginUser(email, password)
        .then(() => {
            setLoginData({...data});
            props.history.push("/welcome");
        })
        .catch(error => {
            setError(error);
            setLoginData({...data});
        })
    }

    const btn = 
        !email || password.length < 6
        ? <button type="submit" className="btn btn-primary" disabled>Connexion</button>
        : <button type="submit" className="btn btn-primary">Connexion</button>

    const errorMsg = error && <div className="alert alert-danger mb-4" role="alert">{error.message}</div>;

    return (
        <Fragment>
            {errorMsg}
            <h2 className="mb-4">Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Mot de passe</label>
                    <input className="form-control" onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                </div>
                {btn}
            </form>
            <div className="mt-5">
                <Link to="/signup">Pas encore de compte ? Inscrivez-vous.</Link>
            </div>
            <div>
                <Link to="/forgetpassword">Mot de passe oublié ? Récupérez-le.</Link>
            </div>
        </Fragment>
    )
}

export default Login;
