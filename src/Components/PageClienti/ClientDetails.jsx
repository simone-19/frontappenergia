import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MyNav from "../MyNav";

const ClientDetails = () => {
  let { clientiId } = useParams();
  console.log(clientiId);
  const api = "http://localhost:3001/clienti/" + clientiId;
  const [detail, setDetail] = useState([]);
  const getClientiDetail = () => {
    fetch(api, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization:
          "bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MjhiNzYwMi0xY2NhLTQzNDYtOGUzOS03YmJlYzY5MzhkYmEiLCJpYXQiOjE3MDY4MTE3MTgsImV4cCI6MTcwNzQxNjUxOH0.6UuQXxc48-hatNbHqyi23IIMPAuneYtVS4bYWc6YHLQ",
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
        <ListGroupItem>
          <p>{detail.telefonoContatto}</p>
        </ListGroupItem>
      </ListGroup>
    </>
  );
};

export default ClientDetails;
