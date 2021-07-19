import React, { useEffect, useState } from "react";
import { CardColumns, Col, Row, Spinner, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MovieComp from "./MovieComp";
import SearchBarComp from "../general_components/SearchBarComp";
import {
  doFetchMoviesData,
  selectMoviesIdsAndNames,
  statusEnum,
} from "../../redux/moviesSlice";
import { doFetchSubscriptionsData } from "../../redux/subscriptionsSlice";
import { doFetchMembersData } from "../../redux/membersSlice";

// const PAGE_LENGTH = 5;

const MovieListComp = ({ filter }) => {
  const moviesIdsAndNames = useSelector(selectMoviesIdsAndNames);
  const moviesStatus = useSelector((state) => state.movies.status);

  const [nameFilter, setNameFilter] = useState("");
  const [content, setContent] = useState(
    <Spinner animation="grow" className="m-3" />
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch new data only if don't have yet.
    // On update a request to fetch data will be sent, but not from here
    if (moviesIdsAndNames?.length < 1) {
      dispatch(doFetchMoviesData());
      dispatch(doFetchSubscriptionsData());
      dispatch(doFetchMembersData());
    }
  }, [dispatch, moviesIdsAndNames]); // TODO: not sure if it is ok and efficient, example: https://medium.com/personal-project/fetching-an-api-using-redux-and-useeffect-f23813a863f5

  useEffect(() => {
    switch (moviesStatus) {
      case statusEnum.SUCCEEDED:
        const content = (
          <CardColumns className="">
            {moviesIdsAndNames
              ?.filter((movie) => {
                return movie.name
                  ?.toLowerCase()
                  .includes(nameFilter?.toLowerCase());
              })
              ?.map((movie) => {
                return <MovieComp key={movie.id} movieId={movie.id} />;
              })}
          </CardColumns>
        );
        setContent(content);
        break;
      case statusEnum.LOADING:
        console.log("loading");
        if (moviesIdsAndNames.length < 1) {
          setContent(<Spinner animation="border" className="m-3" />);
        }
        break;
      case statusEnum.FAILED:
        setContent(
          <Form.Text className="text-danger">
            Connection problem, try again later.
          </Form.Text>
        );
        break;
      default:
        break;
    }
  }, [nameFilter, moviesIdsAndNames, moviesStatus]);

  useEffect(() => setNameFilter(filter), [filter]);

  return (
    <div>
      <Row className="">
        <Col className="">
          <SearchBarComp value={nameFilter} setValue={setNameFilter} />
        </Col>
      </Row>
      <Row className="">
        <Col className="">{content}</Col>
      </Row>
    </div>
  );
};

export default MovieListComp;
