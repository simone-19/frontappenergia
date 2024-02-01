import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GestioneUtenti from "./Components/GestioneUtenti/GestioneUtente";

function App() {
  return (
    <BrowserRouter>
      <Container className="bg-primary-subtle pb-5">
        <Routes>
        <Route path="/gestione" element={<GestioneUtenti />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
