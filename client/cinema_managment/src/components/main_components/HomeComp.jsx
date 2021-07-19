import React from "react";
import { Row, Col } from "react-bootstrap";
import logo from "../../assets/MOVIECLASSICS.jpg";

const HomeComp = () => {
  return (
    <div>
      <Row>
        <Col>
          <img
            alt="img1"
            src={logo}
            style={{
              width: "100%",
              height: "auto",
              // "object-fit": "cover",
              maxHeight: "100vh",
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default HomeComp;
