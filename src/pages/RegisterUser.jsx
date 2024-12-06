import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './RegisterUser.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/Navbar/Navbar';

const RegisterUser = () => {
  const [userType, setUserType] = useState('customer');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    emailId: '',
    password: ''
  });
  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (value) => {
    setUserType(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = `http://localhost:8009/register/${userType}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      toast.success(`${userType.charAt(0).toUpperCase() + userType.slice(1)} registered successfully!`);

      navigate('/')
     
    } else {
      toast.error(`Failed to register ${userType}. Please check the details and try again.`);
    }
  };

  return (  // Ensure to wrap the JSX in parentheses when it's formatted on multiple lines
  <>
  <NavBar></NavBar>
      <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <div  className="registration-form-container">
            <h1>THE BOOKCLUB</h1>
            <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Register as a {userType.charAt(0).toUpperCase() + userType.slice(1)}</h3>
            <ToggleButtonGroup type="radio" name="userType" defaultValue={userType} onChange={handleUserTypeChange} className='customButtonGroup' >
              <ToggleButton  id="customer" value="customer" variant="outline-primary">Customer</ToggleButton>
              <ToggleButton id="seller" value="seller" variant="outline-secondary">Seller </ToggleButton>
            </ToggleButtonGroup>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" name="firstName" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" name="lastName" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="text" placeholder="Enter mobile number" name="mobile" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="emailId" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" name="password" onChange={handleChange} />
              </Form.Group>

              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
    <Footer></Footer>
  </>

  );
}

export default RegisterUser;
