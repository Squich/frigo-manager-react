import React, { useState, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from './Firebase';

const Signup = props => {

    const firebase = useContext(FirebaseContext);

    const data = {
        pseudo: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const [loginData, setLoginData] = useState(data);
    const [error, setError] = useState("");

    const {pseudo, email, password, confirmPassword} = loginData;

    const handleChange = e => setLoginData({...loginData, [e.target.id]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        firebase.signupUser(email, password)
        .then(authUser => {
            return firebase.user(authUser.user.uid).set({
                pseudo, 
                email,
                listProducts : [],
                idProduct : 0
            })
        })
        .then(() => {
            setLoginData({...data});
            props.history.push("/frigo-manager-react/welcome");
        })
        .catch(error => {
            setError(error);
            setLoginData({...data});
        })
    }

    const btn = 
        !pseudo || !email || !password || password !== confirmPassword
        ? <button type="submit" className="btn btn-primary" disabled>Inscription</button>
        : <button type="submit" className="btn btn-primary">Inscription</button>

    const errorMsg = error && <div className="alert alert-danger mb-4" role="alert">{error.message}</div>;

    return (
        <Fragment>
            {errorMsg}           
            <h2 className="mb-4">Inscription</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="pseudo">Pseudo</label>
                    <input className="form-control" onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete="off" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input className="form-control" onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                    <input className="form-control" onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required />
                </div>
                {btn}
            </form>
            <div className="mt-5">
                <Link to="/frigo-manager-react/login">Déjà inscrit ? Connectez-vous.</Link>
            </div>
        </Fragment>
    )
}

export default Signup;
