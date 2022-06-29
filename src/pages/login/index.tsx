import React, { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useAuth } from '../../context/auth.context';

export function LoginComponent() {
  const { login } = useAuth()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    try {
      if(email && password) {
        const result = login(email, password)
      }
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <Container>
      <div className="m-5 d-flex flex-column aling-items-center justify-content-center">
        <div>
          <h1 className="text-center">Login</h1>
        </div>
        <Row className="n aling-items-center justify-content-center">
          <form className="my-3 col-md-6 col-12">
            <div className='form-group'>
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='form-group'>
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="d-flex flex-row justify-content-center mt-4">
            <Button variant="primary" type="submit" onClick={handleSubmit} className={'col-8'} >
              Login
            </Button>
            </div>
          </form>
        </Row>
      </div>
    </Container>
  );
}