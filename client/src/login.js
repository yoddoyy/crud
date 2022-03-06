import React, { useState } from "react"
import { Button, Form, Container } from "react-bootstrap"
import "./App.css"
import Axios from "axios"
import Product from "./product"

export default function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [login, setLogin] = useState(false)

  
  const submitForm = async function (e) {
    e.preventDefault()
    try{
      await Axios.post("http://localhost:3001/api/login/", {
        username: username,
        password: password,
      }).then((res)=>{
        if(res.data.status === true){
          window.history.pushState({urlPath:'/product'},"",'/product')
          setLogin(true)          
        }else{
          alert(res.data.error)
        }
      })            
    }catch(e){
      alert(e)
    }
  }

  return (
    <div>  
      {login === true ? <Product /> : <>
      <Container>
        <h1>Login</h1>
        <br />
        <div className="col-sm-6">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Username"                         
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                    />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                </Form.Group>
                
                <Button variant="primary" type="submit" onClick={(e)=>submitForm(e)}>
                    Submit
                </Button>
            </Form>
        </div>
        <br />
        <div className="col-sm-10">
        
        </div>
      </Container>
      </>}
    </div>
  )
}