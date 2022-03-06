import React, {useState,useEffect} from "react"
import {Col,Container,Row,Form,Navbar,Nav,Button} from 'react-bootstrap'
import './App.css';
import Axios from "axios"
import Select from 'react-select'
import { Link } from 'react-router-dom'

export default function Product() {
    // const [listStatus, setListStatus] = useState('')
    const [sort, setSort] = useState('')
    const [listProduct, setListProduct] = useState([])
    const [keywords, setKeywords] = useState('')
    const [keyword, setKeyword] = useState('')
    const [count, setCount] = useState(0)
    const [productName, setProductName] = useState('')
    const [productDesc, setProductDesc] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [listCategory, setListCategory] = useState([])
    useEffect(() => {
        if(keywords===''&& sort===''){
            Axios.get("http://localhost:3001/api/product/", {            
            }).then((res)=>{
                console.log('AAAAAAAAAA',res.data)
                setListProduct(res.data.data)
            })
            Axios.get(`http://localhost:3001/api/category/getDropDown`)
            .then((res)=>{
                console.log('TTTTTTTTTTTT',res.data)
                setListCategory(res.data.data)
            })
        }else{
            Axios.post("http://localhost:3001/api/product/search", { 
                keywords:keywords,     
                sort:sort      
            }).then((res)=>{
                console.log('BBBBBBBBBBBBBBB',res.data)
                setListProduct(res.data.data)
            })
        }          
    }, [keywords,sort,count])    

    const search = async (e)=>{
        e.preventDefault()        
        setKeywords(keyword)
    }

    const delProduct = async (id)=>{
        await Axios.delete(`http://localhost:3001/api/product?id=${id}`)              
        .then((res)=>{
            setCount(count+1)
        })
    }

    const addProduct = async (e)=>{
        e.preventDefault()        
        try{
            await Axios.put("http://localhost:3001/api/product/", {
              name: productName,
              desc: productDesc,
              category_id:categoryId
            }).then((res)=>{
              if(res.data.status === true){
                  console.log('999999999999999999')
                  setProductDesc('')
                  setProductName('')
                  setCount(count+1)                   
                       
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
            <Container>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">Navbar</Navbar.Brand>
                        <Nav className="me-auto">
                        <Nav.Link href="/product">product</Nav.Link>
                        <Nav.Link href="/category">category</Nav.Link>              
                        </Nav>
                    </Container>
                </Navbar>
                <h1>list product</h1>
                
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
                                setSort('p.name');
                                }}>name</th>
                            <th style={{cursor:'pointer'}} scope="col" title='sort by last update' onClick={() => {
                                setSort('p.desc');
                                }}>description</th>
                            <th style={{cursor:'pointer'}} scope="col" title='sort by last update' onClick={() => {
                                setSort('c.name');
                                }}>category</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>                    
                    {
                        listProduct.map((val)=> {
                            return (
                                <tr key={val.id}>
                                <td>{val.name}</td>
                                <td>{val.desc}</td>
                                <td>{val.category}</td>                                
                                <td>
                                    <button >
                                        <Link to={`/ticket/${val.id}`}>edit</Link>
                                    </button>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={()=>delProduct(val.id) }>
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
                <h2>add product</h2>
                <Form>
                    <Row>
                        <Col>
                        <Form.Control 
                                type="text"
                                value={productName}
                                placeholder="product name" 
                                onChange={(e) => {
                                    setProductName(e.target.value)
                                }}
                            />  
                        </Col>
                        <Col>
                            <Form.Control 
                                type="text"
                                value={productDesc}
                                placeholder="product description" 
                                onChange={(e) => {
                                    setProductDesc(e.target.value)
                                }}
                            />                        
                        </Col>      
                        <Col>
                            {/* <Form.Select
                                value='category'
                                aria-label="select"
                                onChange={(e) => {
                                    setCategoryId(e.target.value)
                                }}
                            >
                                <option value="">""</option>
                                <option value="pending">pending</option>
                                <option value="accepted">accepted</option>
                                <option value="resolved">resolved</option>
                                <option value="rejected">rejected</option>
                            </Form.Select>                       */}
                            <Select options={listCategory} onChange={(e) => {
                                console.log('UUUUUUUUUUU',e)
                                setCategoryId(e.value);
                            }}
                            />
                        </Col> 
                        <Col>                        
                            <Button variant="primary" type="submit" 
                            onClick={(e)=>addProduct(e)}>
                                add
                            </Button>
                        </Col>                                        
                    </Row>
                </Form>      
            </Container>
        </div>
    )
}
