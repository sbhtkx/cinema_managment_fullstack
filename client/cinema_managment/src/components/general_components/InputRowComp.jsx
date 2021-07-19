import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

const InputRowComp = (props) => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text>{props.head}:</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        type={props.type}
        placeholder={props.head}
        onChange={props.onChange}
        name={props.name}
        value={props.value}
      />
    </InputGroup>
  );
};

export default InputRowComp;
