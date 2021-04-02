import React, { useState, useEffect, useContext, Fragment } from 'react';
import UserSessionContext from '../../Contexts/UserSessionContext';
import HeaderContext from '../../Contexts/HeaderContext';
import { toast } from 'react-toastify';
import { CgClose } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";
import { FaRegTrashAlt, FaCheck, FaTimes } from "react-icons/fa";

const Memento = () => {

    const {setMemento, animMenu, closeMenu}  = useContext(HeaderContext);

    const {userData, setUserData} = useContext(UserSessionContext);
    const {listMemento: initialListMemento, nextId} = userData;

    const [listMemento, setListMemento] = useState(initialListMemento);
    const [alert, setAlert] = useState(false);

    useEffect(() => setListMemento(initialListMemento), [initialListMemento]);

    const handleChange = (id, e) => {
        const i = listMemento.findIndex(product => product.id === id);
        const newListMemento = [...listMemento];
        newListMemento[i].name = e.target.value;
        setListMemento(newListMemento);
    };

    const handleBlur = () => setUserData({...userData, listMemento});

    const addProduct = () => {
        setUserData({
            ...userData, 
            listMemento: [...listMemento, {id: nextId, name: "Nouveau"}], 
            nextId: nextId + 1
        });
    }

    const deleteProduct = id => {
        const i = listMemento.findIndex(product => product.id === id);
        const productName = listMemento[i].name;
        const newListMemento = [...listMemento];
        newListMemento.splice(i, 1);
        setUserData({...userData, listMemento: newListMemento});
        toast.success(`Suppression de ${productName}`);
    }

    const deleteAllProducts = () => {
        setUserData({...userData, listMemento: []});
        setAlert(false); 
        toast.success("Suppression de toute la liste");      
    }

    const alertMsg = (
        <div className="alert alert-danger mb-6" role="alert">
            <p className="h5 text-center mb-3">Supprimer toute la liste ?</p>
            <div className="row text-center">
                <div className="col">
                    <button type="button" className="btn btn-success btn-block" onClick={() => deleteAllProducts()}>
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

    const buttons = (
        <div className="row pb-6">
            <div className="col-6 col-sm-8 pr-2">
                <button type="button" className="btn btn-primary btn-block text-nowrap" onClick={() => addProduct()}>
                    <FiPlus /> Ajouter
                </button>
            </div>
            <div className="col-6 col-sm-4 pl-2">
                <button type="button" className="btn btn-outline-secondary btn-block text-nowrap" onClick={() => setAlert(true)} disabled={!listMemento.length}>
                    <FaRegTrashAlt /> Tout effacer
                </button>
            </div>
        </div>
    );

    const list = 
        listMemento.length
        ? (
            <ul className="list-group list-group-flush">
                {
                    listMemento
                        .map((product) => {
                            const {id, name} = product;
                            return (
                                <li key={id} className="list-group-item">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <input className="my-form" onChange={e => handleChange(id, e)} onBlur={handleBlur} value={name} type="text" autoComplete="off" maxLength="30" />
                                        <FaTimes className="pointer" color="#6c757d" onClick={() => deleteProduct(id)} />
                                    </div>
                                </li>
                            )
                        })
                }
            </ul>
        ) : (
            <p className="h5 text-muted text-center pt-5">Votre liste est vide !</p>
        );

    return (
        <div className="overlay">
            <div className={"menu" + (animMenu ? " animMenu" : "")}>
                <div className="d-flex justify-content-end">
                    <CgClose size="1.5em" className="pointer" onClick={() => closeMenu(setMemento)}/>
                </div>
                <p className="h2 mb-6">Ma liste de courses</p>
                {alert ? alertMsg : buttons}
                {list}
            </div>
        </div>
    )
}

export default Memento;