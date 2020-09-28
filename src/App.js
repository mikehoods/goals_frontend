import React, { Component } from 'react';
import Navbar from './components/Navbar'
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Footer from './components/Footer'
import Main from './components/Main'

class App extends Component {

  render(){
    return (
      <BrowserRouter>
          <Navbar/>
          <Switch>
            <Route exact path='/' component={Main}/>
            <Route path='/goals' component={Home}/>
            <Route path='/register' component={Home}/>
          </Switch>
          <Footer/>
      </BrowserRouter>
    );
  }
}

export default App;