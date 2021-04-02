import React, { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../../Contexts/FirebaseContext';
import UserSessionContext from '../../Contexts/UserSessionContext';
import HeaderContext from '../../Contexts/HeaderContext';
import { Form } from 'react-bootstrap';

const Logout = () => {

    const firebaseContext = useContext(FirebaseContext);

    const {userSession, userData} = useContext(UserSessionContext);
    const {pseudo} = userData;

    const {setUserMenu, closeMenu}  = useContext(HeaderContext);

    const [checked, setChecked] = useState(true);
    const [labelMsg, setLabelMsg] = useState("");

    useEffect(() => {
        if (userSession && !checked) {
            setLabelMsg("Déconnexion...");
            setTimeout(() => {
                closeMenu(setUserMenu);
                firebaseContext.signoutUser();
            }, 1000);
        }
    }, [userSession, checked]);

    useEffect(() => userSession && setLabelMsg("Déconnecter " + pseudo), [pseudo]);

    const handleChange = e => setChecked(e.target.checked);

    return (
        <div className="d-flex">
            <Form>
                <Form.Check
                    onChange={handleChange} 
                    type="switch"
                    checked={checked}
                    disabled={!checked}
                    label={labelMsg}
                    id="deconnexion"
                    className="pointer"
                />
            </Form>
        </div>
    )
}

export default Logout;