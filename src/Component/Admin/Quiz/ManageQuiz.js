import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import "./ManageQuiz.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import TableListQuiz from "./TableListQuiz";
import Accordion from "react-bootstrap/Accordion";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

function ManageQuiz() {
  const [descriptionQuiz, setDescriptionQuiz] = useState("");
  const [nameQuiz, setNameQuiz] = useState("");
  const [typeQuiz, setTypeQuiz] = useState("HARD");
  const [imageQuiz, setImageQuiz] = useState(null);
  const [dataQuizDelete,setDataQuizDelete] = useState([])
  const [showDeleteQuiz , setShowDeleteQuiz] = useState(false)
  const [listQuiz, setListQuiz] = useState([]);
  const handleChangeFile = (e) => {
    if (e.target.files[0] && e.target && e.target.files) {
      setImageQuiz(e.target.files[0]);
    }
  };
  const access_token = useSelector((state) => state.user.account.access_token);
  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };
  const fetchListQuiz = async () => {
    let res = await axios.get("http://localhost:8081/api/v1/quiz/all", config);
    // console.log(res.data.DT);
    setListQuiz(res.data.DT);
  };
  useEffect(() => {
    fetchListQuiz();
  }, []);
  const handleSubmitQuiz = async () => {
    if (!nameQuiz || !descriptionQuiz) {
      toast.error("Name/Description is required");
      return;
    }
    if (imageQuiz === null) {
      toast.error("No files were uploaded");
      return;
    }
    const form = new FormData();
    form.append("description", descriptionQuiz);
    form.append("name", nameQuiz);
    form.append("difficulty", typeQuiz.value);
    form.append("quizImage", imageQuiz);
    const res = await axios.post(
      "http://localhost:8081/api/v1/quiz",
      form,
      config
    );
    console.log(typeQuiz)
    if (res.data.EC === 0) {
      toast.success(res.data.EM);
      setDescriptionQuiz("");
      setNameQuiz("");
      setTypeQuiz("");
      setImageQuiz(null);
      fetchListQuiz();
    } else {
      toast.error(res.data.EM);
    }
  };
  const handleDeleteQuiz = (e) =>{
    setShowDeleteQuiz(true)
    setDataQuizDelete(e)
    
  }
  const handleClose = () => setShowDeleteQuiz(false);
  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add new Quiz</Accordion.Header>
          <Accordion.Body>
            <div>
              <fieldset>
                <hr></hr>
                <legend>Add new Quiz</legend>
                <FloatingLabel label="Description" className="mb-3">
                  <Form.Control
                    value={descriptionQuiz}
                    type="text"
                    placeholder="Description"
                    onChange={(e) => {
                      setDescriptionQuiz(e.target.value);
                    }}
                  />
                </FloatingLabel>
                <FloatingLabel className="mb-3" label="Name">
                  <Form.Control
                    value={nameQuiz}
                    type="text"
                    placeholder="Name"
                    onChange={(e) => {
                      setNameQuiz(e.target.value);
                    }}
                  />
                </FloatingLabel>
                <FloatingLabel className="mb-3">
                  <div>
                    <Select
                      value={typeQuiz}
                      onChange={(e)=>setTypeQuiz(e)}
                      options={options}
                      placeholder="Select Type"
                    />
                  </div>
                </FloatingLabel>
                <FloatingLabel className="mb-3 image-quizes" label="Image">
                  <Form.Control
                    type="file"
                    onChange={(e) => {
                      handleChangeFile(e);
                    }}
                  />
                </FloatingLabel>
                <button
                  className="btn btn-warning"
                  onClick={() => handleSubmitQuiz()}
                >
                  Save
                </button>
              </fieldset>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="manage-quiz">
        <div>
          <TableListQuiz 
          handleDeleteQuiz ={handleDeleteQuiz}
          listQuiz ={listQuiz}
          />
          <ModalDeleteQuiz
          setShowDeleteQuiz ={setShowDeleteQuiz}
          handleClose ={handleClose}
          showDeleteQuiz = {showDeleteQuiz}
          dataQuizDelete ={dataQuizDelete}
          fetchListQuiz ={fetchListQuiz}
          />
        </div>
      </div>
    </>
  );
}

export default ManageQuiz;
