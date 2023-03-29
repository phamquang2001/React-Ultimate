import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from 'axios'
import { toast } from "react-toastify";

const ModalCreateUser = (props) => {
  const {showCreateModal, setShowCreateModal, getAPIList} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('USER');
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  
  const handleClose = () => {
    setShowCreateModal(false);
    setEmail('')
    setUsername('')
    setPassword('')
    setRole('USER')
    setPreviewImage('')
    setImage('')
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleAddUser = async () => {

    const isValid = validateEmail(email)
    if(!isValid){
      toast.error("Nhap lai email");
      return;
    }
    else if(!password){
      toast.error("Nhap lai mat khau");
      return;
    }
    else {
      toast.success("Thanh cong");
      handleClose();
      
    }
    const form = new FormData();
    form.append('email', email);
    form.append('password', password);
    form.append('username', username);
    form.append('role', role);
    form.append('userImage', image);
    await axios.post('http://localhost:8081/api/v1/participant', form)
    
    // getAPIList();
    props.getUserPaginate(1)
  }


  

  const handleUpdateImage = (e) =>{
    if(e.target.files[0] && e.target && e.target.files){
      const objectUrl = URL.createObjectURL(e.target.files[0]) 
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
      setPreviewImage(objectUrl)
    }else {
      setPreviewImage('')
    }
  }

  console.log(image)


  return (
    <>
      <Modal 
      show={showCreateModal} 
      onHide={handleClose}
      size='xl'
      backdrop='static'
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} >
                <Form.Label>Email</Form.Label>
                <Form.Control 
                type="email" 
                placeholder="Enter email" 
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
                defaultValue="Choose..." 
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

export default ModalCreateUser;
