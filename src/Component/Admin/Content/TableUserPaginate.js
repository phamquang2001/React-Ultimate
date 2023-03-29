
import Table from "react-bootstrap/Table";
import ReactPaginate from 'react-paginate';

function TableUserPaginate(props) {
  const {listUser, updateUser, viewUser, deleteUser, pageCount,getUserPaginate, currentPage} = props
  const handlePageClick=(e)=>{
    getUserPaginate(+e.selected + 1);
    props.setCurrentPage(+e.selected + 1)

  }
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
                  <button className="btn btn-danger" onClick={()=>deleteUser(e)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ReactPaginate
        nextLabel="Next >>>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<< Prev"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={props.currentPage - 1 }
      />
    </>
  );
}

export default TableUserPaginate;
