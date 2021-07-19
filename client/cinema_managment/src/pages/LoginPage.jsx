import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoginFormComp from "../components/login_components/LoginFormComp";
// import { logState } from "../helpers/authHelpers";

const LoginPage = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col sm={10} md={8} lg={6}>
          <LoginFormComp />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
