import { Navbar } from "react-bootstrap";

import { Row, Col } from "react-bootstrap";
const MyNav = () => {
  return (
    <Navbar className="justify-content-center">
      <Row>
        <Col>
          <h1 className="mb-5">AZIENDA ENERGETICA</h1>
        </Col>
      </Row>
    </Navbar>
  );
};
export default MyNav;
