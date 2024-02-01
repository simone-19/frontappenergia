import MyNav from "./MyNav";
import MyFooter from "./MyFooter";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
const Client = () => {
  return (
    <>
      <MyNav />
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Cliente
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <MyFooter />
    </>
  );
};
export default Client;
