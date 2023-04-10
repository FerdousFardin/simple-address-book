import { useEffect, useState } from "react";
import { Table, Button, Spinner, Form, Row, Col } from "react-bootstrap";
import { deleteContact, getContacts } from "../utility/api_services";
import DeleteConfirmation from "./DeleteConfirmation";

function ContactTable({
  loading,
  setLoading,
  setStatus,
  setToastShow,
  setStatusMsg,
  setIsShow,
  dispatch,
}) {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});
  const [filterByNumFound, setFilterByNumFound] = useState(false);

  useEffect(() => {
    getContacts()
      .then((res) => {
        if (res.data.length > 0) {
          setContacts(res.data);
        } else setContacts([]);
      })
      .finally(() => {
        setLoading(false);
        setFilterByNumFound(false);
      });
  }, [loading]);

  const filterByNumber = (contactNumber) => {
    if (contactNumber !== "") {
      const regex = new RegExp(contactNumber);
      const filtered = contacts.filter((c) => regex.test(c.contactNumber));
      if (filtered.length > 0) {
        setFilterByNumFound(true);
        setFilteredContacts(filtered);
      } else {
        setFilterByNumFound(false);
        setFilteredContacts(contacts);
      }
    } else setFilterByNumFound(false);
  };
  const filterByName = (contactName) => {
    if (contactName !== "") {
      const regex = new RegExp(contactName);
      const filtered = contacts.filter((c) => regex.test(c.contactName));
      if (filtered.length > 0) {
        setFilterByNumFound(true);
        setFilteredContacts(filtered);
      } else {
        setFilterByNumFound(false);
        setFilteredContacts(contacts);
      }
    } else setFilterByNumFound(false);
  };

  const handleEdit = (contact) => {
    Object.keys(contact).forEach((info) =>
      dispatch({ type: "UPDATE_CONTACT", field: info, payload: contact[info] })
    );
    setIsShow(true);
  };

  const handleDelete = (id) => {
    deleteContact(id)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          setLoading(true);
          setToastShow(true);
          setStatus("success");
          setStatusMsg("Deleted contact");
          setDeleteShow(false);
        }
      })
      .catch((err) => {
        setToastShow(true);
        setStatus("error");
        setStatusMsg("Can not delete contact. Reason: " + err.message);
        setDeleteShow(false);
      });
  };

  const handleDeleteModal = (contact) => {
    setSelectedContact(contact);
    setDeleteShow(true);
  };
  return contacts.length > 0 ? (
    <>
      <Row>
        <Col lg={2} md={3} className="m-2">
          <label className="mb-2">Find by:</label>
          <Form
            className="noCounter"
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Group className="d-flex gap-5">
              <Form.Control
                type="text"
                placeholder="Contact Name"
                style={{ width: "150px" }}
                onChange={(event) => filterByName(event.target.value)}
              ></Form.Control>
              <Form.Control
                type="text"
                placeholder="Contact Number"
                style={{ width: "150px" }}
                onChange={(event) => filterByNumber(event.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          {filterByNumFound ? (
            <p className="mx-2 text-success">
              Found {filteredContacts.length} Contact
            </p>
          ) : (
            <p className="mx-2 end">Contacts: {contacts.length}</p>
          )}

          {!loading ? (
            <Table className="table-nowrap" bordered>
              <thead>
                <tr>
                  <th>Contact Name</th>
                  <th>Contact Number</th>
                  <th>Contact Address</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filterByNumFound &&
                  filteredContacts.map((contact) => (
                    <tr key={contact._id}>
                      <td>{contact.contactName}</td>
                      <td>{contact.contactNumber}</td>
                      <td>{contact.contactAddress}</td>
                      <td className="text-center">
                        <Button
                          onClick={() => handleEdit(contact)}
                          className="m-2 md:mx-2"
                          variant="dark"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteModal(contact)}
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                {!filterByNumFound &&
                  contacts
                    .sort((a, b) =>
                      a.contactName > b.contactName
                        ? 1
                        : b.contactName > a.contactName
                        ? -1
                        : 0
                    )
                    .map((contact) => (
                      <tr key={contact._id}>
                        <td>{contact.contactName}</td>
                        <td>{contact.contactNumber}</td>
                        <td>{contact.contactAddress}</td>
                        <td className="text-center">
                          <Button
                            onClick={() => handleEdit(contact)}
                            className="m-2 md:mx-2"
                            variant="dark"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteModal(contact)}
                            variant="danger"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center w-full"
              style={{ height: "60vh" }}
            >
              <Spinner animation="border" role="status" className="text-center">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </Col>
      </Row>
      <DeleteConfirmation
        {...{
          deleteShow,
          setDeleteShow,
          handleDelete,
          contact: selectedContact,
          loading,
        }}
      />
    </>
  ) : (
    <div
      style={{ height: "70vh" }}
      className="d-flex justify-content-center align-items-center w-full"
    >
      <h1 className="text-secondary text-center">No Contacts Found!</h1>
    </div>
  );
}

export default ContactTable;
