import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import MyNav from "../MyNav";

const GestioneUtenti = () => {
  const [data, setData] = useState([]);
  const bearerToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MjhiNzYwMi0xY2NhLTQzNDYtOGUzOS03YmJlYzY5MzhkYmEiLCJpYXQiOjE3MDY4MTE3MTgsImV4cCI6MTcwNzQxNjUxOH0.6UuQXxc48-hatNbHqyi23IIMPAuneYtVS4bYWc6YHLQ";
  const [operationType, setOperationType] = useState("create");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nome: "",
    cognome: "",
  });
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/utenti", {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      const result = await response.json();
      setData(result.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (utenteId) => {
    try {
      const response = await fetch(`http://localhost:3001/utenti/${utenteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      if (response.ok) {
        console.log(`User with ID ${utenteId} deleted`);
        fetchData(); //
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User created successfully");
        fetchData();
        setShowModal(false);
      } else {
        const errorData = await response.json();
        console.error("Failed to create user:", errorData);

        alert("Failed to create user. Please check the input and try again.");
      }
    } catch (error) {
      console.error("Error creating user:", error);

      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const handleUpdateUser = (utenteId) => {
    const userToUpdate = data.find((user) => user.uuid === utenteId);

    if (userToUpdate) {
      setFormData({
        username: userToUpdate.username,
        email: userToUpdate.email,
        password: "",
        nome: userToUpdate.nome || "",
        cognome: userToUpdate.cognome || "",
      });
      setSelectedUserId(utenteId);
      setOperationType("update");
      setShowModal(true);
    }
  };

  const handleUpdateUserSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/utenti/${selectedUserId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            nome: formData.nome,
            cognome: formData.cognome,
          }),
        }
      );

      if (response.ok) {
        console.log(`User with ID ${selectedUserId} updated`);
        fetchData();
        setShowModal(false);
      } else {
        const errorData = await response.json();
        console.error("Failed to update user:", errorData);
        alert("Failed to update user. Please check the input and try again.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      nome: "",
      cognome: "",
    });
    setSelectedUserId(null);
    setOperationType("create"); // Set operationType back to "create"
  };

  return (
    <>
      <MyNav></MyNav>
      <div>
        <h1 className="text-center p-2 ">Lista Utenti</h1>
        <Button variant="secondary" onClick={() => setShowModal(true)}>
          Create User
        </Button>
        <Row>
          {data.map((user) => (
            <Col className="mb-2 p-2" key={user.uuid} xs={12} sm={6} lg={3}>
              <Card>
                <Row className="g-2">
                  <Col>
                    <Card.Img
                      src={user.avatar}
                      alt={`Avatar of ${user.username}`}
                    />
                  </Col>
                  <Col>
                    <Card.Body>
                      <Card.Title>{user.username}</Card.Title>
                      <Card.Text>Email: {user.email}</Card.Text>
                      <Card.Text>Role: {user.ruolo}</Card.Text>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteUser(user.uuid)}
                      >
                        Delete User
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleUpdateUser(user.uuid)}
                      >
                        Update
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false);
            resetForm();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {operationType === "create" ? "Create User" : "Update User"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </Form.Group>
              {/* Conditionally render "Email" and "Password" for create operation */}
              {operationType === "create" && (
                <>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </Form.Group>
                </>
              )}
              <Form.Group className="mb-3" controlId="formNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Nome"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="forCognome">
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Cognome"
                  value={formData.cognome}
                  onChange={(e) =>
                    setFormData({ ...formData, cognome: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={
                operationType === "create"
                  ? handleCreateUser
                  : handleUpdateUserSubmit
              }
            >
              {operationType === "create" ? "Create User" : "Update User"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default GestioneUtenti;
