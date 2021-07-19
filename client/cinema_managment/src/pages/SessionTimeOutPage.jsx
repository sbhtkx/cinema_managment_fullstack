import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

const SessionTimeOutPage = () => {
  const history = useHistory();
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="mt-3">
            Your session time is over, please log in again.
          </h1>
          <Button className="mt-3" onClick={() => history.push("/login")}>
            Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SessionTimeOutPage;
