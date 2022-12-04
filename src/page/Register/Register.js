
import {Form, Button, Container} from 'react-bootstrap';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import {
    initiateSocket,
    register
   } from "../../client";

function Register() {
    let navigate = useNavigate();
    useEffect(() => {
        initiateSocket('Hello Boizz', document.getElementById('usr').value);//tạo channel
      });
    function handleRegister()
    {
        register({username: document.getElementById('usr').value, password: document.getElementById('psw').value, isLogin: false});
        alert('Complete!');
        navigate('/login');
    }
  return (
    <>
    <Container className = 'w-50'>
    <h1 className = 'm-3'>Register</h1>
    <Form className = 'm-3'>
      <Form.Group className="mb-3" controlId="usr">
        <Form.Label>Username</Form.Label>
        <Form.Control name="usr" type="username" placeholder="Enter username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="psw">
        <Form.Label>Password</Form.Label>
        <Form.Control name="psw" type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="button" onClick = {handleRegister}>
        Register
      </Button>

    </Form>
    </Container>
    </>
  );
}

export default Register;
