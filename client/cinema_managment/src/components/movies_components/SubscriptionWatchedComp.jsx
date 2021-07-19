import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { dateToString } from "../../helpers/utils";
import { selectWatchesByMovieIdWithMemberNames } from "../../redux/subscriptionsSlice";
import ListGroupItemLinkAndTextComp from "../general_components/ListGroupItemLinkAndTextComp";

const SubscriptionWatchedComp = ({ movieId }) => {
  const watches = useSelector(
    selectWatchesByMovieIdWithMemberNames(movieId),
    shallowEqual
  );
  const content = watches.map((watch, idx) => (
    <ListGroupItemLinkAndTextComp
      key={idx}
      linkText={watch.memberName}
      linkTo={"/subscriptions/allMembers/" + watch.memberId}
      text={dateToString(new Date(watch.date))}
    />
  ));
  return (
    <Card border="primary" className="m-1 p-1">
      <Card.Title>Subscriptions watched</Card.Title>
      <ListGroup>{content}</ListGroup>
    </Card>
  );
};

export default SubscriptionWatchedComp;
