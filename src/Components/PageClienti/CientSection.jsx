import { Link, useNavigate, useParams } from "react-router-dom";


const ClientSection = (props) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-start">
        <img
          src={props.element.logoAziendale}
          width={50}
          alt="carica l'immagine!"
        />
        <Link to={`/clienti/details/${props.element.id}`} className="ms-5 text-black text-decoration-none">
          <h5>
            {props.element.nomeContatto} {props.element.ragioneSociale}
          </h5>
        </Link>

        <h6 className="ms-5">{props.element.pec}</h6>
      </div>
    </>
  );
};

export default ClientSection;
