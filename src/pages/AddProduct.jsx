import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './AddProduct.css'
import Footer from '../components/Footer/Footer';
import NavBar from '../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {
  const navigate= useNavigate()
  const [product, setProduct] = useState({
    productName: '',
    price: '',
    description: '',
    manufacturer: '',
    url: '',
    quantity: '',
    category: '',
    status: 'AVAILABLE'
  });

  const handleChange = (e) => {
    
    setProduct({ ...product, [e.target.name]: e.target.value });
    console.log("prodct Enums",product)
  };

  const handleSubmit = async (e) => {
    console.log("foemData",product)
    e.preventDefault();
    const response = await fetch('http://localhost:8009/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': `${localStorage.getItem("token")}`
      },
      body: JSON.stringify(product)
    });

    if (response.ok) {
      toast.success('Product added successfully!');
      navigate("/shop")
    } else {
      toast.error('Failed to add product. Please check the details and try again.');
    }
  };

  return (
    <>
    <NavBar></NavBar>
     <Container style={{marginTop:"5%"}}>
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={12} md={8}>
          <div style={{ background: '#f7f7f7', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Add New Product</h3>
            <Form onSubmit={handleSubmit} className='d-flex justify-content-around '>

              <div>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" placeholder="Enter product name" name="productName" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control type="number" step="0.01" placeholder="Price" name="price" onChange={handleChange} />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Product description" name="description" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Manufacturer</Form.Label>
                <Form.Control type="text" placeholder="Manufacturer" name="manufacturer" onChange={handleChange} />
              </Form.Group>

              </div>
              <div>
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="url" placeholder="https://example.com/product-image.jpg" name="url" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" placeholder="Quantity" name="quantity" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
  <Form.Label style={{ width: "15000px", display: "inline-block" }}>Category</Form.Label>
  <Form.Select name="category" onChange={handleChange} value={product.category} style={{ width: "calc(100% - 160px)", display: "inline-block" }}>
    <option value="">Select category</option>
    <option value="FICTION">Fiction</option>
    <option value="NON_FICTION">Non-Fiction</option>
    <option value="MYSTERY_THRILLER">Mystery & Thriller</option>
    <option value="ROMANCE">Romance</option>
    <option value="PSYCHOLOGY">Psychology</option>
    <option value="PARENTING_FAMILY">Parenting & Family</option>
    <option value="POETRY">Poetry</option>
  </Form.Select>
</Form.Group>


              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" onChange={handleChange} value={product.status}>
                  <option value="AVAILABLE">Available</option>
                  <option value="OUTOFSTOCK">Out of Stock</option>
                </Form.Select>
              </Form.Group>
              <Button variant="primary" type="submit" style={{ width: '100%' }}>
                Add Product
              </Button>
              </div>
          
            

            
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
    <Footer></Footer>
    </>
   
  );
};

export default AddProduct;
