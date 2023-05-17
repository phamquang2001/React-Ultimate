import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";

function ModalDeleteQuiz(props) {
  const access_token = useSelector((state) => state.user.account.access_token);
  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };
  const { dataQuizDelete, handleClose, showDeleteQuiz, setShowDeleteQuiz, fetchListQuiz } =
    props;
  const fetchDeleteDataQuiz = async () => {
    const res = await axios.delete(
      `http://localhost:8081/api/v1/quiz/${dataQuizDelete.id}`,
      config
    );
    console.log(res);
    setShowDeleteQuiz(false);
    fetchListQuiz()
  };

  return (
    <>
      <Modal show={showDeleteQuiz} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure?
          <br />
          Delete Quiz: {dataQuizDelete.name}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={fetchDeleteDataQuiz} autoFocus>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteQuiz;
