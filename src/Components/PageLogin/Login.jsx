import { Row, Col, Form } from "react-bootstrap";
import MyButton from "./MyButton";

const Login = () => {
  const url = "http://localhost:3010/auth/login";
  const getToken = async () => {
    try {
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ email: "admin1@gmail.com", password: "admin1" }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data.token);
        const token = data.token;
        return token;
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
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
            />{" "}
            <MyButton></MyButton>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default Login;
