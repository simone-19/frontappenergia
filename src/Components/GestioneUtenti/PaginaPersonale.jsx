import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import MyNav from "../MyNav";

const PaginaPersonale = () => {
  const api = "http://localhost:3001/utenti/me";
  const token = localStorage.getItem("jwtToken");
  const [detail, setDetail] = useState([]);

  const getInvoiceDetails = () => {
    fetch(api, {
      headers: {
        Authorization: "bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel caricamento dati");
        }
      })
      .then((data) => {
        console.log(data);
        setDetail(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInvoiceDetails();
  }, []);

  return (
    <>
      <MyNav></MyNav>
      <Container>
        <Row>
          <Col className="mb-2 p-2" key={detail.uuid} xs={12} sm={6} lg={6}>
            <Card>
              <Row className="g-2">
                <Col>
                  <Card.Img
                    src={detail.avatar}
                    alt={`Avatar of ${detail.detailname}`}
                  />
                </Col>
                <Col>
                  <Card.Body className="d-flex flex-column align-items-center justify-content-around w-100 h-100">
                    <Card.Title>{detail.nome}</Card.Title>
                    <Card.Text>username: {detail.username}</Card.Text>
                    <Card.Text>Email: {detail.email}</Card.Text>
                    <Card.Text>Role: {detail.ruolo}</Card.Text>
                    {/* <Button
                      variant="danger"
                      //   onClick={() => handleDeletedetail(detail.uuid)}
                    >
                      Delete detail
                    </Button> */}
                    {/* <Button
                      variant="secondary"
                      // onClick={() => handleUpdatedetail(detail.uuid)}
                    >
                      Update
                    </Button> */}
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PaginaPersonale;
