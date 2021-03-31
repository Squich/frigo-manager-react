import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import FirebaseContext from './FirebaseContext';

const ForgetPassword = props => {

    const firebaseContext = useContext(FirebaseContext);

    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        firebaseContext.passwordReset(email)
        .then(() => {
            setEmail("");
            setError(null);
            setSuccess(`Consultez votre email ${email} pour changer le mot de passe.`);
            setTimeout(() => props.history.push("/login"), 5000);
        })
        .catch(error => {
            setEmail("");
            setError(error);
        })
    }

    const successMsg = 
        success && (
            <div className="alert alert-success mb-5" role="alert">
                {success}
            </div>
        );

    const errorMsg = 
        error && (
            <div className="alert alert-danger mb-5" role="alert">
                {error}
            </div>
        );

    const disabled = !email;

    return (
        <div>          
            {successMsg}
            {errorMsg}
            <p className="h2 mb-6">Mot de passe oublié</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" onChange={e => setEmail(e.target.value)} value={email} type="email" id="email" autoComplete="off" required />
                </div>
                <button type="submit" className="btn btn-primary" disabled={disabled}>Récupérer</button>
            </form>
            <div className="mt-6">
                <Link to="/login">Déjà inscrit ? Connectez-vous.</Link>
            </div>
        </div>
    )

}

export default ForgetPassword;