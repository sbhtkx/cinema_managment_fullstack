import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CreateAccountFormComp from "../components/login_components/CreateAccountFormComp";

const CreateAccountPage = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col sm={10} md={8} lg={6}>
          <CreateAccountFormComp />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default CreateAccountPage;
