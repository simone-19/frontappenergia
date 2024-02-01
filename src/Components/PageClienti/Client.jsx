
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import ClientSection from "./CientSection";


const api="http://localhost:3010/clienti"
const token="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMzk1ODk0ZC1mMTIwLTRmNjktYTU4NS0xOWRhOWJjNjJlN2UiLC"+
"JpYXQiOjE3MDY3OTc1ODYsImV4cCI6MTcwNzQwMjM4Nn0.ZVkmHJKD6H0anRr1MgnG6DVVeW0GytKfFHrMbEeQJtU";
const Client = () => {


  const [data, setData] = useState([]);


    const getClienti = async () => {
      try {
        let response = await fetch(api, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "authorization":"bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMzk1ODk0ZC1mMTIwLTRmNjktYTU4NS0xOWRhOWJjNjJlN2UiLCJpYXQiO"+
            "jE3MDY3OTc1ODYsImV4cCI6MTcwNzQwMjM4Nn0.ZVkmHJKD6H0anRr1MgnG6DVVeW0GytKfFHrMbEeQJtU"
          },
        })
        if (response.ok) {
          let data= await response.json();
          console.log(data.content);
      
          setData(data.content)
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
          data.map((element)=>
            {
            return <ClientSection element={element} />
            })           
        }
        
        </ListGroup>
        </div>

      
    </>
  );
};
export default Client;
