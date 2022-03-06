import React, { useState, useEffect } from "react"
import { Button, Form, Container } from "react-bootstrap"
import "./App.css"
import Axios from "axios"
import {useParams} from 'react-router-dom'

export default function Ticket() {

  const tid = useParams().tid
  const [id, setId] = useState(0);
  const [ticketTitle, setTicketTitle] = useState("")
  const [ticketContract, setTicketContract] = useState("")
  const [ticketDescription, setTicketDescription] = useState("")
  const [ticketStatus, setTicketStatus] = useState("")
  const [updateAt, setUpdateAt] = useState("")
  
  useEffect(() => {    
    Axios.get(`http://localhost:3001/api/helpdesk/getTicket?id=${tid}`)
    .then((res)=>{
      if(res.data.data!==undefined){
        setTicketTitle(res.data.data.title)
        setTicketContract(res.data.data.contract_info)
        setTicketDescription(res.data.data.description)
        setTicketStatus(res.data.data.status)
        setUpdateAt(res.data.data.update_at)
        setId(tid)
      }else{
        setTicketTitle("")
        setTicketContract("")
        setTicketDescription("")
        setTicketStatus("")
        setUpdateAt("")
        setId(0)
      }
    })       
  }, [tid])
  
  const submitForm = async function (e) {
    e.preventDefault()
    try{
      await Axios.post("http://localhost:3001/api/helpdesk/saveTicket", {
        id: id,
        title: ticketTitle,
        contract_info: ticketContract,
        description: ticketDescription,
        status: ticketStatus,
      } )
      if(id===0){
        alert("insert success")
      }else{
        alert("update success")
      }    
    
      setTicketTitle("")
      setTicketContract("")
      setTicketDescription("")
      setTicketStatus("")
      setUpdateAt("")
      setId(0)
            
    }catch(err){
      alert(err)
    }
  }

  return (
    <div>
      <Container>
        <h1>Ticket</h1>
        <br />
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={ticketTitle}
              onChange={(e) => {
                setTicketTitle(e.target.value)
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="contract">
            <Form.Label>contract information</Form.Label>
            <Form.Control
              type="text"
              name="contract"
              value={ticketContract}
              onChange={(e) => {
                setTicketContract(e.target.value)
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={ticketDescription}
              onChange={(e) => {
                setTicketDescription(e.target.value)
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="update_at">
            <Form.Label>update at</Form.Label>
            <Form.Control
              type="text"
              name="update_at"
              value={updateAt}              
            />
          </Form.Group>
          <Form.Label>status</Form.Label>
          <Form.Select
            value={ticketStatus}
            aria-label="select"
            onChange={(e) => {
              setTicketStatus(e.target.value)
            }}
          >
            <option value={ticketStatus}>{ticketStatus}</option>
            <option value="pending">pending</option>
            <option value="accepted">accepted</option>
            <option value="resolved">resolved</option>
            <option value="rejected">rejected</option>
          </Form.Select>
          <br />
          <Button variant="primary" type="submit" onClick={(e)=>submitForm(e)}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  )
}
