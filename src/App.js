import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import MyNav from "./Components/MyNav";
import { Container } from "react-bootstrap";
import Main from "./Components/Main";

import MyFooter from "./Components/MyFooter";
import MyButton from "./Components/MyButton";
import { BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Container className="bg-primary-subtle pb-5">
        <MyNav />
        <Routes>
          <Main />

          <MyButton />
        </Routes>
        <MyFooter />
      </Container>
    </BrowserRouter>
  );
}

export default App;
