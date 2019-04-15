import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Navbar from './Components/Navbar/Navbar'
import Navbar2 from './Components/Navbar/Navbar2'
import Inventory from './Pages/Inventory'



class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <Navbar2/>
        <Inventory/>
      </div>
    )
  }
}

export default App
