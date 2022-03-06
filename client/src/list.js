import React, {useState,useEffect} from "react"
import {Col,Container,Row,Form} from 'react-bootstrap'
import './App.css';
import Axios from "axios"
import { Link } from 'react-router-dom'

export default function List() {
    const [listStatus, setListStatus] = useState('')
    const [sort, setSort] = useState('')
    const [listTicket, setListTicket] = useState([])
    useEffect(() => {
        Axios.post("http://localhost:3001/api/helpdesk/listTicket", {
            status:listStatus,
            order:sort
        }).then((res)=>{
            setListTicket(res.data.data)
        })
        
    }, [listStatus,sort])    

    return (
        <div>
            <Container>
                <h1>List</h1>
                <Row>
                    <Col xs={10}></Col>
                    <Col>
                        <Form.Select
                            aria-label="select"
                            onChange={(e) => {
                            setListStatus(e.target.value);
                            }}
                        >
                            <option value="status">status</option>
                            <option value="pending">pending</option>
                            <option value="accepted">accepted</option>
                            <option value="resolved">resolved</option>
                            <option value="rejected">rejected</option>
                        </Form.Select>
                    </Col>
                </Row>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">title</th>
                            <th scope="col">contract</th>
                            <th scope="col">description</th>
                            <th style={{cursor:'pointer'}} scope="col" title='sort by status' onClick={() => {
                                setSort('status');
                                }}>status</th>
                            <th style={{cursor:'pointer'}} scope="col" title='sort by last update' onClick={() => {
                                setSort('update_at');
                                }}>lastUpdate</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>                    
                    {
                        listTicket.map((val)=> {
                            return (
                                <tr key={val.id}>
                                <td>{val.title}</td>
                                <td>{val.contract_info}</td>
                                <td>{val.description}</td>
                                <td>{val.status}</td>
                                <td>{val.update_at}</td>
                                <td>
                                    <button >
                                        <Link to={`/ticket/${val.id}`}>edit</Link>
                                    </button>
                                </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>           
            </Container>
        </div>
    )
}
