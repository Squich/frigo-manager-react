import React, { useState, useContext } from 'react';
import UserSessionContext from '../../Contexts/UserSessionContext';
import { toast } from 'react-toastify';

const ChangePseudo = () => {

    const {userData, setUserData} = useContext(UserSessionContext);
    const {pseudo: initialPseudo} = userData;

    const [pseudo, setPseudo] = useState(initialPseudo)

    const handleChange = e => setPseudo(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        setUserData({...userData, pseudo});
        toast.success("Modification du pseudo");
        setPseudo("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="pseudo">Modifier pseudo</label>
            <div className="d-flex row">
                <div className="col-8 pr-1">
                    <input className="form-control" onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete="off" maxLength="10" required />
                </div>
                <div className="col-4 pl-1">
                    <button type="submit" className="btn btn-primary btn-block" disabled={pseudo === initialPseudo}>Modifier</button>
                </div>
            </div>
        </form>
    )
}

export default ChangePseudo;