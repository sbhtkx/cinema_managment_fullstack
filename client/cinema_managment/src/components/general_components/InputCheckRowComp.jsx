import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const InputCheckRowComp = (props) => {
  return (
    <Form.Group as={Row} className="mb-1">
      <Col sm={{ span: 10, offset: 2 }}>
        <Form.Check
          label={props.label}
          onChange={props.onChange}
          name={props.name}
          checked={props.checked}
        />
      </Col>
    </Form.Group>
  );
};

export default InputCheckRowComp;
