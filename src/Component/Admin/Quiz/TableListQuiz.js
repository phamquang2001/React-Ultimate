import Table from "react-bootstrap/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";

function TableListQuiz(props) {
    const {listQuiz, handleDeleteQuiz} = props
//   const access_token = useSelector((state) => state.user.account.access_token);

//   const config = {
//     headers: { Authorization: `Bearer ${access_token}` },
//   };
//   const fetchListQuiz = async () => {
//     let res = await axios.get("http://localhost:8081/api/v1/quiz/all", config);
//     // console.log(res.data.DT);
//     setListQuiz(res.data.DT);
//   };
//   useEffect(() => {
//     fetchListQuiz();
//   }, []);
  
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Type</th>
          <th>Action</th>

        </tr>
      </thead>
      <tbody>
        {listQuiz &&
          listQuiz.length > 0 &&
          listQuiz.map((e) => {
            return (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.description}</td>
                <td>{e.difficulty}</td>
                <td >
                    <Button className="btn btn-error" onClick={() =>handleDeleteQuiz(e)}>Delete</Button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}
export default TableListQuiz;
