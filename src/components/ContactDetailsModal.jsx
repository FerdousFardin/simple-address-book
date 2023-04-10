import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

import { addContacts } from "../utility/api_services";

function ContactDetailsModal({
  isShow,
  setIsShow,
  customerState,
  dispatch,
  setToastShow,
  setStatusMsg,
  setStatus,
  setLoading,
  loading,
}) {
  const handleClose = () => {
    setIsShow(false);
    dispatch({ type: "RESET" });
  };

  const contactSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    addContacts(customerState)
      .then((res) => {
        if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
          setToastShow(true);
          res.data.upsertedCount > 0 && setStatusMsg("Added new contact");
          res.data.modifiedCount > 0 && setStatusMsg("Updated a contact");
          setStatus("success");
          setIsShow(false);
          dispatch({ type: "RESET" });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateContactState = (e) => {
    dispatch({
      type: "UPDATE_CONTACT",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  return (
    <Modal
      show={isShow}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Form onSubmit={contactSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add/ Edit a Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label className="fw-bold">Contact Name</Form.Label>
          <Form.Control
            as="input"
            name="contactName"
            required
            defaultValue={
              customerState && customerState.contactNumber
                ? customerState.contactName
                : ""
            }
            onChange={updateContactState}
            placeholder="Please enter a name"
          />
          <br />
          <Form.Label className="fw-bold">Contact Number</Form.Label>
          <Form.Control
            as="input"
            type="tel"
            name="contactNumber"
            required
            defaultValue={
              customerState && customerState.contactNumber
                ? customerState.contactNumber
                : ""
            }
            onChange={updateContactState}
            placeholder="Please enter a valid contact number"
          />
          <br />
          <Form.Label className="fw-bold">Contact Address</Form.Label>
          <Form.Control
            as="input"
            name="contactAddress"
            required
            defaultValue={
              customerState && customerState.contactAddress
                ? customerState.contactAddress
                : ""
            }
            onChange={updateContactState}
            placeholder="Please enter a valid address"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={loading} variant="primary" type="submit">
            Add
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ContactDetailsModal;
