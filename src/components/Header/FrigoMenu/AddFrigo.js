import React, { useState, useContext } from 'react';
import UserSessionContext from '../../Contexts/UserSessionContext';
import { toast } from 'react-toastify';

const AddFrigo = () => {

    const {userData, setUserData} = useContext(UserSessionContext);
    const {listFridges} = userData;

    const [nameFridge, setNameFridge] = useState("");

    const handleChange = e => setNameFridge(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        setUserData({...userData, listFridges: [...listFridges, nameFridge]});
        toast.success(`Ajout du frigo ${nameFridge}`);
        setNameFridge("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="nameFridgeToAdd">Ajouter un frigo</label>
            <div className="d-flex row">
                <div className="col-8 pr-1">
                    <input className="form-control" onChange={handleChange} value={nameFridge} type="text" id="nameFridgeToAdd" autoComplete="off" maxLength="20" required />
                </div>
                <div className="col-4 pl-1">
                    <button type="submit" className="btn btn-primary btn-block" disabled={!nameFridge || listFridges.includes(nameFridge)}>Ajouter</button>
                </div>
            </div>
        </form>
    )
}

export default AddFrigo;