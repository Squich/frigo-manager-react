import React, { useState, useContext, Fragment } from 'react';
import UserSessionContext from '../../Contexts/UserSessionContext';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes } from "react-icons/fa";

const DeleteFrigo = () => {

    const {userData, setUserData} = useContext(UserSessionContext);
    const {listFridges, currentIndexFridge, listProducts} = userData;

    const [indexFridge, setIndexFridge] = useState("");
    const [alert, setAlert] = useState(false);

    const handleChange = e => setIndexFridge(e.target.value === "" ? e.target.value : Number(e.target.value));

    const handleSubmit = e => {
        e.preventDefault();
        setAlert(true);
    };

    const deleteFrigo = () => {
        if (indexFridge === Infinity) {
            toast.success(`Suppression de tous les frigos`);
            setUserData({...userData, listFridges: ["Nouveau"], currentIndexFridge: 0, listProducts: []});
        } else if (indexFridge === -1) {
            toast.success(`Suppression des produits non assignés`);
            const filtredListProduct = listProducts.filter(product => product.indexFridge !== -1);
            setUserData({...userData, listProducts: filtredListProduct});
        } else {
            toast.success(`Suppression du frigo ${listFridges[indexFridge]}`);
            const newListFridges = [...userData.listFridges];
            newListFridges.splice(indexFridge, 1);    
            const newCurrentIndexFridge = 
                indexFridge === currentIndexFridge
                ? 0
                : indexFridge < currentIndexFridge 
                    ? currentIndexFridge - 1
                    : currentIndexFridge;   
            const newListProducts = 
                [...userData.listProducts]
                    .filter(product => product.indexFridge !== indexFridge)
                    .map(product => product.indexFridge > indexFridge ? {...product, indexFridge: product.indexFridge - 1} : {...product, indexFridge: product.indexFridge});    
            setUserData({...userData, listFridges: newListFridges, currentIndexFridge: newCurrentIndexFridge, listProducts: newListProducts});
        }
        setIndexFridge("");
        setAlert(false);
    };

    const noDeleteFrigo = () => {
        setIndexFridge("");
        setAlert(false); 
    };

    const alertMsg = (
        <div className="alert alert-danger" role="alert">
            {
                indexFridge === Infinity
                ? (
                    <Fragment>
                        <p className="h5 text-center mb-3">Supprimer tous les frigos ?</p>
                        <p className="text-center">Attention, tous les produits de tous les frigos seront supprimés, même ceux dont le frigo est indéterminé.</p>
                    </Fragment>
                ) : indexFridge === -1
                ? (
                    <Fragment>
                        <p className="h5 text-center mb-3">Supprimer tous les produits dont le frigo est non assigné ?</p>
                        <p className="text-center">Attention, toute suppression est définitive.</p>
                    </Fragment>
                ) : (
                    <Fragment>
                        <p className="h5 text-center mb-3">Supprimer le frigo {listFridges[indexFridge]} ?</p>
                        <p className="text-center">Attention, tous les produits associés à ce frigo seront également supprimés.</p>
                    </Fragment>                    
                )
            }
            <div className="row text-center mt-3">
                <div className="col">
                    <button type="button" className="btn btn-success btn-block" onClick={() => deleteFrigo()}>
                        <FaCheck /> Oui
                    </button>
                </div>
                <div className="col">
                    <button type="button" className="btn btn-danger btn-block" onClick={() => noDeleteFrigo()}>
                        <FaTimes /> Non
                    </button>
                </div>
            </div>
        </div>
    );

    const deleteForm = (
        <form onSubmit={handleSubmit}>
            <label htmlFor="indexFridgeToDelete">Supprimer un frigo</label>
            <div className="d-flex row">
                <div className="col-8 pr-1">
                    <select className="form-control" value={indexFridge} onChange={handleChange} id="indexFridgeToDelete">
                        <option key="non" value="">Non</option>
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
                    <button type="submit" className="btn btn-primary btn-block" disabled={indexFridge === ""}>Supprimer</button>
                </div>
            </div>
        </form>
    );

    return (
        alert ? alertMsg : deleteForm
    )
}

export default DeleteFrigo;