import React, { useState, useContext, Fragment } from 'react';
import UserSessionContext from './UserSessionContext';
import HeaderContext from './HeaderContext';
import TodayDate from './TodayDate';
import Portal from './Portal';
import FrigoMenu from './FrigoMenu';
import Memento from './Memento';
import UserMenu from './UserMenu';
import { BiNote, BiFridge, BiUser } from "react-icons/bi";

const Header = () => {

    const {userSession, userData}  = useContext(UserSessionContext);
    const {pseudo, listFridges, currentIndexFridge}  = userData;

    const [frigoMenu, setFrigoMenu] = useState(false);
    const [memento, setMemento] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const [animMenu, setAnimMenu] = useState(false);
    const [error, setError] = useState(false);

    const openMenu = fn => {
        fn(true);
        setTimeout(() => setAnimMenu(true), 0);
    };
    
    const closeMenu = fn => {
        setAnimMenu(false);
        setTimeout(() => fn(false), 350);
    };

    const HeaderContextValue = {
        setFrigoMenu,
        setMemento,
        setUserMenu,
        animMenu,
        closeMenu,
        error,
        setError
    };

    return (
        <HeaderContext.Provider value={HeaderContextValue}>
            <header className="entete px-3 py-5 text-white">
                <div className="bg-entete"></div>
                <div className="d-flex flex-row justify-content-between align-items-center mb-7">
                    <TodayDate />
                    {
                        userSession && (
                            <div>
                                <BiFridge size="1.5em" className="pointer mr-3" onClick={() => openMenu(setFrigoMenu)}/>
                                <BiNote size="1.5em" className="pointer mr-3" onClick={() => openMenu(setMemento)}/>
                                <button type="button" className="btn btn-primary btn-sm" onClick={() => openMenu(setUserMenu)}>
                                    <BiUser size="1.5em" className="mr-2" />{pseudo}
                                </button>
                            </div>
                        )
                    }
                    {
                        frigoMenu && (
                            <Portal id="app-container">
                                <FrigoMenu />
                            </Portal>
                        )
                    }
                    {
                        memento && (
                                <Portal id="app-container">
                                    <Memento />
                                </Portal>
                            )
                    }
                    {
                        userMenu && (
                            <Portal id="app-container">
                                <UserMenu />
                            </Portal>
                        )
                    }
                </div>
                <div className="d-flex flex-column align-items-center">
                    {
                        <p className="h1 font-weight-light text-center">
                        {
                            userSession && listFridges[currentIndexFridge] && currentIndexFridge !== Infinity && currentIndexFridge !== -1
                            ?
                                (
                                    <Fragment>
                                        Frigo <span className="text-capitalize">{listFridges[currentIndexFridge]}</span>
                                    </Fragment>
                                )
                            : userSession && currentIndexFridge === Infinity
                            ? "Tous les frigos"
                            : userSession && currentIndexFridge === -1
                            ? "Frigo indéterminé"
                            : "Frigo Manager"
                        }
                        </p>
                    }
                </div>
            </header>
        </HeaderContext.Provider>
    )
}

export default Header;