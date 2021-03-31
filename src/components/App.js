import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FirebaseContext from './FirebaseContext';
import UserSessionContext from './UserSessionContext';
import Header from './Header';
import Landing from './Landing';
import Welcome from './Welcome';
import Login from './Login';
import Signup from './Signup';
import ErrorPage from './ErrorPage';
import ForgetPassword from './ForgetPassword';
import Footer from './Footer';
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
          <div className="container py-responsive">
            <div className="position-relative shadow rounded-lg overflow-hidden" id="app-container">
                <Header />
                <main className="row px-3 py-7 bg-white">
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
                <Footer />
            </div>
          </div>
        </Router>
      </IconContext.Provider>        
    </UserSessionContext.Provider>
  )
}

export default App;