import React, { useState, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import FirebaseContext from './FirebaseContext';

const Signup = props => {

    const firebaseContext = useContext(FirebaseContext);

    const initialLoginData = {
        pseudo: "",
        email: "",
        password: "",
        confirmPassword: "",
        nameFridge : ""
    }

    const [loginData, setLoginData] = useState(initialLoginData);
    const [error, setError] = useState("");

    const {pseudo, email, password, confirmPassword, nameFridge} = loginData;

    const handleChange = e => setLoginData({...loginData, [e.target.id]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        firebaseContext.signupUser(email, password)
        .then(authUser => {
            return firebaseContext.userDoc(authUser.user.uid).set({
                pseudo, 
                email,
                listFridges: [nameFridge],
                currentIndexFridge: 0,
                listProducts: [],
                listMemento: [],
                nextId: 1
            })
        })
        .then(() => {
            setLoginData({...initialLoginData});
            props.history.push("/welcome");
        })
        .catch(error => {
            setError(error);
            setLoginData({...initialLoginData});
        })
    }

    const disabled = !pseudo || !email || !password || !nameFridge || password !== confirmPassword;

    const errorMsg = 
        error && (
            <div className="alert alert-danger mb-5" role="alert">
                {error.message}
            </div>
        );

    return (
        <Fragment>
            {errorMsg}
            <p className="h2 mb-6">Inscription</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="pseudo">Pseudo</label>
                    <input className="form-control" onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete="off" maxLength="10" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input className="form-control" onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                    <input className="form-control" onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="nameFridge">Donner un nom à votre frigo</label>
                    <input className="form-control" onChange={handleChange} value={nameFridge} type="text" id="nameFridge" autoComplete="off" maxLength="20" required />
                </div>
                <button type="submit" className="btn btn-primary" disabled={disabled}>
                    Inscription
                </button>
            </form>
            <div className="mt-6">
                <Link to="/login">Déjà inscrit ? Connectez-vous.</Link>
            </div>
        </Fragment>
    )
}

export default Signup;
