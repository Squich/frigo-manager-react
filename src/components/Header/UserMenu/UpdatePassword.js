import React, { useState, useContext } from 'react';
import FirebaseContext from '../../Contexts/FirebaseContext';
import HeaderContext from '../../Contexts/HeaderContext';
import { toast } from 'react-toastify';

const UpdatePassword = () => {

    const firebaseContext = useContext(FirebaseContext);

    const {setError}  = useContext(HeaderContext);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        firebaseContext.updatePassword(password)
        .then(() => {
            toast.success("Modification du mot de passe");
            console.log("Mot de passe de l'utilisateur modifié");
        })
        .catch(error => {
            setError(true);
            console.log(error);
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="password">Modifier mot de passe</label>
                <div className="d-flex row">
                    <div className="col-8 pr-1">
                        <input className="form-control" onChange={e => setPassword(e.target.value)} value={password} type="password" id="password" autoComplete="off" required />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirmer nouveau mot de passe</label>
                <div className="d-flex row">
                    <div className="col-8 pr-1">
                        <input className="form-control" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required />
                    </div>
                    <div className="col-4 pl-1">
                        <button type="submit" className="btn btn-primary btn-block" disabled={password !== confirmPassword || password.length < 6}>Modifier</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default UpdatePassword;