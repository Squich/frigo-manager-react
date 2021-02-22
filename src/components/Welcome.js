import React, { useState, useEffect, useContext, Fragment } from 'react';
import { FirebaseContext } from './Firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Logout from './Logout';
import FormProduct from './FormProduct';
import TodayDate from './TodayDate';
import Product from './Product';
import Loader from './Loader';
import { FiPlus } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

toast.configure({
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
});

const Welcome = props => {

    const firebase = useContext(FirebaseContext);

    const initialFormValues = {name: "", date: "", recipe: "", opened: "false"};

    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState({});
    const [welcomeMsg, setWelcomeMsg] = useState(false);
    const [listProducts, setListProducts] = useState([]);
    const [form, setForm] = useState(false);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [idProduct, setIdProduct] = useState(1);
    const [idProductToModified, setIdProductToModified] = useState(null);

    const {name, date, recipe, opened} = formValues;

    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => user ? setUserSession(user) : props.history.push("/frigo-manager-react/"));
        if (userSession) {
            firebase.user(userSession.uid)
            .get()
            .then(doc => {
                if (doc && doc.exists) {
                    const myData = doc.data();
                    setUserData(myData)
                }
            })
            .catch(error => console.log(error))
        }
        return () => listener();
    }, [userSession, firebase, props.history]);

    useEffect(() => {
        userData.listProducts && setListProducts(userData.listProducts);
        userData.idProduct && setIdProduct(userData.idProduct);
        if (userData.pseudo && !welcomeMsg) {
            toast.success(`Bienvenue ${userData.pseudo}`);
            setWelcomeMsg(true);
        }
    }, [userData]);

    useEffect(() => {
        if (userSession) {
            firebase.user(userSession.uid)
            .update({
                listProducts: listProducts,
                idProduct: idProduct
            })
            .then(() => console.log("Données de l'utilisateur mises à jour"))
            .catch((error) => console.error("Erreur de mise à jour des données de l'utilisateur : ", error));
        }
    }, [listProducts]);

    const showForm = (id = null, name = "", date = "", recipe = "", opened = "false") => {
        setIdProductToModified(id);
        setFormValues({name, date, recipe, opened});
        setForm(true);
    }

    const hideForm = () => setForm(false);

    const addProduct = (name, date, recipe, opened) => {
        const newProduct = {id: idProduct, name, date, recipe, opened};
        setListProducts([...listProducts, newProduct]);
        setIdProduct(idProduct + 1);
        setForm(false);
        toast.success(`Ajout de ${name}`);
    }

    const modifyProduct = (id, name, date, recipe, opened) => {
        const i = listProducts.findIndex(product => product.id === id);
        const newListProducts = [...listProducts];
        newListProducts[i] = {id, name, date, recipe, opened};
        setListProducts(newListProducts);
        setForm(false);
        toast.success(`Modification de ${name}`);
    }

    const deleteProduct = id => {
        const i = listProducts.findIndex(product => product.id === id);
        const newListProducts = [...listProducts];
        const name = newListProducts[i].name;
        newListProducts.splice(i, 1);
        setListProducts(newListProducts);
        toast.success(`Suppression de ${name}`);
    }

    const deleteAllProducts = () => {
        if (window.confirm("Supprimer tous les produits ?")) {
            setListProducts([]);   
            toast.success("Suppression de toute la liste");      
        }   
    }

    const buttons = 
        <div className="row">
            <div className="col-6 col-sm-8">
                <button 
                    type="button" 
                    className="btn btn-primary btn-block text-nowrap" 
                    onClick={() => showForm()}
                >
                    <FiPlus /> Ajouter
                </button>
            </div>
            <div className="col-6 col-sm-4 pl-0">
                <button 
                    type="button" 
                    className="btn btn-outline-secondary btn-block text-nowrap" 
                    onClick={deleteAllProducts} 
                    disabled={!listProducts.length}
                >
                    <FaRegTrashAlt /> Tout effacer
                </button>
            </div>
        </div>

    const list = 
        listProducts.length
        ?
        <ul className="list-group list-group-flush">
            {
                listProducts
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map(product => {
                        const {id, name, date, recipe, opened} = product;
                        return (
                            <li key={id} className="list-group-item">
                                <Product
                                    id={id}
                                    name={name}
                                    date={date}
                                    recipe={recipe}
                                    opened={opened}
                                    showForm={showForm}
                                    deleteProduct={deleteProduct}
                                />
                            </li>
                        )
                    })
            }
        </ul>
        :
        <p className="h5 text-muted text-center pt-3 mb-0">Votre liste est vide !</p>

    return (
        userSession 
        ?
        <Fragment>
            <Logout />
            {
                form 
                ?
                <FormProduct
                    id={idProductToModified}
                    name={name}
                    date={date}
                    recipe={recipe}
                    opened={opened}
                    addProduct={addProduct}
                    modifyProduct={modifyProduct}
                    hideForm={hideForm}
                />
                :
                <Fragment>
                    {buttons}
                    <TodayDate />
                    {list}
                </Fragment>
            }
        </Fragment>
        :
        <Loader />
    )

}

export default Welcome;
