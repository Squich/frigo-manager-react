import React, { useState, Fragment } from 'react';
import { CgClose } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";

const FormProduct = ({id, name, date, recipe, opened, addProduct, modifyProduct, hideForm}) => {

    const initialFormValues = {name, date, recipe, opened};
    const [formValues, setFormValues] = useState(initialFormValues);
    const {name: currentName, date: currentDate, recipe: currentRecipe, opened: currentOpened} = formValues;

    const handleChange = e => {
        e.target.type !== "radio"
        ? setFormValues({...formValues, [e.target.id]: e.target.value})
        : setFormValues({...formValues, opened: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        id
        ? modifyProduct(id, currentName, currentDate, currentRecipe, currentOpened)
        : addProduct(currentName, currentDate, currentRecipe, currentOpened)
    }
   
    const title = 
        id
        ? <h2 className="mb-4">Modifier un produit</h2>
        : <h2 className="mb-4">Ajouter un produit</h2>
    
    const buttons = 
    <div className="d-flex justify-content-between">
        {
            id
            ? <button type="submit" className="btn btn-primary"><FaPencilAlt /> Modifier</button>
            : <button type="submit" className="btn btn-primary"><FiPlus /> Ajouter</button>
        }
        <button type="button" className="btn btn-outline-secondary ml-2" onClick={hideForm}><CgClose /> Annuler</button>        
    </div>

    return (
        <Fragment>
            {title}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nom</label>
                    <input className="form-control" onChange={handleChange} value={currentName} type="text" id="name" autoComplete="off" maxLength="20" placeholder="Nom du produit" required />
                </div>
                <div className="form-group">
                    <label htmlFor="date">DLC</label>
                    <input className="form-control" onChange={handleChange} value={currentDate} type="date" id="date" autoComplete="on" required />
                </div>
                <div className="form-group">
                    <label htmlFor="recipe">Recette</label>
                    <input className="form-control" onChange={handleChange} value={currentRecipe} type="text" id="recipe" autoComplete="off" maxLength="20" placeholder="Nom de la recette" />
                </div>
                <div className="mb-5">
                    <p style={{display: "inline-block", marginBottom: ".5rem"}}>Entamé</p>
                    <div className="d-flex justify-content-start">
                        <div className="mr-4">
                            <input className="mr-2" onChange={handleChange} value="true" type="radio" name="opened" id="opened" checked={currentOpened === "true" && true} />
                            <label className="form-check-label" htmlFor="opened">Oui</label>
                        </div>
                        <div>
                            <input className="mr-2" onChange={handleChange} value="false" type="radio" name="opened" id="closed" checked={currentOpened === "false" && true} />
                            <label className="form-check-label" htmlFor="closed">Non</label>
                        </div>
                    </div>
                </div>
                {buttons}
            </form>            
        </Fragment>
    )
}

export default FormProduct;
