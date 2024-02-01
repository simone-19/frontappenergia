import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import Login from "./Components/PageLogin/Login";
import MyFooter from "./Components/MyFooter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from "./Components/PageClienti/Client";

function App() {
  return (
    <BrowserRouter>
      <Container className="bg-primary-subtle pb-5">
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/clienti" element={<Client></Client>}></Route>
        </Routes>
        <MyFooter />
      </Container>
    </BrowserRouter>
  );
}

export default App;
