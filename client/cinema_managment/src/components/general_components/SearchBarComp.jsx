import React, { useEffect, useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

const SearchBarComp = ({ value, setValue }) => {
  const [tmpValue, setTmpValue] = useState("");

  useEffect(() => {
    setTmpValue(value);
  }, [value]);

  return (
    <InputGroup className="">
      <FormControl
        placeholder="Find movie..."
        value={tmpValue}
        onChange={(e) => setTmpValue(e.target.value)}
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={() => setValue(tmpValue)}>
          Find
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default SearchBarComp;
