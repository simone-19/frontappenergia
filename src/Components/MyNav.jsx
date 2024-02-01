import { Container, Nav, Navbar } from "react-bootstrap";
import { Image } from "react-bootstrap";
const MyNav = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="">Azienda energetica</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          {" "}
          <div className="flex-grow-1 "></div>
          <Nav>
            <Nav.Link href="/clienti">Clienti</Nav.Link>
            <Nav.Link href="/fatture">Fatture</Nav.Link>
            <Nav.Link href="/gestione">Gestione Utenti</Nav.Link>
            <div className="flex-grow-1 "></div>
            <Nav.Link href="/me">Jannik Sinner</Nav.Link>
            <div>
              <Image
                src={"http://placekitten.com/45"}
                roundedCircle
                alt="user-profile"
              ></Image>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MyNav;
