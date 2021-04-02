import React, { useState, useEffect, useContext } from 'react';
import UserSessionContext from '../../Contexts/UserSessionContext';
import { toast } from 'react-toastify';

const RenameFrigo = () => {

    const {userData, setUserData} = useContext(UserSessionContext);
    const {listFridges, currentIndexFridge} = userData;

    const currentNameFridge = listFridges[currentIndexFridge] || "";

    const [nameFridge, setNameFridge] = useState(currentNameFridge);

    useEffect(() => setNameFridge(currentNameFridge), [currentIndexFridge]);

    const handleChange = e => setNameFridge(e.target.value);    

    const handleSubmit = e => {
        e.preventDefault();
        toast.success("Frigo renommé");
        const newListFridges = [...listFridges];
        newListFridges[currentIndexFridge] = nameFridge;
        setUserData({...userData, listFridges: newListFridges});
        setNameFridge("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="nameFridgeToRename">Renommer le frigo actif</label>
            <div className="d-flex row">
                <div className="col-8 pr-1">
                    <input className="form-control" onChange={handleChange} value={nameFridge} disabled={currentIndexFridge === Infinity || currentIndexFridge === -1} type="text" id="nameFridgeToRename" autoComplete="off" maxLength="20" required />
                </div>
                <div className="col-4 pl-1">
                    <button type="submit" className="btn btn-primary btn-block" disabled={currentIndexFridge === Infinity || !nameFridge || nameFridge === currentNameFridge}>Renommer</button>
                </div>
            </div>
        </form>
    )
}

export default RenameFrigo;