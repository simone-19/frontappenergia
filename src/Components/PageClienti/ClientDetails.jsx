import { useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import MyNav from "../MyNav";
import ModalModify from "./ModalModify";

const ClientDetails = (props) => {
  const navigate = useNavigate();

  const navigater = () => {
    navigate("/clienti");
  };
  const [showAdd, setShowAdd] = useState(false);
  let { clientiId } = useParams();
  console.log(clientiId);
  const [detail, setDetail] = useState([]);
  const api = "http://localhost:3001/clienti/" + clientiId;
  const token = localStorage.getItem("jwtToken");
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
        console.log(`dati recuperati`, data);
        setDetail(data);
      })
      .catch((error) => {
        console.log("error" + error);
      });
  };

  const deleteData = () => {
    fetch(api, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        authorization: "bearer " + token,
      },
    })
      .then((data) => {
        if (data.ok) {
          console.log("CANCELLATO");
          alert("OGGETTO ELIMINATO");
          navigater();
          //   props.setShow(false)
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
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
      <MyNav></MyNav>
      <ListGroup>
        <ListGroupItem>
          <p>{detail.cognomeContatto}</p>
        </ListGroupItem>
        <ListGroupItem>
          <p>{detail.dataInserimento}</p>
        </ListGroupItem>
        <ListGroupItem>
          <p>{detail.dataUltimoContatto}</p>
        </ListGroupItem>
        <ListGroupItem>
          <p>{detail.email}</p>
        </ListGroupItem>
        <ListGroupItem>
          <p>{detail.emailContatto}</p>
        </ListGroupItem>
        <ListGroupItem>
          <p>{detail.fatturatoAnnuale}</p>
        </ListGroupItem>
        <ListGroupItem>
          <p>{detail.nomeContatto}</p>
        </ListGroupItem>
        <ListGroupItem>
          <p>{detail.partitaIva}</p>
        </ListGroupItem>
        <ListGroupItem>
          <p>{detail.pec}</p>
        </ListGroupItem>
        <ListGroupItem>
          <p>{detail.ragioneSociale}</p>
        </ListGroupItem>
        <ListGroupItem>
          <p>{detail.telefono}</p>
        </ListGroupItem>
      </ListGroup>
      <div>
        <Button variant="warning" onClick={() => setShowAdd(true)}>
          modifica
        </Button>{" "}
        <Button
          variant="danger"
          onClick={() => {
            deleteData();
            navigater();
          }}
        >
          elimina
        </Button>{" "}
      </div>
      <ModalModify
        setShow={setShowAdd}
        show={showAdd}
        id={detail.id}
        image={detail.logoAziendale}
      />
    </>
  );
};

export default ClientDetails;
