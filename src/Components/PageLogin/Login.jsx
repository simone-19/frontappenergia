import { Row, Col, Form } from "react-bootstrap";
import MyButton from "./MyButton";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginPayload, setLoginPayload] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const token = await getToken();
      if (token) {
        navigate("/clienti");
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
    }
  };

  const url = "http://localhost:3001/auth/login";

  const getToken = async () => {
    try {
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(loginPayload),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        let data = await response.json();
        console.log("token recuperato dal server " + data.token);
        localStorage.setItem("jwtToken", data.token);
        console.log(localStorage.getItem("jwtToken"));
        return data.token;
      } else {
        throw new Error("Errore nel caricamento dei dati");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <h1 className="mb-5 text-center">AZIENDA ENERGETICA</h1>
      <Row>
        <Col xs={8} md={6}>
          <Form>
            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={loginPayload.email}
                onChange={(e) => {
                  setLoginPayload({
                    ...loginPayload,
                    email: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              value={loginPayload.password}
              onChange={(e) => {
                setLoginPayload({
                  ...loginPayload,
                  password: e.target.value,
                });
              }}
            />
            <MyButton onClick={handleLogin}></MyButton>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
