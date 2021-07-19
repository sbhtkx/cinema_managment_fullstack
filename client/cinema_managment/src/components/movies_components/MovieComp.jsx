import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SubscriptionWatchedComp from "./SubscriptionWatchedComp";
import { selectMovieById, doFetchMoviesData } from "../../redux/moviesSlice";
import { deleteMovieFromServer } from "../../helpers/webserviceHelpers";
import { useHistory } from "react-router-dom";
import { HasPermission, permissionsTypes } from "../../helpers/authHelpers";
import useSessionTimeOutLogOut from "../../hooks/useSessionTimeOutLogOut";

const MovieComp = ({ movieId }) => {
  useSessionTimeOutLogOut();

  const movie = useSelector(selectMovieById(movieId));
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    switch (e.target.name) {
      case "delete":
        await deleteMovieFromServer(
          movieId,
          async () => {
            dispatch(doFetchMoviesData());
          },
          (err) => {
            //TODO: maybe show the message in a different way
            alert(
              "A problem raised while trying to delete, please try again later. err: " +
                err
            );
            console.log(err);
          }
        );
        break;

      case "edit":
        history.push("/movies/editMovie/" + movieId);
        break;
      default:
        break;
    }
  };
  if (!movie) {
    return null;
  }
  return (
    <Card
      border="primary"
      style={{ width: "30rem" }}
      className="ms-2 me-2 mb-1 mt-1"
    >
      <Card.Body>
        <Card.Title>
          {movie.name}, {movie.premiered}
        </Card.Title>
        <Card.Text>
          <span className="fw-bold">Genres: </span>
          {movie.genres?.map((genre, idx) =>
            idx < movie.genres.length - 1 ? genre + ", " : genre + "."
          )}
        </Card.Text>
      </Card.Body>
      <Row>
        <Col xs={4} className="">
          <Card.Img
            className="m-1 rounded"
            style={{ height: "10" }}
            src={movie.image}
          />
        </Col>
        <Col xs={7} className="">
          <SubscriptionWatchedComp movieId={movieId} watches={movie.watches} />
        </Col>
      </Row>
      <Card.Footer className="border-top border-primary">
        {HasPermission(permissionsTypes.UPDATE_MOVIES) ? (
          <Button
            variant="warning"
            className="m-1"
            name="edit"
            onClick={handleClick}
          >
            Edit
          </Button>
        ) : null}
        {HasPermission(permissionsTypes.DELETE_MOVIES) ? (
          <Button
            variant="danger"
            className="m-1"
            name="delete"
            onClick={handleClick}
          >
            Delete
          </Button>
        ) : null}
      </Card.Footer>
    </Card>
  );
};

export default MovieComp;
