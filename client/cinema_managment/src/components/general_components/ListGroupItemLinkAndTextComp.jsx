import React from "react";
import { Button, ListGroupItem } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ListGroupItemLinkAndTextComp = (props) => {
  const history = useHistory();

  return (
    <ListGroupItem>
      <Button variant="link" onClick={() => history.push(props.linkTo)}>
        {props.linkText},
      </Button>{" "}
      {props.text}
    </ListGroupItem>
  );
};

export default ListGroupItemLinkAndTextComp;
