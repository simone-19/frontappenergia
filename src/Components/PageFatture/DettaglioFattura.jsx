import { useEffect, useState } from "react";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import MyNav from "../MyNav";

const DettaglioFattura = () => {
  let { id } = useParams();
  console.log(id + "url");
  const navigate = useNavigate();

  const navigater = () => {
    navigate("/fatture");
  };

  const [dettaglio, setDettaglio] = useState({});
  const [detailObject, setDetailObject] = useState({
    data: "",
    importo: "",
    statoFattura: "",
    clienteId: "",
  });

  const [show, setShow] = useState(false);

  // const [date, setDate] = useState(dettaglio ? dettaglio.date : "");
  // const [importo, setImport] = useState(dettaglio ? dettaglio.imports : 0);
  // const [stato, setStato] = useState(dettaglio ? dettaglio.statoFattura : "");

  // const payload = {
  //   date: date,
  //   imports: importo,
  //   statoFattura: stato,
  // };
  const token = localStorage.getItem("jwtToken");
  console.log(token);
  const getInvoiceDetails = () => {
    fetch("http://localhost:3001/fatture/" + id, {
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
        setDettaglio(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modifyInvoice = () => {
    fetch("http://localhost:3001/fatture/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      body: JSON.stringify(detailObject),
    })
      .then((res) => {
        if (res.ok) {
          console.log("dati modificati!" + res);
          // setShow(true);
          alert("oggetto modificato! complimenti!");
          navigater();
        } else {
          throw new Error(+"errore nel salvataggio dei dati");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInvoiceDetails();
  }, []);

  return (
    <Container fluid>
      <MyNav></MyNav>
      {dettaglio !== null && (
        <>
          <p className="my-3">ID Fattura: {dettaglio.numero_fattura}</p>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              modifyInvoice();
              console.log(detailObject + "questo!");
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Data emissione</Form.Label>
              <Form.Control
                type="date"
                // value={dettaglio.data}
                onChange={(e) => {
                  setDetailObject({
                    ...detailObject,
                    data: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Importo</Form.Label>
              <Form.Control
                type="number"
                // value={dettaglio.importo}
                onChange={(e) => {
                  setDetailObject({
                    ...detailObject,
                    importo: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stato fattura</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setDetailObject({
                    ...detailObject,
                    statoFattura: e.target.value,
                    clienteId: dettaglio.cliente.id,
                  });
                }}
              >
                <option>Seleziona uno stato</option>
                <option value="EMESSA">Emessa</option>
                <option value="PAGATA">Pagata</option>
                <option value="DA_PAGARE">Da Pagare</option>
              </Form.Select>
            </Form.Group>
            {show ? (
              <div className="success-animation d-flex justify-content-start">
                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className="checkmark__circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </div>
            ) : (
              <Button className="btn-success" type="submit">
                Salva
              </Button>
            )}
          </Form>
        </>
      )}
    </Container>
  );
};

export default DettaglioFattura;
