import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import "./ManageQuiz.scss";
import { useState } from "react";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

function ManageQuiz() {
    const [descriptionQuiz ,setDescriptionQuiz] = useState('')
    const [nameQuiz ,setNameQuiz] = useState('')
    const [typeQuiz , setTypeQuiz] = useState("HARD")
    const [imageQuiz,setImageQuiz] = useState(null)
    console.log(typeQuiz)
    const handleChangeFile = () =>{
        
    }
  return (
    <div className="manage-quiz">
      <div>
        <fieldset>
          <legend>Add new Quiz</legend>
          <FloatingLabel label="Description" className="mb-3">
            <Form.Control 
            type="text" 
            placeholder="Description" 
            onChange={e => {setDescriptionQuiz(e.target.value)}}/>
          </FloatingLabel>
          <FloatingLabel className="mb-3" label="Name">
            <Form.Control 
            type="text" 
            placeholder="Name" 
            onChange={e => {setNameQuiz(e.target.value)}}
            />
          </FloatingLabel>
          <FloatingLabel className="mb-3">
            <div>
              <Select
                value={typeQuiz}
                // onChange={e =>{setTypeQuiz(e.state.selectedOption)}}
                options={options}
                placeholder='Select Type'
              />
            </div>
          </FloatingLabel>
          <FloatingLabel className="mb-3 image-quizes" label="Image">
            <Form.Control 
            type="file" 
            onChange={e =>{handleChangeFile(e.target.value)}}/>
          </FloatingLabel>
        </fieldset>
      </div>
      <div>Table</div>
    </div>
  );
}

export default ManageQuiz;
