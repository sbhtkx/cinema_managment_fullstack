import React from "react";
import { ListGroupItem } from "react-bootstrap";

const DataListGroupItemComp = (props) => {
  // return (
  //   <InputGroup className="p-3">
  //     <InputGroup.Prepend>
  //       <InputGroup.Text>{props.head}:</InputGroup.Text>
  //     </InputGroup.Prepend>
  //     <FormControl readOnly value={props.data} />
  //   </InputGroup>
  // );
  return (
    <ListGroupItem>
      <span className="fw-bold">{props.head}: </span>
      {props.data}
    </ListGroupItem>
  );
};

export default DataListGroupItemComp;
