import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { AiFillPlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import TableUser from "./TableUser";
import axios from "axios";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModelViewUser"

function ManageUser(props) {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataView, setDataView] = useState({});

  const viewUser = (e) =>{
    setDataView(e)
    setShowViewModal(true)
  }
  
  const updateUser = (e) =>{
    setDataUpdate(e)
    setShowUpdateModal(true);
  }

  useEffect(() => {
      getAPIList();
  }, []);

  const getAPIList = async () => {
    let res = await axios.get("http://localhost:8081/api/v1/participant/all");
    if (res.data.EC === 0) {
      setListUser(res.data.DT);
    }
  };

  return (
    <div className="manage-user">
      <span>ManagerUser</span>
      <div>
        <button
          className="btn-add-user btn btn-primary"
          onClick={() => {
            setShowCreateModal(true);
          }}
        >
          <AiFillPlusCircle /> Add new User
        </button>
      </div>
      <div>
        <ModalCreateUser 
        showCreateModal={showCreateModal} 
        setShowCreateModal={setShowCreateModal} 
        getAPIList = {getAPIList}
        />
      </div>
      <div>
        <ModalViewUser
        dataView = {dataView}
        showViewModal = {showViewModal}
        setShowViewModal = {setShowViewModal}
        />
      </div>
      <div>
        <ModalUpdateUser
        dataUpdate = {dataUpdate}
        setDataUpdate= {setDataUpdate}
        showUpdateModal={showUpdateModal} 
        setShowUpdateModal={setShowUpdateModal} 
        getAPIList = {getAPIList}
        />
      </div>
      <div className="list-user">
        List User
        <TableUser 
        viewUser = {viewUser}
        updateUser={updateUser} 
        listUser = {listUser}
        />
      </div>
    </div>
  );
}

export default ManageUser;
