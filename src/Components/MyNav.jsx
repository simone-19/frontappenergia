import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyNav = () => {
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [ruolo, setRuolo] = useState("");

  const navigate = useNavigate();

  const navigater = () => {
    navigate("/utenti/me");
  };
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    const getUserInfo = async () => {
      try {
        const userResponse = await fetch("http://localhost:3001/utenti/me", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log("OOOOOOOO" + userData);
          //setData(userData);
          setRuolo(userData.ruolo);
          setUserName(userData.nome);
          setUserAvatar(userData.avatar);
        } else {
          throw new Error("Errore nel recupero dei dati dell'utente");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      getUserInfo();
    }
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="">Azienda energetica</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="flex-grow-1"></div>
          <Nav>
            <Nav.Link href="/clienti">Clienti</Nav.Link>
            <Nav.Link href="/fatture">Fatture</Nav.Link>
            {ruolo === "ADMIN" && (
              <Nav.Link href="/gestione">Gestione Utenti</Nav.Link>
            )}
            <div className="flex-grow-1"></div>
            <Nav.Link href="/me">{userName}</Nav.Link>
            <div>
              <Image
                src={userAvatar}
                onClick={() => {
                  navigater();
                }}
                roundedCircle
                width={40}
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
