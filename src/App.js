import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Main from './components/Main'

class App extends Component {

  render(){
    return (
      <>
          <Navbar/>
              <Main/>
          <Footer/>
      </>
    );
  }
}

export default App;