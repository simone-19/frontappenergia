import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import ModalModify from "./ModalModify";
import MyNav from "../MyNav";

const ClientSection = (props) => {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <>
      <div className="d-flex align-items-start w-100 border border-2 border-black border-bottom-0">
        <div className="d-flex align-items-start justify-content-between mx-3 w-100  ms-1">
          <div>
            <img
              src={props.element.logoAziendale}
              width={50}
              alt="carica l'immagine!"
            />
          </div>
          <div className="d-flex align-items-center justify-content-start">
            <Link
              to={`/clienti/details/${props.element.id}`}
              className=" text-black text-decoration-none"
            >
              <h5>
                {props.element.nomeContatto} {props.element.ragioneSociale}
              </h5>
            </Link>
          </div>
          <h6 className="ms-5 fs-6">{props.element.pec}</h6>
          <h6 className="ms-5">{props.element.fatturatoAnnuale} €</h6>
        </div>
      </div>
    </>
  );
};

export default ClientSection;
