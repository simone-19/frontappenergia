import { Facebook, Instagram, Twitter, Youtube } from "react-bootstrap-icons";
const MyFooter = () => (
  <footer id="footer" className="d-flex mt-3">
    <span className="m-auto p-2">
      <div className="text-center mb-3">
        <Facebook className="me-3" />
        <Instagram className="me-3" />
        <Twitter className="me-3" />
        <Youtube className="me-3" />
      </div>
      <strong>Energia</strong> - Copyright {new Date().getFullYear()}
    </span>
  </footer>
);

export default MyFooter;
