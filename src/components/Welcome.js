import React, { useState, useEffect, useContext, Fragment } from 'react';
import UserSessionContext from './UserSessionContext';
import { toast } from 'react-toastify';
import FormProduct from './FormProduct';
import Product from './Product';
import Loader from './Loader';
import { FiPlus } from "react-icons/fi";
import { FaRegTrashAlt, FaCheck, FaTimes } from "react-icons/fa";

const Welcome = props => {

    const {userSession, userData, setUserData}  = useContext(UserSessionContext);
    const {pseudo, listFridges, currentIndexFridge, listProducts, nextId}  = userData;

    const initialFormValues = {name: "", date: "", recipe: "", opened: "false", indexFridge: 0};
    
    const [welcomeMsg, setWelcomeMsg] = useState(false);
    const [form, setForm] = useState(false);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [idToModified, setIdToModified] = useState(null);
    const [alert, setAlert] = useState(false);

    useEffect(() => !userSession && props.history.push("/"), [userSession, props.history]);

    useEffect(() => {
        if (pseudo && !welcomeMsg) {
            setWelcomeMsg(true);
            toast.success(`Bienvenue ${pseudo}`);
        }
    }, [pseudo]);
    
    const showForm = (id = null, name = "", date = "", recipe = "", opened = "false", indexFridge = currentIndexFridge === Infinity ? -1 : currentIndexFridge) => {
        setIdToModified(id);
        setFormValues({name, date, recipe, opened, indexFridge});
        setForm(true);
    }

    const hideForm = () => setForm(false);

    const addProduct = (name, date, recipe, opened, indexFridge) => {
        setUserData({
            ...userData, 
            listProducts: [...listProducts, {id: nextId, name, date, recipe, opened, indexFridge}], 
            nextId: nextId + 1
        });
        setForm(false);
        toast.success(`Ajout de ${name}`);
    }

    const modifyProduct = (id, name, date, recipe, opened, indexFridge) => {
        const i = listProducts.findIndex(product => product.id === id);
        const newListProducts = [...listProducts];
        newListProducts[i] = {id, name, date, recipe, opened, indexFridge};
        setUserData({...userData, listProducts: newListProducts});
        setForm(false);
        toast.success(`Modification de ${name}`);
    }

    const deleteProduct = id => {
        const i = listProducts.findIndex(product => product.id === id);
        const productName = listProducts[i].name;
        const newListProducts = [...listProducts];
        newListProducts.splice(i, 1);
        setUserData({...userData, listProducts: newListProducts});
        toast.success(`Suppression de ${productName}`);
    }

    const deleteAllProducts = () => {
        const filtredListProduct = currentIndexFridge === Infinity ? [] : listProducts.filter(product => product.indexFridge !== currentIndexFridge);
        setUserData({...userData, listProducts: filtredListProduct});
        setAlert(false); 
        toast.success("Suppression de tous les produits");
    }

    const alertMsg = (
        <div className="alert alert-danger mb-6" role="alert">
            <p className="h5 text-center mb-3">
                {
                    currentIndexFridge === Infinity 
                    ? (
                        "Supprimer tous les produits de tous les frigos ?"
                    ) : currentIndexFridge === -1
                    ? (
                        "Supprimer tous les produits non assignés à un frigo ?"
                    ) : (
                        <Fragment>
                            Supprimer tous les produits du frigo <span className="text-uppercase">{listFridges[currentIndexFridge]}</span>
                        </Fragment>                            
                    )
                }
            </p>
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
                <button type="button" className="btn btn-primary btn-block text-nowrap" onClick={() => showForm()}>
                    <FiPlus /> Ajouter
                </button>
            </div>
            <div className="col-6 col-sm-4 pl-2">
                <button type="button" className="btn btn-outline-secondary btn-block text-nowrap" onClick={() => setAlert(true)} disabled={!listProducts.length}>
                    <FaRegTrashAlt /> Tout effacer
                </button>
            </div>
        </div>
    );

    const filtredListProduct = 
        listProducts
            .filter(product => {
                return currentIndexFridge === Infinity 
                ? product
                : currentIndexFridge === -1
                ? product.indexFridge === -1
                : product.indexFridge === currentIndexFridge
            })
            .sort((a, b) => new Date(a.date) - new Date(b.date));

    const list = 
        filtredListProduct.length
        ? (
            <ul className="list-group list-group-flush">
                {
                    filtredListProduct
                        .map(product => {
                            const {id, name, date, recipe, opened, indexFridge} = product;
                            return (
                                <li key={id} className="list-group-item">
                                    <Product
                                        id={id}
                                        name={name}
                                        date={date}
                                        recipe={recipe}
                                        opened={opened}
                                        indexFridge={indexFridge}
                                        showForm={showForm}
                                        deleteProduct={deleteProduct}
                                    />
                                </li>
                            )
                        })
                }
            </ul>
        ) : (
            <p className="h5 text-muted text-center pt-5">Votre liste est vide !</p>
        );

    return (
        userSession 
        ? (
            <Fragment>
                {
                    form 
                    ? (
                        <FormProduct
                            idToModified={idToModified}
                            listFridges={listFridges}
                            formValues={formValues}
                            addProduct={addProduct}
                            modifyProduct={modifyProduct}
                            hideForm={hideForm}
                        />
                    ) : (
                        <Fragment>
                            {alert ? alertMsg : buttons}
                            {list}
                        </Fragment>
                    )
                }
            </Fragment>
        ) : (
            <Loader />
        )
    )

}

export default Welcome;