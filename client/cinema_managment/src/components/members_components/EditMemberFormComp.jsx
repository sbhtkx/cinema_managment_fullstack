import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Form, Col, Button, Row } from "react-bootstrap";
import { selectMemberById } from "../../redux/membersSlice";
import InputRowComp from "../general_components/InputRowComp";
import { updateMemberInServer } from "../../helpers/webserviceHelpers";
import NotAuthorisedComp from "../main_components/NotAuthorisedComp";
import { HasPermission, permissionsTypes } from "../../helpers/authHelpers";

const CONNECTION_PROBLEM_MSG = "Connection problem, try again later.";
const EMPTY_FIELD_MSG = "Please fill all fields.";

const EditMemberFormComp = ({ onFinish }) => {
  const location = useLocation();
  const memberId = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const member = useSelector(selectMemberById(memberId));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setName(member?.name);
    setEmail(member?.email);
    setCity(member?.city);
  }, [member]);

  if (!HasPermission(permissionsTypes.UPDATE_SUBS)) {
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
        updateMemberInServer(memberId, { name, email, city }, () => {
          onFinish();
        });
      } catch (error) {
        console.log(error.message);
        console.log(error);
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
        value={name}
        onChange={handleTextChange}
      />

      <InputRowComp
        head="Email"
        type="email"
        name="email"
        value={email}
        onChange={handleTextChange}
      />
      <InputRowComp
        head="City"
        type="text"
        name="city"
        value={city}
        onChange={handleTextChange}
      />

      <Form.Group as={Row}>
        {errorHelper ? errorHelper : <br />}
        <Col>
          <Button type="submit" className="m-3 btn-success">
            Update
          </Button>
          <Button type="reset" className="m-3 btn-secondary">
            Cancel
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default EditMemberFormComp;
