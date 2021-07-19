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

const PAGE_LENGTH = 5;
const PAGE_HEIGHT = 1300;

const MovieListComp = ({ filter }) => {
  const moviesIdsAndNames = useSelector(selectMoviesIdsAndNames);
  const moviesStatus = useSelector((state) => state.movies.status);

  const [nameFilter, setNameFilter] = useState("");
  const [content, setContent] = useState(
    <Spinner animation="grow" className="m-3" />
  );
  const [lastStop, setLastStop] = useState(0);
  const [moviesToDisplay, setMoviesToDisplay] = useState([]);
  const [moviesFiltered, setMoviesFiltered] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => setNameFilter(filter), [filter]);

  useEffect(() => {
    // Fetch new data only if don't have the data yet.
    // And on every update a request to fetch data will be sent, but not from here.
    if (moviesIdsAndNames?.length < 1) {
      dispatch(doFetchMoviesData());
      dispatch(doFetchSubscriptionsData());
      dispatch(doFetchMembersData());
    }
  }, [dispatch, moviesIdsAndNames]);

  // If a change accured in movies store or in the filter:
  // reset the size of the page (lastStop) and moviesFiltered
  useEffect(() => {
    setLastStop(0);
    setMoviesFiltered(
      moviesIdsAndNames?.filter((movie) => {
        return movie.name?.toLowerCase().includes(nameFilter?.toLowerCase());
      })
    );
  }, [nameFilter, moviesIdsAndNames]);

  // Initialise moviesToDisplay when moviesFiltered has changed
  useEffect(() => {
    setMoviesToDisplay([...moviesFiltered?.slice(0, PAGE_LENGTH)]);
  }, [moviesFiltered]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      if (
        scrollTop > lastStop + PAGE_HEIGHT &&
        moviesFiltered.length > moviesToDisplay.length
      ) {
        setLastStop(scrollTop);
        setMoviesToDisplay((prevMoviesToDisplay) => {
          return [
            ...prevMoviesToDisplay,
            ...moviesFiltered.slice(
              prevMoviesToDisplay.length,
              prevMoviesToDisplay.length + PAGE_LENGTH
            ),
          ];
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastStop, moviesFiltered, moviesToDisplay]);

  useEffect(() => {
    switch (moviesStatus) {
      case statusEnum.SUCCEEDED:
        const content = (
          <CardColumns>
            {moviesToDisplay?.map((movie) => {
              return <MovieComp key={movie.id} movieId={movie.id} />;
            })}
          </CardColumns>
        );
        setContent(content);
        break;
      case statusEnum.LOADING:
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
  }, [nameFilter, moviesIdsAndNames, moviesStatus, moviesToDisplay]);

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
