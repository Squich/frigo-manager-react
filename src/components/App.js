import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import Welcome from './Welcome';
import Login from './Login';
import Signup from './Signup';
import ErrorPage from './ErrorPage';
import ForgetPassword from './ForgetPassword';
import Footer from './Footer';
import { IconContext } from "react-icons";
import '../App.css';

const App = () => {
  return (
    <div className="container py-5">
      <div className="shadow rounded-lg overflow-hidden">
        <IconContext.Provider value={{style:{verticalAlign:'middle'}}}>
              <Header />
              <main className="row px-3 py-5 bg-white">
                <div className="col">
                  <Router>
                    <Switch>
                      <Route exact path="/" component={Landing} />
                      <Route path="/welcome" component={Welcome} />
                      <Route path="/login" component={Login} />
                      <Route path="/signup" component={Signup} />
                      <Route path="/forgetpassword" component={ForgetPassword} />
                      <Route component={ErrorPage} />          
                    </Switch>
                  </Router>        
                </div>           
              </main>
              <Footer />
        </IconContext.Provider>
      </div>
    </div>
  )
}

export default App;
