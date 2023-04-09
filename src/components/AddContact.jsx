import { useState } from "react";
import { Button, Row } from "react-bootstrap";

const AddContact = ({ setIsShow }) => {
  return (
    <>
      <Row>
        <Button
          onClick={() => setIsShow(true)}
          style={{ textAlign: "center", lineHeight: "50px" }}
        >
          <strong className="fs-3">+</strong>
          <span className="fs-4">Add a contact</span>
        </Button>
      </Row>
    </>
  );
};

export default AddContact;
