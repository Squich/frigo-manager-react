import React from 'react';
import { FaExclamation, FaRegFrown, FaRegMeh, FaRegSmile, FaTags, FaPencilAlt, FaTimes } from "react-icons/fa";
import ReactTooltip from 'react-tooltip';

const Product = ({id, name, date, recipe, opened, showForm, deleteProduct}) => {

    const formatDate = date.replace(/(\d{4})-(\d{2})-(\d{2})/g, "$3/$2");

    const remainingDays = Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));

    const smileyTooltipMsg = `${remainingDays} jr${opened === "true" ? " (entamé)" : ""}`;

    const smileyColor = 
        remainingDays < 0 ? "black" : 
        remainingDays < 2 ? "red" : 
        remainingDays < 4 ? "orange" :
        "green";

    const pointer = {cursor: "pointer"};

    const smileyIcon = 
        opened === "true" ? <FaExclamation style={pointer} color={smileyColor} data-for="smileyTooltip" data-tip={smileyTooltipMsg} data-event="click" /> : 
        remainingDays < 0 ? <FaRegFrown style={pointer} color={smileyColor} data-for="smileyTooltip" data-tip={smileyTooltipMsg} data-event="click" /> : 
        remainingDays < 4 ? <FaRegMeh style={pointer} color={smileyColor} data-for="smileyTooltip" data-tip={smileyTooltipMsg} data-event="click" /> : 
        <FaRegSmile style={pointer} color={smileyColor} data-for="smileyTooltip" data-tip={smileyTooltipMsg} data-event="click" />;

    return (
        <div className="d-flex justify-content-between">
            <div>
                <span className="mr-3">{smileyIcon}</span>
                <ReactTooltip id="smileyTooltip" place="top" effect="solid" eventOff="click" delayHide={1500} />
                <span className="mr-3"><strong>{formatDate}</strong></span>
                <span className="mr-3">{name}</span>
            </div>
            <div>
                {recipe && <FaTags className="mr-3" style={pointer} color="#6c757d" data-for="recipeTooltip" data-tip={recipe} data-event="click" />}
                <ReactTooltip id="recipeTooltip" place="top" effect="solid" eventOff="click" delayHide={1500} />
                <FaPencilAlt className="mr-3" style={pointer} color="#6c757d" onClick={() => showForm(id, name, date, recipe, opened)} />
                <FaTimes style={pointer} color="#6c757d" onClick={() => deleteProduct(id)} />
            </div>
        </div>
    )
}

export default Product;
