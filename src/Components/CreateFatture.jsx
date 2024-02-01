import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchFatture } from "../redux/actions";

const CreateFatture = () => {
  const token = sessionStorage.getItem("token");
  const [clienteId, setClienteId] = useState("");
  const [importo, setImporto] = useState("");
  const [numeroFattura, setNumeroFattura] = useState("");
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
      const response = await fetch("http://localhost:3001/fatture", {
        method: "POST",
        body: JSON.stringify({
          importo: importo,
          clienteId: clienteId,
          numeroFattura: numeroFattura,
        }),
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      handleClose();
      if (response.ok) {
        alert("fattura creata con successo!");
        dispatch(fetchFatture());
      } else {
        alert("errore nella creazione della fattura");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeImporto = (e) => {
    setImporto(e.target.value);
  };
  const handleChangeClientId = (e) => {
    setClienteId(e.target.value);
  };

  const handleChangeNumeroFattura = (e) => {
    setNumeroFattura(e.target.value);
  };
  return (
    <>
      <Button onClick={handleShow}>Aggiungi</Button>
      <Modal show={show} onHide={handleClose} className="mt-3">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>
              <p>Crea Una nuova fattura</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Cliente ID</Form.Label>
              <Form.Control type="text" name="clienteId" onChange={handleChangeClientId} required />
              <Form.Control.Feedback type="invalid">Campo obbligatorio</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom02">
              <Form.Label>Importo</Form.Label>
              <Form.Control type="text" name="importo" onChange={handleChangeImporto} required />
              <Form.Control.Feedback type="invalid">Campo obbligatorio</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Label>Numero Fattura</Form.Label>
              <Form.Control type="text" name="numeroFattura" onChange={handleChangeNumeroFattura} required />
              <Form.Control.Feedback type="invalid">Campo obbligatorio</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
            <Button variant="primary" onClick={(event) => handleSubmit(event)}>
              Crea Fattura
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CreateFatture;