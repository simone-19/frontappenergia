import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import ModalModify from "./ModalModify";

const ClientSection = (props) => {


  const [showAdd, setShowAdd] = useState(false);
  return (
    <>
      <div className="d-flex align-items-center justify-content-between border border-2 border-black border-bottom-0">
        <div className="d-flex align-items-center justify-content-start ms-5">
          <img
            src={props.element.logoAziendale}
            width={50}
            alt="carica l'immagine!"
          />
          <Link
            to={`/clienti/details/${props.element.id}`}
            className="ms-5 text-black text-decoration-none"
          >
            <h5>
              {props.element.nomeContatto} {props.element.ragioneSociale}
            </h5>
          </Link>
          <h6 className="ms-5">{props.element.pec}</h6>
        </div>
        <div className="d-flex me-5">
          {/* <Button variant="info" onClick={()=>setShowAdd(true)}>modifica</Button>{" "} */}
          {/* <Button variant="danger">elimina</Button>{" "} */}
        </div>
      </div>
          {/* <ModalModify show={showAdd} id={props.element.id}/> */}
    </>
  );
};

export default ClientSection;
