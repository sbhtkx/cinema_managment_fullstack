import React, { useState } from "react";
import { useImmer } from "use-immer";
import { Form, Row, Col, Button } from "react-bootstrap";
import { addUserToServers } from "../../helpers/webserviceHelpers";
import InputRowComp from "../general_components/InputRowComp";
import InputCheckRowComp from "../general_components/InputCheckRowComp";

import { permissionsTypes } from "../../helpers/authHelpers";
const {
  VIEW_SUBS,
  CREATE_SUBS,
  DELETE_SUBS,
  UPDATE_SUBS,
  VIEW_MOVIES,
  CREATE_MOVIES,
  DELETE_MOVIES,
  UPDATE_MOVIES,
} = permissionsTypes;

const AddUserFormComp = ({ onFinish }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [sessionTimeOut, setSessionTimeOut] = useState("");
  const [permissions, setPermissions] = useImmer({
    [VIEW_SUBS]: false,
    [CREATE_SUBS]: false,
    [DELETE_SUBS]: false,
    [UPDATE_SUBS]: false,
    [VIEW_MOVIES]: false,
    [CREATE_MOVIES]: false,
    [DELETE_MOVIES]: false,
    [UPDATE_MOVIES]: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const connectionProblemMsg = "Connection problem, try again later.";
  const emptyFieldsMsg = "Please fill all fields.";

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;

      default:
        break;
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "sessionTimeOut":
        setSessionTimeOut(value);
        break;

      default:
        break;
    }
  };

  const handleCheckBoxChange = (e) => {
    setPermissions((draft) => {
      const { name, checked } = e.target;

      draft[name] = checked;
      if (
        checked &&
        (name === CREATE_SUBS || name === UPDATE_SUBS || name === DELETE_SUBS)
      ) {
        draft[VIEW_SUBS] = true;
      } else if (
        checked &&
        (name === CREATE_MOVIES ||
          name === UPDATE_MOVIES ||
          name === DELETE_MOVIES)
      ) {
        draft[VIEW_MOVIES] = true;
      }
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    onFinish();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      username.length === 0 ||
      email.length === 0 ||
      sessionTimeOut === 0
    ) {
      setErrorMessage(emptyFieldsMsg);
    } else {
      try {
        const permissionsStringsArr = Object.entries(permissions)
          .filter((entry) => entry[1])
          .map((entry) => entry[0]);
        await addUserToServers(
          {
            firstName,
            lastName,
            username,
            email,
            sessionTimeOut,
          },
          permissionsStringsArr,
          () => {
            onFinish();
          }
        );
      } catch (error) {
        console.log(error);
        setErrorMessage(connectionProblemMsg);
      }
    }
  };

  const errorHelper = (
    <Form.Text className="text-danger">{errorMessage}</Form.Text>
  );

  return (
    <Form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="border border-3 border-danger p-3"
    >
      <InputRowComp
        head="First name"
        type="text"
        onChange={handleTextChange}
        name="firstName"
      />

      <InputRowComp
        head="Last name"
        type="text"
        onChange={handleTextChange}
        name="lastName"
      />

      <InputRowComp
        head="Username"
        type="text"
        onChange={handleTextChange}
        name="username"
      />

      <InputRowComp
        head="Email"
        type="email"
        onChange={handleTextChange}
        name="email"
      />

      <InputRowComp
        head="Session time out (minutes)"
        type="number"
        onChange={handleNumberChange}
        name="sessionTimeOut"
      />

      <fieldset>
        <h5>Permissions:</h5>
        <InputCheckRowComp
          label="View subscriptions"
          onChange={handleCheckBoxChange}
          name={VIEW_SUBS}
          checked={permissions[VIEW_SUBS]}
        />

        <InputCheckRowComp
          label="Create subscriptions"
          onChange={handleCheckBoxChange}
          name={CREATE_SUBS}
          checked={permissions[CREATE_SUBS]}
        />

        <InputCheckRowComp
          label="Delete subscriptions"
          onChange={handleCheckBoxChange}
          name={DELETE_SUBS}
          checked={permissions[DELETE_SUBS]}
        />

        <InputCheckRowComp
          label="Update subscriptions"
          onChange={handleCheckBoxChange}
          name={UPDATE_SUBS}
          checked={permissions[UPDATE_SUBS]}
        />

        <InputCheckRowComp
          label="View movies"
          onChange={handleCheckBoxChange}
          name={VIEW_MOVIES}
          checked={permissions[VIEW_MOVIES]}
        />

        <InputCheckRowComp
          label="Create movies"
          onChange={handleCheckBoxChange}
          name={CREATE_MOVIES}
          checked={permissions[CREATE_MOVIES]}
        />

        <InputCheckRowComp
          label="Delete movies"
          onChange={handleCheckBoxChange}
          name={DELETE_MOVIES}
          checked={permissions[DELETE_MOVIES]}
        />

        <InputCheckRowComp
          label="Update movies"
          onChange={handleCheckBoxChange}
          name={UPDATE_MOVIES}
          checked={permissions[UPDATE_MOVIES]}
        />
      </fieldset>
      <Form.Group as={Row}>
        {errorHelper ? errorHelper : <br />}

        <Col>
          <Button type="submit" className="m-3 btn-success" name="save">
            Save
          </Button>
          <Button type="reset" className="m-3 btn-secondary" name="cancel">
            Cancel
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default AddUserFormComp;
