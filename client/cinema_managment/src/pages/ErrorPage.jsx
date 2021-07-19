import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

const ErrorPage = () => {
  const history = useHistory();
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="mt-3">Sorry, can't go to this page. :(</h1>
          <Button className="mt-3" onClick={() => history.push("/")}>
            Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
