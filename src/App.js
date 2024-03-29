import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import Login from "./Components/PageLogin/Login";
import MyFooter from "./Components/MyFooter";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Aggiunto Routes
import Client from "./Components/PageClienti/Client";
import ClientDetails from "./Components/PageClienti/ClientDetails";
import GestioneUtenti from "./Components/GestioneUtenti/GestioneUtente";
import DettaglioFattura from "./Components/PageFatture/DettaglioFattura";
import GestioneFattura from "./Components/PageFatture/GestioneFattura";
import PaginaPersonale from "./Components/GestioneUtenti/PaginaPersonale";

function App() {
  return (
    <>
      <BrowserRouter>
        <Container className="bg-primary-subtle pb-5">
          <Routes>
            <Route path="/gestione" element={<GestioneUtenti />}></Route>
            <Route path="/" element={<Login />}></Route>
            <Route path="/clienti" element={<Client />}></Route>
            <Route
              path="/clienti/details/:clientiId"
              element={<ClientDetails />}
            ></Route>

            <Route
              path="/dettaglio_fattura/:id"
              element={<DettaglioFattura />}
            />
            <Route path="/me" element={<PaginaPersonale></PaginaPersonale>} />
            <Route path="/fatture" element={<GestioneFattura />}></Route>
          </Routes>
          <MyFooter />
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
