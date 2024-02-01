import { Row, Col, Form } from "react-bootstrap";

const Main = () => {
  return (
    <>
      <Form>
        <Row>
          <Col xs={8} md={6}>
            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
            />
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default Main;
