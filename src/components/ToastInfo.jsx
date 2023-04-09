import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function ToastInfo({ toastShow, setToastShow, statusMsg, status }) {
  return (
    <ToastContainer className={`p-3`} position="top-end">
      <Toast
        onClose={() => setToastShow(false)}
        show={toastShow}
        delay={2500}
        autohide
        style={{
          width: "180px",
          color: "white",
          backgroundColor: status === "success" ? "#22aa00" : "#cc1100",
        }}
      >
        <Toast.Body>
          {status === "success" ? "✅" : "❌"} {statusMsg}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastInfo;
