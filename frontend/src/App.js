import './App.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loadUser } from './Actions/User';
import Home from "./components/Home/Home";
// import UserOption from "./components/Header/UserOption"
import store from "./store";
import ProtectedRoute from "./components/Route/ProtectedRoute"
import Account from './components/Account/Account';
import NewPost from './components/NewPost/NewPost';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import UpdatePassword from './components/UpdatePassword/UpdatePassword';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from "./components/ResetPassword/ResetPassword";
import UserProfile from './components/UserProfile/UserProfile';
import MobileProfile from './components/MobileProfile/MobileProfile';
import UserProfileDetails from './components/UserProfileDetails/UserProfileDetails';
import Search from './components/Search/Search';
import NotFound from "./components/NotFound/NotFound";

function App() {

  const { isAuthenticated} = useSelector((state) => state.user);
  
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);

  
  return (
    <Router>
      {isAuthenticated && <Header />}
      {/* {isAuthenticated && <UserOption/>} */}

      <Switch>

      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/account" component={Account} />
      <ProtectedRoute exact path="/newpost" component={NewPost} />
      <ProtectedRoute exact path="/update/profile" component={UpdateProfile} />
      <ProtectedRoute exact path="/update/password" component={UpdatePassword} />
      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />
      <ProtectedRoute exact path="/user/:id" component={UserProfile} />
      <ProtectedRoute exact path="/profile" component={MobileProfile} />
      <ProtectedRoute exact path="/userprofile/:id" component={UserProfileDetails} />
      <ProtectedRoute exact path="/search" component={Search} />
      <Route path="*" component={NotFound}  />
      </Switch>
    </Router>
  );
}

export default App;
