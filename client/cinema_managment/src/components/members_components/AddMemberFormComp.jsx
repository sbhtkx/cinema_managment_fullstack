import React, { useState } from "react";
import { Form, Col, Button, Row } from "react-bootstrap";
import InputRowComp from "../general_components/InputRowComp";
import { addMemberToServer } from "../../helpers/webserviceHelpers";
import { HasPermission, permissionsTypes } from "../../helpers/authHelpers";
import NotAuthorisedComp from "../main_components/NotAuthorisedComp";

const CONNECTION_PROBLEM_MSG = "Connection problem, try again later.";
const EMPTY_FIELD_MSG = "Please fill all fields.";

const AddMemberFormComp = ({ onFinish }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  if (!HasPermission(permissionsTypes.CREATE_SUBS)) {
    return <NotAuthorisedComp />;
  }

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "city":
        setCity(value);
        break;

      default:
        break;
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    onFinish();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (name.length === 0 || email.length === 0 || city.length === 0) {
      setErrorMessage(EMPTY_FIELD_MSG);
    } else {
      try {
        addMemberToServer({ name, email, city }, () => {
          onFinish();
        });
      } catch (error) {
        console.log(error);
        console.log(error.message);
        setErrorMessage(CONNECTION_PROBLEM_MSG);
      }
    }
  };

  const errorHelper = (
    <Form.Text className="text-danger">{errorMessage}</Form.Text>
  );

  return (
    <Form
      className="border border-3 border-danger p-3"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <InputRowComp
        head="Name"
        type="text"
        name="name"
        onChange={handleTextChange}
      />

      <InputRowComp
        head="Email"
        type="email"
        name="email"
        onChange={handleTextChange}
      />
      <InputRowComp
        head="City"
        type="text"
        name="city"
        onChange={handleTextChange}
      />

      <Form.Group as={Row}>
        {errorHelper ? errorHelper : <br />}
        <Col>
          <Button type="submit" className="m-3 btn-success">
            Save
          </Button>
          <Button type="reset" className="m-3 btn-secondary">
            Cancel
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default AddMemberFormComp;
