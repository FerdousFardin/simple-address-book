import { Modal, Button } from "react-bootstrap";

function DeleteConfirmation({
  deleteShow,
  handleDelete,
  setDeleteShow,
  contact,
  loading,
}) {
  const hideModal = () => {
    setDeleteShow(false);
  };
  return (
    <Modal show={deleteShow} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-danger">
          <p className="mb-2"> Are you sure you want to delete this contact:</p>
          Contact Name: {contact ? contact.contactName : ""}
          <br />
          Contact Number: {contact ? contact.contactNumber : ""}
          <br />
          <p className="mt-2 fw-bold">This action can not be reversed!</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          variant="danger"
          onClick={() => handleDelete(contact._id)}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmation;
