import React from "react"
import './App.css'
import Login from "./login"
import Category from "./category"
import Product from "./product"

// import {Navbar,Nav,Container} from 'react-bootstrap'
import {Route} from 'react-router-dom'

 function App() {

  const product= () => <Product/>
  const category = () => <Category/>  
  const login = () => <Login/> 
  
  return (    
    <div>
      {/* <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/ticket/0">ticket</Nav.Link>
              <Nav.Link href="/list">list</Nav.Link>              
            </Nav>
          </Container>
      </Navbar> */}
        <br />
      <div>
        <Route exact path="/" component={login}/>
        <Route path="/product" component={product}/>       
        <Route exact path="/list" component={category} />
      </div>      
    </div>
    
  )
}

export default App;
