import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { authenticateAndLogin, logState } from "../../helpers/authHelpers";

const WAITING_MSG = "It can take few seconds...";
const WRONG_NAME_ORR_PASSWORD_MSG = "Wrong username or password. Try again.";
const CONNECTION_PROBLEM_MSG = "Connection problem, try again later.";

const LoginFormComp = () => {
  logState();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword1] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword1(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage(WAITING_MSG);

    authenticateAndLogin(
      username,
      password,
      () => {
        history.push("/");
      },
      (error) => {
        if (error) {
          console.log("error.message");
          console.log(error.message);
          console.log(error);
          setErrorMessage(CONNECTION_PROBLEM_MSG);
        } else {
          setErrorMessage(WRONG_NAME_ORR_PASSWORD_MSG);
        }
      }
    );
  };

  const handleClick = () => {
    history.push("/createAccoount");
  };

  const errorHelper = (
    <Form.Text className="text-danger">{errorMessage}</Form.Text>
  );

  return (
    <Form
      onSubmit={handleSubmit}
      className="m-2 border border-primary border-2"
    >
      <h3 className="m-3">Cinema Managment Login</h3>
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
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={handleChange}
        />
        {errorHelper}
      </Form.Group>
      <Button className="mb-3" variant="primary" type="submit">
        Login
      </Button>
      <Form.Group className="mb-3">
        New user?{" "}
        <Button variant="link" onClick={handleClick}>
          Create Account
        </Button>
      </Form.Group>
    </Form>
  );
};

export default LoginFormComp;
