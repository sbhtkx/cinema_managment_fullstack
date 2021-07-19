import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteUserFromServers } from "../../helpers/webserviceHelpers";
import useSessionTimeOutLogOut from "../../hooks/useSessionTimeOutLogOut";
import {
  doFetchUsersData,
  doFetchPermissionsData,
} from "../../redux/usersDataSlice";
import DataListGroupItemComp from "../general_components/DataListGroupItemComp";

const selectPermissionsById = (state, id) => {
  const permissions = state.usersAllData.permissionsData.find(
    (permission) => permission.id === id
  );
  return permissions?.permissions;
};

const selectUserById = (state, id) => {
  return state.usersAllData.usersData.find((user) => user.id === id);
};

const UserComp = ({ userId }) => {
  useSessionTimeOutLogOut();
  const history = useHistory();
  const permissionsData = useSelector(
    (state) => selectPermissionsById(state, userId),
    shallowEqual
  );
  const userData = useSelector(
    (state) => selectUserById(state, userId),
    shallowEqual
  );
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    switch (e.target.name) {
      case "delete":
        await deleteUserFromServers(
          userId,
          async () => {
            dispatch(doFetchUsersData());
            dispatch(doFetchPermissionsData());
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
        history.push("/manageUsers/editUser/" + userId);
        break;
      default:
        break;
    }
  };

  return (
    <Card
      border="primary"
      style={{ width: "30rem" }}
      className="ms-2 me-2 mb-1 mt-1"
    >
      <ListGroup className="list-group-flush">
        <DataListGroupItemComp
          head="Name"
          data={userData?.firstName + " " + userData?.lastName}
        />
        <DataListGroupItemComp head="Username" data={userData?.username} />
        <DataListGroupItemComp head="Email" data={userData?.email} />
        <DataListGroupItemComp
          head="Session timeout (minutes)"
          data={userData?.sessionTimeOut}
        />
        <DataListGroupItemComp
          head="Created date"
          data={userData?.createdDate}
        />
        <DataListGroupItemComp
          head="Permissions"
          data={permissionsData?.map((permission, idx) =>
            idx < permissionsData.length - 1
              ? permission + ", "
              : permission + "."
          )}
        />
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
    </Card>
  );
};

export default UserComp;
