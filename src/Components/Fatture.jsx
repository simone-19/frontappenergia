import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchFatture } from "../redux/actions";
import CreateFatture from "./CreateFatture";
const Fatture = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFatture());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Row>
        <Col xs={12} md={4} lg={4}>
          <div className="card">
            <img
              style={{ height: "214px" }}
              src="https://d2sr9p9v571tfz.cloudfront.net/wp-content/uploads/2018/02/fatturazione-elettronica-150508102903.jpg"
              class="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Crea Fattura</h5>
              <CreateFatture />
            </div>
          </div>
        </Col>
        <Col xs={12} md={4} lg={4}>
          <div className="card">
            <img
              style={{ height: "214px" }}
              src="https://img.freepik.com/premium-vector/cartoon-magnifying-glass-vector-hand-drawn-illustration-isolated-transparent-background_20412-956.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Visualizza tutte le Fatture</h5>
              <a href="/visualizza-fatture" className="btn btn-primary">
                Visualizza
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Fatture;