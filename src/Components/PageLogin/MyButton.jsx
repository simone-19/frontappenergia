import { Row, Col, Button } from "react-bootstrap";

const MyButton = ({ onClick }) => {
  return (
    <>
      <Row>
        <Col>
          <Button className="mt-5" onClick={onClick}>
            Login
          </Button>
        </Col>
      </Row>
    </>
  );
};
export default MyButton;
