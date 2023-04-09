import AddContact from "./components/AddContact";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ContactTable from "./components/ContactTable";
import { useReducer, useState } from "react";
import ContactDetailsModal from "./components/ContactDetailsModal";
import { contactReducer, initialContactState } from "./utility/contactReducer";
import ToastInfo from "./components/ToastInfo";

function App() {
  const [isShow, setIsShow] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [status, setStatus] = useState("success");
  const [state, dispatch] = useReducer(contactReducer, initialContactState);

  return (
    <Container className="p-4">
      <AddContact setIsShow={setIsShow} />
      <br />
      <Row>
        <Col>
          <ContactTable
            {...{
              loading,
              setLoading,
              setStatus,
              setStatusMsg,
              setToastShow,
              setIsShow,
              dispatch,
            }}
          />
        </Col>
      </Row>
      <ContactDetailsModal
        isShow={isShow}
        setIsShow={setIsShow}
        customerState={state}
        dispatch={dispatch}
        setStatusMsg={setStatusMsg}
        setStatus={setStatus}
        setToastShow={setToastShow}
        setLoading={setLoading}
        loading={loading}
      />
      <ToastInfo {...{ toastShow, setToastShow, statusMsg, status }} />
    </Container>
  );
}

export default App;
