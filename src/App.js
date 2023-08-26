import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import AdminPage from './AdminPage/AdminPage';
import AdminVerifyUser from './AdminPage/AdminPages/adminVerifyUsers';
import Authentication from './Authentication/authentication.js';
import CreatePost from './CreatePost/CreatePost';
import ProfilePage from './ProfilePage/ProfilePage';
import SettingsPage from './SettingsPage/SettingsPage';
import TimeLine from './Timeline/TimeLine';
// import Home from './Home/Home';
import { ReactSession } from 'react-client-session';

ReactSession.setStoreType("localStorage");


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: ReactSession.get("user")
    };
  }



  render() {

    return (
        <div>
        <BrowserRouter>
          <Switch> 
            <Route exact path='/' render={() => (<TimeLine app={this} user={this.state.user}/>)}/>
            {/* Only direct to authentication if user is not signed in */}
            <Route exact path='/Login' render={() => (this.state.user ? <Redirect to="/" /> : <Authentication state={this} route='LogIn'/>)} />
            {/* redirected to register page if signup started or home if user is logged in */}
            <Route exact path='/SignUp' render={() => (this.state.user ? <Redirect to="/" /> : ( ReactSession.get("signup") ? <Redirect to="/register" /> : <Authentication route='SignUp'/> ) )}/>
            {/* Only take to register page if signup started and no user is logged in */}
            <Route exact path='/Register' render={() => (this.state.user ? <Redirect to="/" /> : ( ReactSession.get("signup") ? <Authentication route='Register'/> : <Redirect to="/signup" /> ) )}/>
            <Route exact path='/CreatePost' render={() => (!this.state.user ? <Redirect to="/" /> : <CreatePost user={this.state.user}/>)}/>
            <Route exact path='/ProfilePage' render={() => (!this.state.user ? <Redirect to="/" /> : <ProfilePage user={this.state.user}/>)}/>
            <Route exact path='/AdminPage' render={() => (<AdminPage user={this.state.user}/>)}/>
            <Route exact path='/AdminPage/verifyusers' render={() => (<AdminVerifyUser user={this.state.user}/>)}/>
            <Route exact path='/AdminPage/approveposts' render={() => (<AdminPage user={this.state.user}/>)}/>
            <Route exact path='/AdminPage/users' render={() => (<AdminPage user={this.state.user}/>)}/>
            <Route exact path='/SettingsPage' render={() => (!this.state.user ? <Redirect to="/" /> : <SettingsPage user={this.state.user}/>)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );  
  }
}

export {App as default}