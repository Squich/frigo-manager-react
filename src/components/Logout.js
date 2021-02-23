import React, { useState, useEffect, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { FirebaseContext } from './Firebase';

const Logout = ({userData}) => {

    const firebase = useContext(FirebaseContext);

    const [checked, setChecked] = useState(false);

    useEffect(() => checked && setTimeout(() => firebase.signoutUser(), 1000), [checked, firebase]);

    const handleChange = e => setChecked(e.target.checked);

    const pseudo = userData.pseudo ? ` (${userData.pseudo})` : "";
    const label = checked ? "Déconnexion..." : `Connecté${pseudo}`;

    return (
        <Form className="d-flex justify-content-end mt-n4 mb-3">
            <Form.Check
                onChange={handleChange} 
                checked={checked}
                type="switch"
                label={label}
                id="deconnexion"
                className="pointer"
            />
        </Form>
    )
}

export default Logout;