import React, { Component } from 'react';
import Navbar from './components/Navbar'
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Footer from './components/Footer'
import UserContext from './context/UserContext'

class App extends Component {
  static contextType = UserContext

  componentDidMount() {
    const userData = {
      username: undefined,
      token: undefined
    }
    console.log(userData)
  }

  render(){
    return (
      <BrowserRouter>
        <UserContext.Provider value={this.userData}>
          <Navbar/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/login' component={Home}/>
            <Route path='/register' component={Home}/>
          </Switch>
          <Footer/>
        </UserContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
