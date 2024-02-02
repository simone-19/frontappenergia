import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import Login from "./Components/PageLogin/Login";
import MyFooter from "./Components/MyFooter";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Client from "./Components/PageClienti/Client";
import ClientDetails from "./Components/PageClienti/ClientDetails";
import GestioneUtenti from "./Components/GestioneUtenti/GestioneUtente";
import MyNav from "./Components/MyNav";
import { useState } from "react";

function App() {
  return (
    <BrowserRouter>
      <Container className="bg-primary-subtle pb-5">
        <Routes>
          <Route path="/gestione" element={<GestioneUtenti />} />
          <Route path="" element={<Login></Login>}></Route>
          <Route path="/clienti" element={<Client></Client>}></Route>
          <Route
            path="/clienti/details/:clientiId"
            element={<ClientDetails ></ClientDetails>}
          ></Route>
        </Routes>
        <MyFooter></MyFooter>
      </Container>
    </BrowserRouter>
  );
}

export default App;
