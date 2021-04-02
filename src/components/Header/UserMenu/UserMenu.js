import React, { useContext } from 'react';
import HeaderContext from '../../Contexts/HeaderContext';
import ChangePseudo from './ChangePseudo';
import UpdateEmail from './UpdateEmail';
import UpdatePassword from './UpdatePassword';
import Logout from './Logout';
import DeleteUser from './DeleteUser';
import { CgClose } from "react-icons/cg";

const UserMenu = () => {

    const {setUserMenu, animMenu, closeMenu, error, setError}  = useContext(HeaderContext);

    const errorMsg = 
        error && (
            <div className="alert alert-danger mb-5" role="alert">
                <p>Cette opération est sensible et nécessite une authentification récente. Connectez-vous à nouveau avant de réessayer cette demande.</p>
                <button type="button" className="btn btn-secondary btn-sm mt-2" onClick={() => setError(false)}>
                    Compris
                </button>
            </div>
        );

    return (
        <div className="overlay">
            <div className={"menu" + (animMenu ? " animMenu" : "")}>
                <div className="d-flex justify-content-end">
                    <CgClose size="1.5em" className="pointer" onClick={() => closeMenu(setUserMenu)}/>
                </div>
                <p className="h2 mb-6">Mon compte</p>
                {errorMsg}
                <div className="mb-3">
                    <ChangePseudo />
                </div>
                <div className="mb-3">
                    <UpdateEmail />
                </div>
                <div className="mb-5">
                    <UpdatePassword />
                </div>
                <div className="mb-6">
                    <Logout />
                </div>
                <div>
                    <DeleteUser />
                </div>
            </div>
        </div>
    )
}

export default UserMenu;