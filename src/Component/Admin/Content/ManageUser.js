import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { AiFillPlusCircle } from "react-icons/ai";
import { useState } from "react";

function ManageUser() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <span>ManagerUser</span>
      <div>
        <button
          className="btn-add-user btn btn-primary"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <AiFillPlusCircle /> Add new User
        </button>
      </div>
      <div>
        <ModalCreateUser show={showModal} 
        setShow={setShowModal}
        />
      </div>
      <div>List User</div>
    </div>
  );
}

export default ManageUser;
