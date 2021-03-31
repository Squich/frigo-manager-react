import React, { useState, useEffect, useContext } from 'react';
import UserSessionContext from './UserSessionContext';
import { toast } from 'react-toastify';

const SelectFrigo = () => {

    const {userData, setUserData} = useContext(UserSessionContext);
    const {listFridges, currentIndexFridge: initialCurrentIndexFridge} = userData;

    const [currentIndexFridge, setCurrentIndexFridge] = useState(initialCurrentIndexFridge);

    useEffect(() => setCurrentIndexFridge(initialCurrentIndexFridge), [initialCurrentIndexFridge]);

    const handleChange = e => setCurrentIndexFridge(Number(e.target.value));

    const handleSubmit = e => {
        e.preventDefault();
        setUserData({...userData, currentIndexFridge: currentIndexFridge});
        currentIndexFridge === Infinity 
        ? toast.success(`Sélection de tous les frigos`)
        : currentIndexFridge === -1
        ? toast.success(`Sélection des produits non assignés`)
        : toast.success(`Sélection du frigo ${listFridges[currentIndexFridge]}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="indexFridgeToSelect">Sélectionner le frigo actif</label>
            <div className="d-flex row">
                <div className="col-8 pr-1">
                    <select className="form-control" value={currentIndexFridge} onChange={handleChange} id="indexFridgeToSelect">
                        <option className="text-uppercase" key="allFridges" value="Infinity">Tous</option>
                        <option className="text-uppercase" key="notAssigned" value="-1">Non assigné</option>
                        {
                            listFridges.map((fridge, i) => 
                                (
                                    <option key={fridge} value={i}>
                                        {fridge}
                                    </option>
                                )
                            )
                        }
                    </select>
                </div>
                <div className="col-4 pl-1">
                    <button type="submit" className="btn btn-primary btn-block" disabled={currentIndexFridge === initialCurrentIndexFridge}>Sélectionner</button>
                </div>
            </div>
        </form>
    )
}

export default SelectFrigo;