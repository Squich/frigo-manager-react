import React, { useState, useContext } from 'react';
import FirebaseContext from './FirebaseContext';
import UserSessionContext from './UserSessionContext';
import HeaderContext from './HeaderContext';
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from 'react-toastify';

const DeleteUser = () => {

    const firebaseContext = useContext(FirebaseContext);

    const {userSession} = useContext(UserSessionContext);

    const {setUserMenu, closeMenu, setError}  = useContext(HeaderContext);

    const [alert, setAlert] = useState(false);

    const deleteUser = () => {
        firebaseContext.deleteUser()
        .then(() => {
            firebaseContext.deleteUserDoc(userSession.uid)
            toast.success("Suppression du compte");
            console.log("Compte utilisateur supprimé");
            closeMenu(setUserMenu);
        })
        .catch(error => {
            setError(true);
            console.log(error);
        })
    };

    const alertMsg = (
        <div className="alert alert-danger" role="alert">
            <p className="h5 text-center mb-3">Supprimer mon compte ?</p>
            <p className="text-center">Attention, tous les données associées à mon compte seront également supprimés.</p>
            <div className="row text-center mt-3">
                <div className="col">
                    <button type="button" className="btn btn-success btn-block" onClick={() => deleteUser()}>
                        <FaCheck /> Oui
                    </button>
                </div>
                <div className="col">
                    <button type="button" className="btn btn-danger btn-block" onClick={() => setAlert(false)}>
                        <FaTimes /> Non
                    </button>
                </div>
            </div>
        </div>
    );

    const deleteBtn = (
        <button type="button" className="btn btn-link px-0" onClick={() => setAlert(true)}>
            Supprimer mon compte ?
        </button>        
    );

    return (
        alert ? alertMsg : deleteBtn
    )
}

export default DeleteUser;
