import React, { useEffect } from "react";
import { CardColumns, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  doFetchUsersData,
  doFetchPermissionsData,
} from "../../redux/usersDataSlice";
import UserComp from "./UserComp";

const UserListComp = () => {
  const usersData = useSelector((state) => state.usersAllData.usersData);
  const usersDataLoading = useSelector(
    (state) => state.usersAllData.usersDataLoading
  );
  const usersDataError = useSelector(
    (state) => state.usersAllData.usersDataError
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch new data only if don't have yet.
    // On update a request to fetch data will be sent, but not from here
    if (usersData?.length < 1) {
      dispatch(doFetchUsersData());
      dispatch(doFetchPermissionsData());
    }
  }, [dispatch, usersData]); // TODO: not sure if it is ok and efficient, example: https://medium.com/personal-project/fetching-an-api-using-redux-and-useeffect-f23813a863f5

  let content = <Spinner animation="grow" className="m-3" />;
  if (usersDataLoading) {
    if (usersData?.length < 1) {
      content = <Spinner animation="border" className="m-3" />;
    }
  } else if (usersData?.length > 0) {
    const cardsArr = usersData.map((user) => {
      return <UserComp key={user.id} userId={user.id} />;
    });
    content = <CardColumns>{cardsArr}</CardColumns>;
  } else if (usersDataError) {
    content = (
      <h3 style={{ color: "red" }}>
        {usersDataError + ". Please try again later."}
      </h3>
    );
  }

  return content;
};

export default UserListComp;
