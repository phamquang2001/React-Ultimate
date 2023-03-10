
import Table from "react-bootstrap/Table";


function TableUser(props) {
  const {listUser, updateUser, viewUser} = props

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser.map((e, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{e.email}</td>
                <td>{e.username}</td>
                <td>{e.role}</td>
                <td>
                  <button className="btn btn-secondary " onClick={() => viewUser(e)}>View</button>
                  <button className="btn btn-warning mx-3" onClick={()=>updateUser(e)}>Update</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default TableUser;
