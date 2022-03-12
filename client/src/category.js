import React, {useState,useEffect} from "react"
import {Col,Container,Row,Form,Navbar,Nav,Button,Modal} from 'react-bootstrap'
import './App.css';
import Axios from "axios"
import Select from 'react-select'


export default function Category() {
    const [sort, setSort] = useState('')
    const [keywords, setKeywords] = useState('')
    const [keyword, setKeyword] = useState('')
    const [listCategory, setListCategory] = useState([])
    const [count, setCount] = useState(0)
    const [categoryName, setCategoryName] = useState('')
    const [categoryDesc, setCategoryDesc] = useState('')    
    const [modalShow, setModalShow] = useState(false)
    const [editId, setEditId] = useState(false)
    const [modalName, setModalName] = useState('')
    const [modalDesc, setModalDesc] = useState('')
    useEffect(() => {
        if(keywords===''&& sort===''){
            Axios.get("http://localhost:3001/api/category/", {            
            }).then((res)=>{
                setListCategory(res.data.data)
            })            
        }else{
            Axios.post("http://localhost:3001/api/category/search", { 
                keywords:keywords,     
                sort:sort      
            }).then((res)=>{
                setListCategory(res.data.data)
            })
        }          
    }, [keywords,sort,count])    

    const search = async (e)=>{
        e.preventDefault()        
        setKeywords(keyword)
    }

    const delCategory = async (id)=>{
        await Axios.delete(`http://localhost:3001/api/category?id=${id}`)              
        .then((res)=>{
            alert('Delete success')
            setCount(count+1)
        })
    }

    const addCategory = async (e)=>{
        e.preventDefault()        
        try{
            await Axios.put("http://localhost:3001/api/category/", {
              name: categoryName,
              desc: categoryDesc
            }).then((res)=>{
              if(res.data.status === true){
                  alert('Add category complete')
                  setCategoryDesc('')
                  setCategoryName('')
                  setCount(count+1)                   
                       
              }else{
                alert(res.data.error)
              }
            })            
          }catch(e){
            alert(e)
          }
    }
    const editCategory = async (e)=>{
        e.preventDefault()        
        try{
            await Axios.post("http://localhost:3001/api/category/", {
                id:editId,
                name: modalName,
                desc: modalDesc
            }).then((res)=>{
              if(res.data.status === true){
                  alert('Edit category complete')                 
                  setModalShow(false)
                  setCount(count+1)  
              }else{
                alert(res.data.error)
              }
            })            
          }catch(e){
            alert(e)
          }
    }
    const initModal = async (id)=>{
        listCategory.forEach(rows => {
            if(rows.id===id){
                setModalName(rows.name)
                setModalDesc(rows.desc)
            }
        });
        await setEditId(id)
        await setModalShow(true)

    }
    
    const MyVerticallyCenteredModal = (props)=> {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                edit category
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                        <Form.Control 
                                type="text"
                                value={modalName}
                                placeholder="category name" 
                                onChange={(e) => {
                                    setModalName(e.target.value)
                                }}
                            />  
                        </Col>
                        <Col>
                            <Form.Control 
                                type="text"
                                value={modalDesc}
                                placeholder="description" 
                                onChange={(e) => {
                                    setModalDesc(e.target.value)
                                }}
                            />                        
                        </Col>                              
                        <Col>                        
                            <Button variant="primary" type="submit" 
                                onClick={(e)=>editCategory(e)}>
                                edit
                            </Button>
                        </Col>                                        
                    </Row>
                </Form>               
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }

    return (
        <div>
            <Container>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">Login</Navbar.Brand>
                        <Nav className="me-auto">
                        <Nav.Link href="/product">product</Nav.Link>
                        <Nav.Link href="/category">category</Nav.Link>              
                        </Nav>
                    </Container>
                </Navbar>
                <h1>list category</h1>
                
                <Form>
                    <Row>
                        <Col xs={8}></Col>
                        <Col>
                            <Form.Control 
                                type="text"
                                placeholder="search" 
                                onChange={(e) => {
                                    setKeyword(e.target.value)
                                }}
                            />                        
                        </Col>      
                        <Col>                        
                            <Button variant="primary" type="submit" 
                            onClick={(e)=>search(e)}>
                                search
                            </Button>
                        </Col>                                        
                    </Row>
                </Form>
                <table class="table">
                    <thead>
                        <tr>                           
                            <th style={{cursor:'pointer'}} scope="col" title='sort by status' onClick={() => {
                                setSort('name');
                                }}>name</th>
                            <th style={{cursor:'pointer'}} scope="col" title='sort by last update' onClick={() => {
                                setSort('desc');
                                }}>description</th>                            
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>                    
                    {
                        listCategory.map((val)=> {
                            return (
                                <tr key={val.id}>
                                <td>{val.name}</td>
                                <td>{val.desc}</td>                             
                                <td>
                                    <Button variant="warning" onClick={() => initModal(val.id)}>
                                        edit
                                    </Button>
                                    <MyVerticallyCenteredModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    />
                                </td>
                                <td>
                                    <Button variant="danger" onClick={()=>delCategory(val.id) }>
                                        delete
                                    </Button>                                   
                                </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <br />
                <br />
                <br />    
                <h2>add category</h2>
                <Form>
                    <Row>
                        <Col>
                        <Form.Control 
                                type="text"
                                value={categoryName}
                                placeholder="category name" 
                                onChange={(e) => {
                                    setCategoryName(e.target.value)
                                }}
                            />  
                        </Col>
                        <Col>
                            <Form.Control 
                                type="text"
                                value={categoryDesc}
                                placeholder="category description" 
                                onChange={(e) => {
                                    setCategoryDesc(e.target.value)
                                }}
                            />                        
                        </Col>      
                        <Col>                        
                            <Button variant="primary" type="submit" 
                                onClick={(e)=>addCategory(e)}>
                                add
                            </Button>
                        </Col>                                        
                    </Row>
                </Form>      
            </Container>
        </div>
    )
}