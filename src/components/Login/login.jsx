import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = () => {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">Feed</div>
        <div className="col">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="E-mail" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Senha" />
            </Form.Group>
            <Button variant="primary" type="submit" className="bg-success">
              Acessar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
