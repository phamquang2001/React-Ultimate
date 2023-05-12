import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DisplayResult(props) {
  const {show, setShow, resultQuiz} = props;
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal 
      show={show} 
      onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                Count Correct: {resultQuiz.countCorrect}
            </div>
            <div>
                Count Total: {resultQuiz.countTotal}
            </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Show Result
          </Button>
          <Button variant="primary" onClick={handleClose}
          autoFocus
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DisplayResult