import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchFatture } from "../redux/actions";

const ModifyFatture = (props) => {
  const token = sessionStorage.getItem("token");
  const [importo, setImporto] = useState(props.importo || "");
  const [statoFattura, SetStatoFattura] = useState(props.statoFattura || "");
  const [clienteId, setClienteId] = useState(props.clienteId || "");
  const [numeroFattura, setNumeroFattura] = useState(props.numeroFattura || "");

  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    try {
      const response = await fetch("http://localhost:3001/fatture/" + props.idProp, {
        method: "PUT",
        body: JSON.stringify({
          importo: importo,
          statoFattura: statoFattura,
          numeroFattura: numeroFattura,
          clienteId: clienteId,
        }),
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        handleClose();
        dispatch(fetchFatture());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeImporto = (e) => {
    setImporto(e.target.value);
  };
  const handleChangeStatoFattura = (e) => {
    SetStatoFattura(e.target.value);
  };
  const handleChangeNumeroFattura = (e) => {
    setNumeroFattura(e.target.value);
  };
  const handleChangeClienteId = (e) => {
    setClienteId(e.target.value);
  };

  return (
    <>
      <Button onClick={handleShow}>Modifica</Button>
      <Modal show={show} onHide={handleClose} className="mt-3">
        <Form noValidate validated={validated}>
          <Modal.Header>
            <Modal.Title>
              <p>Modifica una fattura</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Cliente ID</Form.Label>
              <Form.Control type="text" name="clienteID" onChange={handleChangeClienteId} />
              <Form.Control.Feedback type="invalid">Campo obbligatorio</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom02">
              <Form.Label>Importo</Form.Label>
              <Form.Control type="text" name="importo" onChange={handleChangeImporto} />
              <Form.Control.Feedback type="invalid">Campo obbligatorio</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Label>Numero Fattura</Form.Label>
              <Form.Control type="text" name="numeroFattura" onChange={handleChangeNumeroFattura} />
              <Form.Control.Feedback type="invalid">Campo obbligatorio</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom04">
              <Form.Label>stato Fattura</Form.Label>
              <Form.Control as="select" name="statoFattura" onChange={handleChangeStatoFattura}>
                <option value="">Seleziona uno stato</option>
                <option value="BOZZA">Bozza</option>
                <option value="PAGATA">Pagata</option>
                <option value="RIFIUTATA">Rifiutata</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">Campo obbligatorio</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
            <Button variant="primary" onClick={(event) => handleSubmit(event)}>
              Modifica Fattura
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModifyFatture;