import React, { useState, useContext } from 'react';
import FirebaseContext from './FirebaseContext';
import UserSessionContext from './UserSessionContext';
import HeaderContext from './HeaderContext';
import { toast } from 'react-toastify';

const UpdateEmail = () => {

    const firebaseContext = useContext(FirebaseContext);

    const {userData, setUserData} = useContext(UserSessionContext);
    const {email: initialEmail} = userData;

    const {setError}  = useContext(HeaderContext);

    const [email, setEmail] = useState('');

    const handleChange = e => setEmail(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        firebaseContext.updateEmail(email)
        .then(() => {
            setUserData({...userData, email});
            toast.success("Modification de l'email");
            console.log("Email de l'utilisateur modifié");
        })
        .catch(error => {
            setError(true);
            console.log(error);
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Modifier email</label>
            <div className="d-flex row">
                <div className="col-8 pr-1">
                    <input className="form-control" onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
                </div>
                <div className="col-4 pl-1">
                    <button type="submit" className="btn btn-primary btn-block" disabled={!email || email === initialEmail}>Modifier</button>
                </div>
            </div>
        </form>
    )
}

export default UpdateEmail;