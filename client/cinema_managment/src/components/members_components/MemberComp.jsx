import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DataListGroupItemComp from "../general_components/DataListGroupItemComp";
import MoviesWatchedComp from "./MoviesWatchedComp";
import { selectMemberById, doFetchMembersData } from "../../redux/membersSlice";
import { deleteMemberFromServer } from "../../helpers/webserviceHelpers";
import { useHistory } from "react-router-dom";
import { doFetchMoviesData } from "../../redux/moviesSlice";
import { doFetchSubscriptionsData } from "../../redux/subscriptionsSlice";
import useSessionTimeOutLogOut from "../../hooks/useSessionTimeOutLogOut";

const MemberComp = ({ memberId }) => {
  useSessionTimeOutLogOut();

  const member = useSelector(selectMemberById(memberId));
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    switch (e.target.name) {
      case "delete":
        await deleteMemberFromServer(
          memberId,
          async () => {
            dispatch(doFetchMembersData());
            dispatch(doFetchSubscriptionsData());
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
        history.push("/subscriptions/editMember/" + memberId);
        break;
      default:
        break;
    }
  };

  if (!member) {
    return null;
  }
  return (
    <Card
      border="primary"
      style={{ width: "30rem" }}
      className="ms-2 me-2 mb-1 mt-1 "
    >
      <Card.Body>
        <Card.Title>{member.name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <DataListGroupItemComp head="Email" data={member?.email} />
        <DataListGroupItemComp head="City" data={member?.city} />
      </ListGroup>
      <Card.Footer>
        <Button
          variant="warning"
          className="m-1"
          onClick={handleClick}
          name="edit"
        >
          Edit
        </Button>
        <Button
          variant="danger"
          className="m-1"
          onClick={handleClick}
          name="delete"
        >
          Delete
        </Button>
      </Card.Footer>
      <MoviesWatchedComp memberId={memberId} />
    </Card>
  );
};

export default MemberComp;
