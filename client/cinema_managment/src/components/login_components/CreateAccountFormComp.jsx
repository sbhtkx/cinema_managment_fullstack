import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { createAccount } from "../../helpers/authHelpers";

//TODO: fix change of space between form and button, it changes according to message
//TODO: check if creating account works!

const CreateAccountFormComp = () => {
  const MIN_PASSWORD_LENGTH = 6;
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const waitingMsg = "It can take few seconds...";
  const shortPasswordMsg = `Password must have at least ${MIN_PASSWORD_LENGTH} charachters.`;
  const passwordDontMatchMsg = "Passwords do not match.";
  const wrongUserNameMsg =
    "Wrong or used username. Only administrators can add new usernames.";
  const connectionProblemMsg = "Connection problem, try again later.";

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password1":
        setPassword1(value);
        break;
      case "password2":
        setPassword2(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(waitingMsg);

    if (password1.length < MIN_PASSWORD_LENGTH) {
      setErrorMessage(shortPasswordMsg);
    } else if (password1 !== password2) {
      setErrorMessage(passwordDontMatchMsg);
    } else {
      createAccount(
        username,
        password1,
        () => {
          history.push("/login");
        },
        (error) => {
          if (error) {
            setErrorMessage(connectionProblemMsg);
          } else {
            setErrorMessage(wrongUserNameMsg);
          }
        }
      );
    }
  };

  const handleClick = () => {
    history.push("/login");
  };

  const errorHelper = (
    <Form.Text className="text-danger">{errorMessage}</Form.Text>
  );

  return (
    <Form
      onSubmit={handleSubmit}
      className="m-2 border border-primary border-2"
    >
      <h3 className="m-3">Create Account</h3>
      <Form.Group className="mb-3 ms-2 me-2">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3 ms-2 me-2">
        <Form.Label>New password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password1"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3 ms-2 me-2">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm password"
          name="password2"
          onChange={handleChange}
        />

        {errorHelper ? errorHelper : <br />}
      </Form.Group>

      <Button className="mb-3" type="submit">
        Create
      </Button>
      <Button className="ms-3 mb-3 btn-secondary" onClick={handleClick}>
        Back
      </Button>
    </Form>
  );
};

export default CreateAccountFormComp;
