import React, { useState } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  doFetchSubscriptionsData,
  selectMoviesWatchedNameIdAndDateByMemberId,
} from "../../redux/subscriptionsSlice";
import ListGroupItemLinkAndTextComp from "../general_components/ListGroupItemLinkAndTextComp";
import SubscribeNewMovieComp from "./SubscribeNewMovieComp";
import { dateToString } from "../../helpers/utils";
import { doFetchMoviesData } from "../../redux/moviesSlice";
import { doFetchMembersData } from "../../redux/membersSlice";

const MoviesWatchedComp = ({ memberId }) => {
  const dispatch = useDispatch();

  const moviesWatched = useSelector(
    selectMoviesWatchedNameIdAndDateByMemberId(memberId),
    shallowEqual
  );
  const [showSubscribeOnNewMovie, setShowSubscribeOnNewMovie] = useState(false);
  const handleButtonClick = () => {
    setShowSubscribeOnNewMovie(!showSubscribeOnNewMovie);
  };

  return (
    <Card border="secondary" className="m-1 p-1">
      <Card.Title>Movies watched</Card.Title>
      <Card.Body>
        <Button size="sm" onClick={handleButtonClick}>
          Subscribe on new movie
        </Button>
        {showSubscribeOnNewMovie ? (
          <SubscribeNewMovieComp
            memberId={memberId}
            onFinish={() => {
              dispatch(doFetchMembersData());
              dispatch(doFetchSubscriptionsData());
              dispatch(doFetchMoviesData());
              setShowSubscribeOnNewMovie(false);
            }}
          />
        ) : null}
      </Card.Body>
      {moviesWatched?.length > 0 ? (
        <ListGroup>
          {moviesWatched?.map((watch, idx) => (
            <ListGroupItemLinkAndTextComp
              key={idx}
              linkText={watch.movieName}
              linkTo={"/movies/allMovies/" + watch.movieName}
              text={dateToString(new Date(watch.date))}
            />
          ))}
        </ListGroup>
      ) : null}
    </Card>
  );
};

export default MoviesWatchedComp;
