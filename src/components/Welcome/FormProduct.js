import React, { useState, Fragment } from 'react';
import { CgClose } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";

const FormProduct = ({idToModified, listFridges, formValues: initialFormsValues, addProduct, modifyProduct, hideForm}) => {

    const [formValues, setFormValues] = useState(initialFormsValues);

    const {name: initialName, date: initialDate, recipe: initialRecipe, opened: initialOpened, indexFridge: initialIndexFridge} = initialFormsValues;
    const {name, date, recipe, opened, indexFridge} = formValues;

    const handleChange = e => {
        e.target.type === "radio"
        ? setFormValues({...formValues, opened: e.target.value})
        : e.target.type === "select-one"
        ? setFormValues({...formValues, indexFridge: Number(e.target.value)})
        : setFormValues({...formValues, [e.target.id]: e.target.value})
    };

    const handleSubmit = e => {
        e.preventDefault();
        idToModified
        ? modifyProduct(idToModified, name, date, recipe, opened, indexFridge)
        : addProduct(name, date, recipe, opened, indexFridge)
    };

    const disabled = !name || !date || (name === initialName && date === initialDate && recipe === initialRecipe && opened === initialOpened && indexFridge === initialIndexFridge);
   
    const title = (
        <p className="h2 mb-6"> 
            {
                idToModified
                ? "Modifier un produit"
                : "Ajouter un produit"
            }
        </p>
    );
    
    const buttons = (
        <div className="row mt-5">
            <div className="col-6 col-sm-8 pr-2">
                <button type="submit" className="btn btn-primary btn-block text-nowrap" disabled={disabled}>
                    {
                        idToModified
                        ? (
                            <Fragment>
                                <FaPencilAlt /> Modifier
                            </Fragment>
                        ) : (
                            <Fragment>
                                <FiPlus /> Ajouter
                            </Fragment>
                        )
                    }
                </button>
            </div>
            <div className="col-6 col-sm-4 pl-2">
                <button type="button" className="btn btn-outline-secondary btn-block text-nowrap" onClick={hideForm}>
                    <CgClose /> Annuler
                </button>        
            </div>
        </div>
    );

    const selectFrigo = (
        <div className="form-group row">
            <label className="col-2 col-form-label" htmlFor="indexFridge">Frigo</label>
            <div className="col-10">
                <select className="form-control" value={indexFridge} onChange={handleChange} id="indexFridge">
                    <option key="allFridges" value="-1">Non assigné</option>
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
        </div>        
    );


    return (
        <Fragment>
            {title}
            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label className="col-2 col-form-label" htmlFor="name">Nom</label>
                    <div className="col-10">
                        <input className="form-control" onChange={handleChange} value={name} type="text" id="name" autoComplete="off" maxLength="20" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-2 col-form-label" htmlFor="date">DLC</label>
                    <div className="col-10">
                        <input className="form-control" onChange={handleChange} value={date} type="date" id="date" autoComplete="on" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-2 col-form-label" htmlFor="recipe">Recette</label>
                    <div className="col-10">
                        <input className="form-control" onChange={handleChange} value={recipe} type="text" id="recipe" autoComplete="off" maxLength="20" />
                    </div>
                </div>
                <div className="form-group row">
                    <legend className="col-2 col-form-label">Entamé</legend>
                    <div className="col-10 d-flex align-items-center">
                        <div className="ml-2 mr-4">
                            <input className="mr-2" onChange={handleChange} value="true" type="radio" name="opened" id="opened" checked={opened === "true" && true} />
                            <label className="form-check-label" htmlFor="opened">Oui</label>
                        </div>
                        <div>
                            <input className="mr-2" onChange={handleChange} value="false" type="radio" name="opened" id="closed" checked={opened === "false" && true} />
                            <label className="form-check-label" htmlFor="closed">Non</label>
                        </div>
                    </div>
                </div>
                {selectFrigo}
                {buttons}
            </form>            
        </Fragment>
    )
}

export default FormProduct;
