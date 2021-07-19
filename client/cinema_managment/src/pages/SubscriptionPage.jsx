import React, { useEffect, useState } from "react";
import { Row, Col, ButtonGroup, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import MemberListComp from "../components/members_components/MemberListComp";
import AddMemberFormComp from "../components/members_components/AddMemberFormComp";
import EditMemberFormComp from "../components/members_components/EditMemberFormComp";
import { HasPermission, permissionsTypes } from "../helpers/authHelpers";
import NotAuthorisedComp from "../components/main_components/NotAuthorisedComp";
import { useDispatch } from "react-redux";
import { doFetchMembersData } from "../redux/membersSlice";
import { doFetchSubscriptionsData } from "../redux/subscriptionsSlice";
import { doFetchMoviesData } from "../redux/moviesSlice";

export const SubscriptionPage = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const ALL_MEMBERS = "ALL_MEMBERS";
  const ONE_MEMBER = "ONE_MEMBER";
  const ADD_MEMBER = "ADD_MEMBER";
  const EDIT_MEMBER = "EDIT_MEMBER";
  const [contentState, setContentState] = useState(ALL_MEMBERS);

  const INITIAL_PATH = "/subscriptions";
  const ALL_MEMBERS_PATH = "/subscriptions/allMembers";
  const ADD_MEMBER_PATH = "/subscriptions/addMember";
  const EDIT_MEMBER_PATH = "/subscriptions/editMember";

  const onFinish = () => {
    dispatch(doFetchMembersData());
    dispatch(doFetchSubscriptionsData());
    dispatch(doFetchMoviesData());
    setContentState(ALL_MEMBERS);
  };

  useEffect(() => {
    if (location.pathname === INITIAL_PATH) {
      history.push(ALL_MEMBERS_PATH);
    } else if (history.location.pathname === ALL_MEMBERS_PATH) {
      setContentState(ALL_MEMBERS);
    } else if (history.location.pathname === ADD_MEMBER_PATH) {
      setContentState(ADD_MEMBER);
    } else if (history.location.pathname.startsWith(EDIT_MEMBER_PATH)) {
      setContentState(EDIT_MEMBER);
    }
  }, [location, history]);

  if (!HasPermission(permissionsTypes.VIEW_SUBS)) {
    return <NotAuthorisedComp />;
  }

  let heading = null;
  let content = null;
  switch (contentState) {
    case ONE_MEMBER:
      break;
    case ALL_MEMBERS:
      content = <MemberListComp />;
      break;
    case ADD_MEMBER:
      heading = <h4>Add New Member</h4>;
      content = <AddMemberFormComp onFinish={onFinish} />;
      break;
    case EDIT_MEMBER:
      heading = <h4>Edit Member</h4>;
      content = <EditMemberFormComp onFinish={onFinish} />;
      break;
    default:
      break;
  }

  return (
    <div>
      <h2>Members</h2>
      <Row>
        <Col>
          <ButtonGroup size="lg" aria-label="Basic example">
            <Button
              variant="primary"
              onClick={() => {
                history.push(ALL_MEMBERS_PATH);
                setContentState(ALL_MEMBERS);
              }}
            >
              All members
            </Button>
            <Button
              variant="success"
              onClick={() => {
                history.push(ADD_MEMBER_PATH);
                setContentState(ADD_MEMBER);
              }}
            >
              Add member
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

export default SubscriptionPage;
