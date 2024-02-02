import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import ClientSection from "./CientSection";
import MyNav from "../MyNav";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";

let api = "http://localhost:3001/clienti?";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMzk1ODk0ZC1mMTIwLTRmNjktYTU4NS0x" +
  "OWRhOWJjNjJlN2UiLCJpYXQiOjE3MDY4MjU4MzIsImV4cCI6MTcwNzQzMDYzMn0.zRXOHpDMNUM6yCYxyI473TgvS_k0nhLUCsG9NtkZ71M";
const Client = () => {
  const [label1, setLabel1] = useState(false);
  const [label2, setLabel2] = useState(false);
  const [label3, setLabel3] = useState(false);
  const [label4, setLabel4] = useState(false);
  const [label5, setLabel5] = useState(false);

  const [modifyObject, setModifyObject] = useState({
    nomeContatto: "",
    dataUltimoContatto: "",
    dataInserimento: "",
    fatturatoMinimo: "",
    fatturatoMassimo: "",
  });
  let nome = "";
  if (label1 === true) {
    nome = "nomeContatto=";
  }else{
    nome=""
  }
  let dataultimo = "";
  if (label2 === true) {
    dataultimo = "&dataUltimoContatto=";
  }else{
    dataultimo=""
  }
  let datainserimento = "";
  if (label3 === true) {
    datainserimento = "&dataInserimento=";
  }else{
    datainserimento=""
  }
  let fatturatoMax = "";
  let fatturatomin = "";
  if (label4 === true) {
    fatturatomin = "&minimo=";
    fatturatoMax = "&massimo=";
  }else{
    fatturatoMax=""
    fatturatomin=""
  }
  let api3= api +
  nome + modifyObject.nomeContatto +
  dataultimo+modifyObject.dataUltimoContatto +
  datainserimento+modifyObject.dataInserimento +
  fatturatomin+modifyObject.fatturatoMinimo +
  fatturatoMax+modifyObject.fatturatoMassimo;
  console.log(api3)

  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const getClienti = async () => {
    try {
      let response = await fetch(api3,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: "bearer " + token,
          },
        }
      );
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
  }, []);

  return (
    <>
      <MyNav></MyNav>
      <Form  onSubmit={(e) => {
              e.preventDefault();
              getClienti()
              setModifyObject({
                nomeContatto: "",
                dataUltimoContatto: "",
                dataInserimento: "",
                fatturatoMinimo: "",
                fatturatoMassimo: "",
              })}}>
        <Form.Group className="mb-3">
          <Checkbox
         
            onChange={() => {
              if (label1 === true) {
                setLabel1(false);
              } else {
                setLabel1(true);
              }
            }}
          />
          <Form.Label>Nome contatto</Form.Label>
          {label1 === true && <Form.Control type="text" value={modifyObject.nomeContatto} onChange={(e)=>{
              setModifyObject({
                ...modifyObject,
                  nomeContatto:e.target.value
              })
          }} />}
        </Form.Group>

        <Form.Group className="mb-3">
          <Checkbox
         
            
            
            onChange={() => {
              if (label2 === true) {
                setLabel2(false);
              } else {
                setLabel2(true);
              }
            }}
          />
          <Form.Label>data ultimo contatto</Form.Label>
          {label2 === true && <Form.Control type="date" value={modifyObject.dataUltimoContatto} onChange={(e)=>{
              setModifyObject({
                ...modifyObject,
                  dataUltimoContatto:e.target.value
              })
          }}  />}
        </Form.Group>

        <Form.Group className="mb-3">
          <Checkbox
         
            
            onChange={() => {
              if (label3 === true) {
                setLabel3(false);
              } else {
                setLabel3(true);
              }
            }}
          />
          <Form.Label>data inserimento</Form.Label>
          {label3 === true && <Form.Control type="date" value={modifyObject.dataInserimento} onChange={(e)=>{
              setModifyObject({
                ...modifyObject,
                  dataInserimento:e.target.value
              })
          }}  />}
        </Form.Group>

        <Form.Group className="mb-3">
          <Checkbox
         
            
            onChange={() => {
              if (label4 === true) {
                setLabel4(false);
                setLabel5(false);
              } else {
                setLabel4(true);
                setLabel5(true);
              }
            }}
          />
          <Form.Label>fatturato minimo</Form.Label>
          {label4 === true && label5 === true && <Form.Control type="number"  value={modifyObject.fatturatoMinimo}onChange={(e)=>{
              setModifyObject({
                ...modifyObject,
                  fatturatoMinimo:e.target.value
              })
          }}  />}
        </Form.Group>

        <Form.Group className="mb-3">
          {/* <Checkbox
         
            {..."label5"}
        
            onChange={() => {
              if (label5 === true) {
                setLabel5(false);
                setLabel4(false)
              } else {
                setLabel5(true);
                setLabel4(true);
              }
            
            }}
          /> */}
          <Form.Label className="ms">fatturato massimo</Form.Label>
          {label4 && (
            <Form.Control
              type="number" 
              value={modifyObject.fatturatoMassimo}
              onChange={(e) => {
                setModifyObject({
                  ...modifyObject,
                  fatturatoMassimo: e.target.value,
                });
              }}
            />
          )}
        </Form.Group>
        <Button type="submit">cerca</Button>
      </Form>
      <div>
        <ListGroup>
          {data !== undefined &&
            data.map((element) => {
              return <ClientSection key={element.id} element={element} />;
            })}
        </ListGroup>
      </div>
    </>
  );
};
export default Client;
