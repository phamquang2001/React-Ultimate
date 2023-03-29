import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { AiFillPlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import TableUser from "./TableUser";
import axios from "axios";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModelViewUser"
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate"

function ManageUser(props) {
  const [pageCount, setPageCount] = useState(0)
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataView, setDataView] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [currentPage, setCurrentPage] = useState(1)

  const limit = 3;
  const viewUser = (e) =>{
    setDataView(e)
    setShowViewModal(true)
  }
  
  const updateUser = (e) =>{
    setDataUpdate(e)
    setShowUpdateModal(true);
  }
  const deleteUser = (e) =>{
    setDataDelete(e)
    setShowDeleteModal(true)
  }

  useEffect(() => {
      getUserPaginate(1);
  }, []);

  // const getAPIList = async () => {
  //   let res = await axios.get("https://rr4ruu-8000.csb.app/DT");
  //   if (res.data.EC === 0) {
  //     setListUser(res.data);
  //   }
  // };

  const getUserPaginate = async ( page) => {
    let res = await axios.get(`http://localhost:8081/api/v1/participant?page=${page}&limit=${limit}`);
    console.log(res.data.DT)
      setListUser(res.data.DT.users);
      setPageCount(res.data.DT.totalPages)
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
      {/* ModalCreateUser */}
      <div>
        <ModalCreateUser 
        showCreateModal={showCreateModal} 
        setShowCreateModal={setShowCreateModal} 
        // getAPIList = {getAPIList}
        getUserPaginate = {getUserPaginate}
        />
      </div>
      {/* ModalViewUser */}
      <div>
        <ModalViewUser
        dataView = {dataView}
        showViewModal = {showViewModal}
        setShowViewModal = {setShowViewModal}
        getUserPaginate = {getUserPaginate}
        />
      </div>
      {/* ModalUpdateUser */}
      <div>
        <ModalUpdateUser
        dataUpdate = {dataUpdate}
        setDataUpdate= {setDataUpdate}
        showUpdateModal={showUpdateModal} 
        setShowUpdateModal={setShowUpdateModal} 
        // getAPIList = {getAPIList}
        getUserPaginate = {getUserPaginate}
        currentPage = {currentPage}
        setCurrentPage = {setCurrentPage}
        />
      </div>
      {/* ModalDeleteUser */}
      <div>
        <ModalDeleteUser
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        dataDelete = {dataDelete}
        // getAPIList = {getAPIList}
        getUserPaginate = {getUserPaginate}
        currentPage = {currentPage}
        setCurrentPage = {setCurrentPage}
        />
      </div>
      <div className="list-user">
        List User
        <TableUserPaginate
        viewUser = {viewUser}
        updateUser={updateUser} 
        deleteUser = {deleteUser}
        listUser = {listUser}
        pageCount = {pageCount}
        getUserPaginate = {getUserPaginate}
        currentPage = {currentPage}
        setCurrentPage = {setCurrentPage}
        />
      </div>
    </div>
  );
}

export default ManageUser;
