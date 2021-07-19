import React, { useEffect, useState } from "react";
import { CardColumns, Spinner, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { doFetchMembersData, statusEnum } from "../../redux/membersSlice";
import { doFetchMoviesData } from "../../redux/moviesSlice";
import { doFetchSubscriptionsData } from "../../redux/subscriptionsSlice";
import MemberComp from "./MemberComp";

const MemberListComp = () => {
  const membersStatus = useSelector((state) => state.members.status);
  const members = useSelector((state) => state.members.membersData);
  const [content, setContent] = useState(
    <Spinner animation="grow" className="m-3" />
  );
  const dispatch = useDispatch();
  const { id: chosenMemberId } = useParams();

  useEffect(() => {
    // Fetch new data only if don't have yet.
    // On update a request to fetch data will be sent, but not from here
    if (members?.length < 1) {
      dispatch(doFetchMembersData());
      dispatch(doFetchSubscriptionsData());
      dispatch(doFetchMoviesData());
    }
  }, [dispatch, members]);

  useEffect(() => {
    switch (membersStatus) {
      case statusEnum.SUCCEEDED:
        if (chosenMemberId) {
          setContent(
            <MemberComp key={chosenMemberId} memberId={chosenMemberId} />
          );
        } else {
          setContent(
            <CardColumns className="">
              {members.map((member) => {
                return <MemberComp key={member._id} memberId={member._id} />;
              })}
            </CardColumns>
          );
        }
        break;
      case statusEnum.LOADING:
        if (members?.length < 1) {
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
  }, [members, membersStatus, chosenMemberId]);

  return content;
};

export default MemberListComp;
