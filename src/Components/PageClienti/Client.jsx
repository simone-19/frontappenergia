import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import ClientSection from "./CientSection";
import MyNav from "../MyNav";

const api = "http://localhost:3001/clienti";
const token ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMzk1ODk0ZC1mMTIwLTRmNjktYTU4NS0x"+
"OWRhOWJjNjJlN2UiLCJpYXQiOjE3MDY4MjU4MzIsImV4cCI6MTcwNzQzMDYzMn0.zRXOHpDMNUM6yCYxyI473TgvS_k0nhLUCsG9NtkZ71M"
const Client = () => {
  const [data, setData] = useState([]);
  const[refresh,setRefresh]=useState(false)
  const getClienti = async () => {
    try {
      let response = await fetch(api, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization:
            "bearer "+token,
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data.content);

        setData(data.content);
      } else {
        throw new Error("Errore nel caricamento dei dati");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getClienti();
  }, [data.length]);

  return (
    <>
      <MyNav></MyNav>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Cliente
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <div>
        <ListGroup>
          {data !== undefined &&
            data.map((element) => {
              return <ClientSection element={element} />;
            })}
        </ListGroup>
      </div>
    </>
  );
};
export default Client;
