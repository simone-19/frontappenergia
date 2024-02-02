import { Alert, Button, Form } from "react-bootstrap";

import { IoMdArrowDropdown } from "react-icons/io";
import { GoClock } from "react-icons/go";
import { FaRegImage } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { PiArticle } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import { FaRegSmile } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ModalModify = (props) => {
  const navigate = useNavigate();

  const navigater = () => {
    navigate("/clienti");
  };
  let { clientiId } = useParams();
  console.log(clientiId);
  const [detail, setDetail] = useState([]);
  console.log(props.image + "image");
  const [modifyObject, setModifyObject] = useState({
    ragioneSociale: "",
    partitaIva: "",
    email: "",
    dataUltimoContatto: "",
    fatturatoAnnuale: "",
    pec: "",
    telefono: "",
    emailContatto: "",
    nomeContatto: "",
    cognomeContatto: "",
    telefonoContatto: "",
    logoAziendale: "",
    indirizzo1Adress: "",
    indirizzo1Civico: "",
    indirizzo1Localita: "",
    indirizzo1Cap: "",
  });
  const api = "http://localhost:3001/clienti/" + clientiId;
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMzk1ODk0ZC1mMTIwLTRmNjktYTU4NS0xOWRhOWJjNjJlN2UiLCJpYXQiOjE3MDY4MjU4MzIsImV4cCI6MTcwNzQzMDYzMn0.zRXOHpDMNUM6yCYxyI473TgvS_k0nhLUCsG9NtkZ71M";
  const postData = () => {
    fetch(api, {
      method: "PUT",
      body: JSON.stringify(modifyObject),
      headers: {
        "Content-type": "application/json",
        authorization: "bearer " + token,
      },
    })
      .then((data) => {
        if (data.ok) {
          console.log("inviato");
          alert("oggetto modificato");
          navigater();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .catch((error) => {
        console.log("error" + error);
      });
  };
  const getClientiDetail = () => {
    fetch(api, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: "bearer " + token,
      },
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((data) => {
        console.log(`dati belli recuperati`, data);
        setDetail(data);
      })
      .catch((error) => {
        console.log("error" + error);
      });
  };

  useEffect(() => {
    getClientiDetail();
  }, []);
  return (
    <>
      {props.show && (
        <div
          className="modal show modal-modify  bg-light addPost border border-5 border-black"
          style={{ display: "block", position: "initial" }}
        >
          <Form
            className="m-5"
            onSubmit={(e) => {
              e.preventDefault();
              postData();
              props.setShow(false);
              // props.setRefreshFunction(1);
            }}
          >
            <div className="p-3">
              <div className="d-flex justify-content-end my-2">
                <p>
                  <IoClose
                    onClick={() => {
                      props.setShow(false);
                    }}
                    className="fs-2 text-secondary"
                  />
                </p>
              </div>
            </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ragione sociale</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setModifyObject({
                    ...modifyObject,
                    ragioneSociale: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>partita iva</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setModifyObject({
                    ...modifyObject,
                    partitaIva: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => {
                  setModifyObject({
                    ...modifyObject,
                    email: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>data di ultimo contatto</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => {
                  setModifyObject({
                    ...modifyObject,
                    dataUltimoContatto: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>fatturato annuale</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => {
                  setModifyObject({
                    ...modifyObject,
                    fatturatoAnnuale: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>pec</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => {
                  setModifyObject({
                    ...modifyObject,
                    pec: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>telefono</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setModifyObject({
                    ...modifyObject,
                    telefono: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email Contatto</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => {
                  setModifyObject({
                    ...modifyObject,
                    emailContatto: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>nome Contatto</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setModifyObject({
                    ...modifyObject,
                    nomeContatto: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Cognome contatto</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setModifyObject({
                    ...modifyObject,
                    cognomeContatto: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>telefono contatto</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setModifyObject({
                    ...modifyObject,
                    telefonoContatto: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>via</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setModifyObject({
                    ...modifyObject,
                    indirizzoAdress: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>numero civico</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setModifyObject({
                    ...modifyObject,
                    indirizzoCivico: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>paese</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setModifyObject({
                    ...modifyObject,
                    indirizzoLocalita: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>cap</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setModifyObject({
                    ...modifyObject,
                    indirizzoCap: e.target.value,
                    logoAziendale: detail.logoAziendale,
                  });
                }}
              />
            </Form.Group>
            <Button type="submit"> modifica</Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default ModalModify;
