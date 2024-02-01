import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFatture } from "../redux/actions";
import ModifyFatture from "./ModifyFatture";

const ListaFatture = () => {
  const token = sessionStorage.getItem("token");
  const fattureFetched = useSelector((state) => state.fatture.content);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState({
    statoFattura: "",
    data: "",
    importoMin: "",
    importoMax: "",
    anno: "",
    clientId: "",
  });
  const [firstSearch, setFirstSearch] = useState(false);

  useEffect(() => {
    if (firstSearch === true) {
      console.log("FETCH FATTURE ESEGUITA");
      dispatch(fetchFatture(searchParams));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstSearch]);

  const handleSearch = () => {
    setFirstSearch(true);
    dispatch(fetchFatture(searchParams));
  };
  const handleDeleteFattura = (fatturaId) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`http://localhost:3001/fatture/${fatturaId}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (response.ok) {
          dispatch(fetchFatture(searchParams));
        } else {
          console.log("Errore durante l'eliminazione della fattura");
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <h2>Lista Fatture</h2>
          <Form>
            <Form.Group controlId="statoFattura">
              <Form.Label>Stato Fattura</Form.Label>
              <Form.Control
                as="select"
                value={searchParams.statoFattura}
                onChange={(e) => setSearchParams({ ...searchParams, statoFattura: e.target.value })}
              >
                <option value="">Seleziona uno stato</option>
                <option value="BOZZA">Bozza</option>
                <option value="PAGATA">Pagata</option>
                <option value="DA_APPROVARE">Da Approvare</option>
                <option value="RIFIUTATA">Rifiutata</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="data">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                value={searchParams.data || ""}
                onChange={(e) => setSearchParams({ ...searchParams, data: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="importoMin">
              <Form.Label>Importo Minimo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Importo Minimo"
                value={searchParams.importoMin}
                onChange={(e) => setSearchParams({ ...searchParams, importoMin: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="importoMax">
              <Form.Label>Importo Massimo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Importo Massimo"
                value={searchParams.importoMax}
                onChange={(e) => setSearchParams({ ...searchParams, importoMax: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="anno">
              <Form.Label>Anno</Form.Label>
              <Form.Control
                type="text"
                placeholder="Anno"
                value={searchParams.anno}
                onChange={(e) => setSearchParams({ ...searchParams, anno: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="clientId">
              <Form.Label>ID Cliente</Form.Label>
              <Form.Control
                type="text"
                placeholder="ID Cliente"
                value={searchParams.clientId}
                onChange={(e) => setSearchParams({ ...searchParams, clientId: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSearch}>
              Cerca
            </Button>
          </Form>
        </Col>

        <Row className="list-group list-group-horizontal mt-5">
          <Col xs={1} className="list-group-item">
            id
          </Col>
          <Col xs={2} className="list-group-item">
            Numero Fattura
          </Col>
          <Col xs={2} className="list-group-item">
            Importo
          </Col>
          <Col xs={3} className="list-group-item">
            Data
          </Col>
          <Col xs={2} className="list-group-item">
            Stato Fattura
          </Col>
          <Col xs={1} className="list-group-item"></Col>
          <Col xs={1} className="list-group-item"></Col>
        </Row>

        {fattureFetched ? (
          fattureFetched.content && fattureFetched.content.length !== 0 ? (
            fattureFetched.content.map((singleFattura) => (
              <Row key={singleFattura.id} className="list-group list-group-horizontal">
                <Col xs={1} className="list-group-item">
                  {singleFattura.id}
                </Col>
                <Col xs={2} className="list-group-item">
                  {singleFattura.numeroFattura}
                </Col>
                <Col xs={2} className="list-group-item">
                  {singleFattura.importo}
                </Col>
                <Col xs={3} className="list-group-item">
                  {singleFattura.data}
                </Col>
                <Col xs={2} className="list-group-item">
                  {singleFattura.statoFattura.stato}
                </Col>
                <Col xs={1} className="list-group-item">
                  <Button variant="danger" onClick={() => dispatch(handleDeleteFattura(singleFattura.id))}>
                    Elimina
                  </Button>{" "}
                </Col>
                <Col xs={1} className="list-group-item">
                  <ModifyFatture
                    idProp={singleFattura.id}
                    clienteId={singleFattura.cliente.id}
                    importo={singleFattura.importo}
                    numeroFattura={singleFattura.numeroFattura}
                    statoFattura={singleFattura.statoFattura.stato}
                  />
                </Col>
              </Row>
            ))
          ) : (
            <p style={{ display: firstSearch ? "block" : "none" }}>Nessuna fattura disponibile</p>
          )
        ) : (
          <p>Caricamento...</p>
        )}
      </Row>
    </Container>
  );
};

export default ListaFatture;