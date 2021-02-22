import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from './Firebase';

const Logout = () => {

    const firebase = useContext(FirebaseContext);

    const [checked, setChecked] = useState(false);

    useEffect(() => checked && firebase.signoutUser(), [checked, firebase]);

    const handleChange = e => setChecked(e.target.checked);

    return (
        <div className="form-check text-right mt-n4 mb-3">
            <input className="form-check-input" onChange={handleChange} type="checkbox" id="deconnexion" checked={checked}/>
            <label className="form-check-label" htmlFor="deconnexion">Déconnexion</label>
        </div>
    )
}

export default Logout;