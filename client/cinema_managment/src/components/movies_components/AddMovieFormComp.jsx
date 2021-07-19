import React, { useState } from "react";
import { Form, Row, Button, Col } from "react-bootstrap";
import InputRowComp from "../general_components/InputRowComp";
import { addMovieToServer } from "../../helpers/webserviceHelpers";
import { stringToArray } from "../../helpers/utils";
import { HasPermission, permissionsTypes } from "../../helpers/authHelpers";
import NotAuthorisedComp from "../main_components/NotAuthorisedComp";

const CONNECTION_PROBLEM_MSG = "Connection problem, try again later.";
const EMPTY_FIELD_MSG = "Please fill all fields.";

const AddMovieFormComp = ({ onFinish }) => {
  const [name, setName] = useState("");
  const [genresOneString, setGenresOneString] = useState("");
  const [image, setImage] = useState("");
  const [premiered, setPremiered] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  if (!HasPermission(permissionsTypes.CREATE_MOVIES)) {
    return <NotAuthorisedComp />;
  }

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "genres":
        setGenresOneString(value);
        break;
      case "image":
        setImage(value);
        break;
      case "premiered":
        setPremiered(value);
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
    if (
      name.length === 0 ||
      genresOneString.length === 0 ||
      image.length === 0 ||
      premiered.length === 0
    ) {
      setErrorMessage(EMPTY_FIELD_MSG);
    } else {
      // preproccess the raw data before uploading it to server
      const genres = stringToArray(genresOneString);
      try {
        addMovieToServer({ name, genres, image, premiered }, () => {
          onFinish();
        });
      } catch (error) {
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
        onChange={handleTextChange}
      />
      <InputRowComp
        head="Genres (seperated by ,)"
        type="text"
        name="genres"
        onChange={handleTextChange}
      />
      <InputRowComp
        head="Image url"
        type="text"
        name="image"
        onChange={handleTextChange}
      />
      <InputRowComp
        head="Premiered date"
        type="date"
        name="premiered"
        onChange={handleTextChange}
      />
      <Form.Text className="text-muted">
        Insert date in mm/dd/yyyy format
      </Form.Text>

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

export default AddMovieFormComp;
