
import {Form, Button, Container} from 'react-bootstrap';

function Login() {
  function handleLogin()
  {
    localStorage.clear();
    localStorage.setItem('usr', document.getElementById('usr').value);
    localStorage.setItem('psw', document.getElementById('psw').value);
    //-------------------------------
  }
  console.log(localStorage.getItem('usr'))
  return (
    <Container className = 'w-50'>
    <Form className = 'm-3' method = 'post' onSubmit={handleLogin}>
        <h1 className = 'm-3'>Login</h1>
      <Form.Group className="mb-3" controlId="usr">
        <Form.Label>Username</Form.Label>
        <Form.Control name="usr" type="username" placeholder="Enter username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="psw">
        <Form.Label>Password</Form.Label>
        <Form.Control name="psw" type="password" placeholder="Password" />
      </Form.Group>
      <Button type = 'button' href = '/register'>
        Register
      </Button>
      <Button variant="primary" type="submit" className = 'm-2'>
        Login
      </Button>
      
    </Form>
    </Container>
  );
}

export default Login;
