import React, { useState } from "react";
import { Card, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { addWatchToServer } from "../../helpers/webserviceHelpers";
import { selectMoviesNotWatchedNameAndIdByMemberId } from "../../redux/subscriptionsSlice";

const CONNECTION_PROBLEM_MSG = "Connection problem, try again later.";
const EMPTY_FIELD_MSG = "Please fill all fields.";

const SubscribeNewMovieComp = ({ memberId, onFinish }) => {
  const moviesNotWatched = useSelector(
    selectMoviesNotWatchedNameAndIdByMemberId(memberId),
    shallowEqual
  );

  const [date, setDate] = useState("");
  const [movieId, setMovieId] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const options = moviesNotWatched.map((movie) => {
    // TODO: maybe change key

    return (
      <option key={movie.id} value={movie.id}>
        {movie.name}
      </option>
    );
  });

  const onDateChange = (e) => {
    setDate(e.target.value);
  };
  const onSelectChange = (e) => {
    console.log("e77");
    console.log(e.target);
    console.log(e.target.value);
    setMovieId(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!movieId || !date) {
      setErrorMessage(EMPTY_FIELD_MSG);
    } else {
      try {
        addWatchToServer(memberId, movieId, date, onFinish, () => {
          console.log("BAD");
          console.log(e.target.value);
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
    <Card border="primary" className="m-1 p-1">
      <Card.Title>Add a new movie:</Card.Title>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            {/* <InputGroup.Prepend> */}
            <Form.Control as="select" onChange={onSelectChange}>
              <option value="">Choose movie</option>
              {options}
            </Form.Control>
            {/* </InputGroup.Prepend> */}
            <FormControl type="date" onChange={onDateChange} name="date" />
          </InputGroup>
          {errorHelper ? errorHelper : <br />}
          <Button type="submit" size="sm">
            Subscribe
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SubscribeNewMovieComp;
