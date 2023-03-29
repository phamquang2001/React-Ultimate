import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from 'axios'
import { toast } from "react-toastify";

const ModalUpdateUser = (props) => {
  const {showUpdateModal, 
    setShowUpdateModal, 
    dataUpdate, 
    setDataUpdate, 
    currentPage
    } = props;

  
  const handleClose = () => {
    setShowUpdateModal(false);
    setDataUpdate({})
  }
  const handleAddUser = async () => {
    toast.success("Thanh cong");
    handleClose();

    const id = dataUpdate.id
    await axios.put(`https://rr4ruu-8000.csb.app/DT/${id}`, {email,username,role,image})
    props.getUserPaginate(currentPage)
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('USER');
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() =>{
    setEmail(dataUpdate.email)
    setPassword(dataUpdate.password)
    setUsername(dataUpdate.username)
    setRole(dataUpdate.role)
    if(dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
    }
  }, [dataUpdate])

  const handleUpdateImage = (e) =>{
    if(e.target.files[0] && e.target && e.target.files){
      const objectUrl = URL.createObjectURL(e.target.files[0]) 
      setPreviewImage(objectUrl)
      setImage(e.target.files[0])
    }else {
      setPreviewImage('')
    }
  }


  return (
    <>
      <Modal 
      show={showUpdateModal} 
      onHide={handleClose}
      size='xl'
      backdrop='static'
      >
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} >
                <Form.Label>Email</Form.Label>
                <Form.Control 
                type="email" 
                placeholder="Enter email" 
                disabled
                value={email}
                onChange={(e)=>{
                  setEmail(e.target.value)
                }}
                />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Password" 
                disabled
                value={password}
                onChange={(e)=>{
                  setPassword(e.target.value)
                }}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" >
              <Form.Label>Username</Form.Label>
              <Form.Control 
              placeholder="Username" 
              value={username}
                onChange={(e)=>{
                  setUsername(e.target.value)
                }}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Role</Form.Label>
                <Form.Select 
                // defaultValue="Choose..." 
                value={role}
                onChange={(e) =>{
                  setRole(e.target.value)
                }}>
                  <option value='USER'>User</option>
                  <option value='ADMIN'>Admin</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" >
              <Form.Label 
              className="update-image"
              htmlFor="update-file-image"
              >
                <AiFillPlusCircle color="green"/>
                Update file image
              </Form.Label>
              <input type='file' hidden id="update-file-image"
              onChange={e =>{
                handleUpdateImage(e)
              }}
              />
            </Form.Group>
            <div className="preview-image">
              {previewImage ? 
                <img src={previewImage}></img> : 
                <span>Preview Image</span>
              }
              
              
            </div>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleAddUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
