import React, { useEffect, useState } from "react";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import UserListComp from "../components/users_components/UserListComp";
import AddUserFormComp from "../components/users_components/AddUserFormComp";
import EditUserFormComp from "../components/users_components/EditUserFormComp";
import {
  doFetchPermissionsData,
  doFetchUsersData,
} from "../redux/usersDataSlice";
import { useDispatch } from "react-redux";

export const ManageUsersPage = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const ALL_USERS = "ALL_USERS";
  const ADD_USER = "ADD_USER";
  const EDIT_USER = "EDIT_USER";
  const [contentState, setContentState] = useState(ALL_USERS);

  const INITIAL_PATH = "/manageUsers";
  const ALL_USERS_PATH = "/manageUsers/allUsers";
  const ADD_USER_PATH = "/manageUsers/addUser";
  const EDIT_USER_PATH = "/manageUsers/editUser/";

  useEffect(() => {
    if (location.pathname === INITIAL_PATH) {
      history.push(ALL_USERS_PATH);
    } else if (history.location.pathname === ALL_USERS_PATH) {
      setContentState(ALL_USERS);
    } else if (history.location.pathname === ADD_USER_PATH) {
      setContentState(ADD_USER);
    } else if (history.location.pathname.startsWith(EDIT_USER_PATH)) {
      setContentState(EDIT_USER);
    }
  }, [location, history]);

  const onFinish = () => {
    dispatch(doFetchUsersData());
    dispatch(doFetchPermissionsData());
    setContentState(ALL_USERS);
  };

  let heading = null;
  let content = null;
  switch (contentState) {
    case ALL_USERS:
      content = <UserListComp />;
      break;
    case ADD_USER:
      heading = <h4>Add New User</h4>;
      content = <AddUserFormComp onFinish={onFinish} />;
      break;
    case EDIT_USER:
      heading = <h4>Edit User</h4>;
      content = <EditUserFormComp onFinish={onFinish} />;
      break;
    default:
      break;
  }

  return (
    <div>
      <h2>Users</h2>
      <Row>
        <Col>
          <ButtonGroup size="lg" aria-label="Basic example">
            <Button
              variant="primary"
              onClick={() => {
                history.push(ALL_USERS_PATH);
                setContentState(ALL_USERS);
              }}
            >
              All users
            </Button>
            <Button
              variant="success"
              onClick={() => {
                history.push(ADD_USER_PATH);
                setContentState(ADD_USER);
              }}
            >
              Add user
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

export default ManageUsersPage;
