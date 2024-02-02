import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import Login from "./Components/PageLogin/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from "./Components/PageClienti/Client";
import GestioneUtenti from "./Components/GestioneUtenti/GestioneUtente";

function App() {
  return (
    <BrowserRouter>
      <Container className="bg-primary-subtle pb-5">
        <Routes>
          <Route path="/gestione" element={<GestioneUtenti />} />
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/clienti" element={<Client></Client>}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
