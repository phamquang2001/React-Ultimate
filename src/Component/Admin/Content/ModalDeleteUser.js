import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function ModalDeleteUser(props) {
  const {showDeleteModal, setShowDeleteModal, dataDelete} = props;

  const handleClose = () => setShowDeleteModal(false);

  const hanldeDeleteUser = async () =>{
    // const = data : {id: dataDelete.id}
    setShowDeleteModal(false)
    await axios.delete(`https://rr4ruu-8000.csb.app/DT/${dataDelete.id}`)
    
    props.getUserPaginate(1)
    props.setCurrentPage(1)
  }
  return (
    <>
      <Modal 
      show={showDeleteModal} 
      onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure? 
            <br/>
            Delete User: {dataDelete.email}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={hanldeDeleteUser}
          autoFocus
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser