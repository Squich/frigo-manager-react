import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FirebaseContext from './Contexts/FirebaseContext';
import UserSessionContext from './Contexts/UserSessionContext';
import Header from './Header/Header';
import Landing from './Landing/Landing';
import Login from './Landing/Login';
import Signup from './Landing/Signup';
import ErrorPage from './Landing/ErrorPage';
import ForgetPassword from './Landing/ForgetPassword';
import Welcome from './Welcome/Welcome';
import Footer from './Footer/Footer';
import { IconContext } from "react-icons";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure({
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false
});

const App = () => {

  const firebaseContext = useContext(FirebaseContext);

  const initialUserData = {
    pseudo: "",
    email: "",
    listFridges: [],
    currentIndexFridge: 0,
    listProducts: [],
    listMemento: [],
    nextId: 1
  }

  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState(initialUserData);

  const UserSessionContextValue = {
    userSession, 
    setUserSession,
    userData, 
    setUserData
  };

  useEffect(() => {
      let listener = firebaseContext.auth.onAuthStateChanged(user => user ? setUserSession(user) : setUserSession(null));
      if (userSession) {
          firebaseContext.userDoc(userSession.uid)
          .get()
          .then(doc => (doc && doc.exists) && setUserData(doc.data()))
          .catch(error => console.log(error))
      } else {
        setUserData(initialUserData);
      }
      return () => listener();
  }, [userSession, firebaseContext]);

  useEffect(() => {
    if (userSession) {
        firebaseContext.userDoc(userSession.uid)
        .update(userData)
        .then(() => console.log("Données de l'utilisateur mises à jour"))
        .catch(error => console.error("Erreur de mise à jour des données de l'utilisateur : ", error));
    }
  }, [userData]);

  return (
    <UserSessionContext.Provider value={UserSessionContextValue}>
      <IconContext.Provider value={{style:{verticalAlign:'middle'}}}>
        <Router basename={process.env.PUBLIC_URL}>
          <div className="container p-0 py-sm-7">
            <div className="position-relative my-container d-flex flex-column justify-content-between overflow-hidden bg-white" id="app-container">
                <div>
                  <Header />
                  <main className="row px-3 py-7">
                    <div className="col">
                        <Switch>
                          <Route exact path="/" component={Landing} />
                          <Route path="/welcome" component={Welcome} />
                          <Route path="/login" component={Login} />
                          <Route path="/signup" component={Signup} />
                          <Route path="/forgetpassword" component={ForgetPassword} />
                          <Route component={ErrorPage} />
                        </Switch>
                    </div>
                  </main>
                </div>
                <Footer />
            </div>
          </div>
        </Router>
      </IconContext.Provider>        
    </UserSessionContext.Provider>
  )
}

export default App;