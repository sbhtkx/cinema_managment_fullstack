import React, { useEffect, useState } from "react";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import MovieListComp from "../components/movies_components/MovieListComp";
import AddMovieFormComp from "../components/movies_components/AddMovieFormComp";
import EditMovieFormComp from "../components/movies_components/EditMovieFormComp";
import { useParams } from "react-router-dom";
import { HasPermission, permissionsTypes } from "../helpers/authHelpers";
import NotAuthorisedComp from "../components/main_components/NotAuthorisedComp";
import { useDispatch } from "react-redux";
import { doFetchMoviesData } from "../redux/moviesSlice";
import { doFetchSubscriptionsData } from "../redux/subscriptionsSlice";
import { doFetchMembersData } from "../redux/membersSlice";

export const MoviesPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { filter } = useParams();
  const dispatch = useDispatch();

  const ALL_MOVIES = "ALL_MOVIES";
  const ADD_MOVIE = "ADD_MOVIE";
  const EDIT_MOVIE = "EDIT_MOVIE";
  const [contentState, setContentState] = useState(ALL_MOVIES);

  const INITIAL_PATH = "/movies";
  const ALL_MOVIES_PATH = "/movies/allMovies";
  const ADD_MOVIE_PATH = "/movies/addMovie";
  const EDIT_MOVIE_PATH = "/movies/editMovie";

  const onFinish = () => {
    dispatch(doFetchMoviesData());
    dispatch(doFetchSubscriptionsData());
    dispatch(doFetchMembersData());
    setContentState(ALL_MOVIES);
  };

  useEffect(() => {
    if (location.pathname === INITIAL_PATH) {
      history.push(ALL_MOVIES_PATH);
    } else if (history.location.pathname === ALL_MOVIES_PATH) {
      setContentState(ALL_MOVIES);
    } else if (history.location.pathname === ADD_MOVIE_PATH) {
      setContentState(ADD_MOVIE);
    } else if (history.location.pathname.startsWith(EDIT_MOVIE_PATH)) {
      setContentState(EDIT_MOVIE);
    }
  }, [location, history]);

  if (!HasPermission(permissionsTypes.VIEW_MOVIES)) {
    return <NotAuthorisedComp />;
  }

  let heading = null;
  let content = null;
  switch (contentState) {
    case ALL_MOVIES:
      //TODO:
      content = <MovieListComp filter={filter ? filter : ""} />;
      break;
    case ADD_MOVIE:
      heading = <h4>Add New Movie</h4>;
      content = <AddMovieFormComp onFinish={onFinish} />;
      break;
    case EDIT_MOVIE:
      heading = <h4>Edit Movie</h4>;
      content = <EditMovieFormComp onFinish={onFinish} />;
      break;
    default:
      break;
  }

  return (
    <div>
      <h2>Movies</h2>
      <Row>
        <Col>
          <ButtonGroup size="lg" aria-label="Basic example">
            <Button
              variant="primary"
              onClick={() => {
                history.push(ALL_MOVIES_PATH);
                setContentState(ALL_MOVIES);
              }}
            >
              All movies
            </Button>
            <Button
              variant="success"
              onClick={() => {
                history.push(ADD_MOVIE_PATH);
                setContentState(ADD_MOVIE);
              }}
            >
              Add movie
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="m-2">
        <Col></Col>
        <Col xs={11} sm={10} md={7} lg={5}>
          {heading}
          {content}
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};

export default MoviesPage;
