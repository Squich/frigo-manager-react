import React, { useContext } from 'react';
import UserSessionContext from '../../Contexts/UserSessionContext';
import HeaderContext from '../../Contexts/HeaderContext';
import SelectFrigo from './SelectFrigo';
import RenameFrigo from './RenameFrigo';
import AddFrigo from './AddFrigo';
import DeleteFrigo from './DeleteFrigo';
import { CgClose } from "react-icons/cg";

const FrigoMenu = () => {

    const {userData} = useContext(UserSessionContext);
    const {listFridges} = userData;

    const {setFrigoMenu, animMenu, closeMenu}  = useContext(HeaderContext);

    return (
        <div className="overlay">
            <div className={"menu" + (animMenu ? " animMenu" : "")}>
                <div className="d-flex justify-content-end">
                    <CgClose size="1.5em" className="pointer" onClick={() => closeMenu(setFrigoMenu)}/>
                </div>
                <p className="h2 mb-6">Mes frigos</p>
                <div className="mb-3">
                    <SelectFrigo />
                </div>
                <div className="mb-3">
                    <RenameFrigo />
                </div>                        
                <div className="mb-3">
                    <AddFrigo />
                </div>
                {
                    listFridges.length > 1 && (
                        <div>
                            <DeleteFrigo />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default FrigoMenu;