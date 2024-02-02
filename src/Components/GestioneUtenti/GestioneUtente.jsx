import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";


const GestioneUtenti = () => {
    const [data, setData] = useState([]);
    const bearerToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2E1ZGUyNC0yNzJiLTRjMjEtYjM0MS1hMTAyZGI1YWQ2OGUiLCJpYXQiOjE3MDY3OTg5MDYsImV4cCI6MTcwNzQwMzcwNn0.U6WvheifWUF1LYero4vt0wIvS-oJ7yHwBhusglhphSQ";
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
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User created successfully');
        fetchData();
        setShowModal(false);
      } else {
        const errorData = await response.json(); 
        console.error('Failed to create user:', errorData);
      
        alert('Failed to create user. Please check the input and try again.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
     
      alert('An unexpected error occurred. Please try again later.');
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
        const response = await fetch(`http://localhost:3001/utenti/${selectedUserId}`, {
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
        });

        if (response.ok) {
            console.log(`User with ID ${selectedUserId} updated`);
            fetchData();
            setShowModal(false);
        } else {
            const errorData = await response.json();
            console.error('Failed to update user:', errorData);
            alert('Failed to update user. Please check the input and try again.');
        }
    } catch (error) {
        console.error('Error updating user:', error);
        alert('An unexpected error occurred. Please try again later.');
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
    setOperationType("create"); 
  };




  return (
    <div>
     <div className="d-flex justify-content-between">
  <h1 className="text-start p-4">Lista Utenti</h1>
  <Button
    className="rounded-circle mt-4 me-5"
    variant="secondary"
    style={{ width: '50px', height: '50px' }}
    onClick={() => setShowModal(true)}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
      <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
      <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
    </svg>
  </Button>
</div>
      <Row>
        {data.map((user) => (
          <Col className="mb-2 p-2" key={user.uuid} xs={12} sm={6} lg={3}>
            <Card>
              <div className="">
                  <Card.Img src={user.avatar} alt={`Avatar of ${user.username}`} />
                <div>
                  <Card.Body> <div>
                    <Card.Title className="fs-3">{user.username}</Card.Title>
                    <Card.Text>{user.nome} {user.cognome}</Card.Text>
                    <Card.Text className="p-0">Email: <br />
                    {user.email}</Card.Text>
                    <Card.Text>Role:  
                    <strong className="">{user.ruolo}</strong></Card.Text>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>

                      </div>
                      <div>
                    <Button className="mx-2" variant="danger" onClick={() => handleDeleteUser(user.uuid)}>
                    <svg className="p-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>
                    </Button>
                    <Button variant="secondary" onClick={() => handleUpdateUser(user.uuid)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
</Button></div>
</div>
                  </Card.Body>
                </div>
                
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => { setShowModal(false); resetForm(); }}>
    <Modal.Header closeButton>
        <Modal.Title>{operationType === "create" ? "Create User" : "Update User"}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
        <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
        </Form.Group>
      
        {operationType === "create" && (
            <>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="forCognome">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter Cognome"
                value={formData.cognome}
                onChange={(e) => setFormData({ ...formData, cognome: e.target.value })}
            />
        </Form.Group>
    </Form>
</Modal.Body>
<Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowModal(false); resetForm(); }}>
            Close
          </Button>
          <Button variant="primary" onClick={operationType === "create" ? handleCreateUser : handleUpdateUserSubmit}>
            {operationType === "create" ? "Create User" : "Update User"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GestioneUtenti;