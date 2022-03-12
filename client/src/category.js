import React, {useState,useEffect} from "react"
import {Col,Container,Row,Form,Navbar,Nav,Button,Modal} from 'react-bootstrap'
import './App.css';
import Axios from "axios"
import Select from 'react-select'


export default function Category() {
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
    const [modalShow, setModalShow] = useState(false)
    const [editId, setEditId] = useState(false)
    const [modalName, setModalName] = useState('')
    const [modalDesc, setModalDesc] = useState('')
    const [modalCatId, setModalCatId] = useState('')
    useEffect(() => {
        if(keywords===''&& sort===''){
            Axios.get("http://localhost:3001/api/category/", {            
            }).then((res)=>{
                console.log('AAAAAAAAAA',res.data)
                setListCategory(res.data.data)
            })            
        }else{
            Axios.post("http://localhost:3001/api/category/search", { 
                keywords:keywords,     
                sort:sort      
            }).then((res)=>{
                console.log('BBBBBBBBBBBBBBB',res.data)
                setListCategory(res.data.data)
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
    const initModal = async (id)=>{
        listProduct.forEach(rows => {
            if(rows.id===id){
                setModalName(rows.name)
                setModalDesc(rows.desc)
                setModalCatId(rows.category)
            }
        });
        // for (let i = 0; i < listProduct.length; i++) {
        //     const rows = listProduct[i];
        //     setModalName(rows.name)
        //     setModalDesc(rows.desc)
        //     setModalCatId(rows.category)
        // }
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
                edit product
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                        <Form.Control 
                                type="text"
                                value={modalName}
                                placeholder="product name" 
                                onChange={(e) => {
                                    setModalName(e.target.value)
                                }}
                            />  
                        </Col>
                        <Col>
                            <Form.Control 
                                type="text"
                                value={modalDesc}
                                placeholder="product description" 
                                onChange={(e) => {
                                    setModalDesc(e.target.value)
                                }}
                            />                        
                        </Col>      
                        <Col>                            
                            <Select 
                            // defaultValue={{ label: modalCatId, value: 0 }}
                            options={listCategory} 
                            onChange={(e) => {
                                console.log('UUUUUUUUUUU',e)
                                setCategoryId(e.value);
                            }}
                            />
                        </Col> 
                        <Col>                        
                            <Button variant="primary" type="submit" 
                                onClick={(e)=>addProduct(e)}>
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
                            <th></th>
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
                                    <Button variant="warning" onClick={() => initModal(val.id)}>
                                        edit
                                    </Button>
                                    <MyVerticallyCenteredModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    />
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
