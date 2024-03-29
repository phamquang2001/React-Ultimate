import { useState, useEffect } from "react";
import Select from "react-select";
import "./QuestionsAnswer.scss";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { useSelector } from "react-redux";
import axios from "axios";

const QuestionsAnswer = (props) => {
  const [listQuiz , setListQuiz] = useState([])
  const access_token = useSelector((state) => state.user.account.access_token);
  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };
  const fetchListQuiz = async () => {
    let res = await axios.get("http://localhost:8081/api/v1/quiz/all", config);
    const newQuiz = res.data.DT.map(quiz =>{
        return {
            value: quiz.id,
            label: quiz.description}
        }
    )
    console.log(newQuiz)
    setListQuiz(newQuiz);
  };
  useEffect(() => {
    fetchListQuiz();
  }, []);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };

      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, anwserId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };

      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }
    if (type === "REMOVE") {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== anwserId
      );
      setQuestions(questionsClone);
    }
  };
  const handleInputQuestion = (eValue, qID) => {
    const questionsClone = _.cloneDeep(questions);
    const index = questionsClone.findIndex((item) => item.id === qID);
    questionsClone[index].description = eValue;
    setQuestions(questionsClone);
  };
  const handleInputAnswer = (type, eValue, qID, aID) => {
    const questionsClone = _.cloneDeep(questions);
    const index = questionsClone.findIndex((item) => item.id === qID);
    questionsClone[index].answers = questionsClone[index].answers.map((ans) => {
      if (ans.id === aID) {
        if (type === "INPUT") {
          ans.description = eValue;
        }
        if (type === "CHECKBOX") {
          ans.isCorrect = eValue;
        }
      }
      return ans;
    });
    setQuestions(questionsClone);
  };
  const handleChangeFileInPut = (item, qID) => {
    const questionsClone = _.cloneDeep(questions);
    const index = questionsClone.findIndex((itemQ) => itemQ.id === qID);
    if (item.target.files[0] && item.target && item.target.files) {
      questionsClone[index].imageName = item.target.files[0].name;
      questionsClone[index].imageFile = item.target.files[0];
    }
    setQuestions(questionsClone);
  };
  const handleSubmitQuestionForQuiz = () => {
    console.log("questions: ", questions);
  }

  
  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <hr />
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
        <div className="mt-3 mb-2 ">Add questions:</div>
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-4">
                <div className="questions-content">
                  <div className="form-floating description">
                    <input
                      type="type"
                      className="form-control"
                      placeholder="name@example.com"
                      value={question.description}
                      onChange={(e) =>
                        handleInputQuestion(e.target.value, question.id)
                      }
                    />
                    <label>Question {index + 1} 's description</label>
                  </div>
                  <div className="group-upload">
                    <label htmlFor={question.id}>
                      <RiImageAddFill className="label-up" />
                    </label>
                    <input
                      id={question.id}
                      type={"file"}
                      hidden
                      onChange={(item) =>
                        handleChangeFileInPut(item, question.id)
                      }
                    />
                    <span>
                      {question.imageName
                        ? question.imageName
                        : "0 file is uploaded"}
                    </span>
                  </div>
                  <div className="btn-add">
                    <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                      <BsFillPatchPlusFill className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                      <span
                        onClick={() =>
                          handleAddRemoveQuestion("REMOVE", question.id)
                        }
                      >
                        <BsPatchMinusFill className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>

                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <input
                          className="form-check-input iscorrect"
                          type="checkbox"
                          onChange={(event) =>
                            handleInputAnswer(
                              "CHECKBOX",
                              event.target.checked,
                              question.id,
                              answer.id
                            )
                          }
                        />
                        <div className="form-floating anwser-name">
                          <input
                            type="type"
                            className="form-control"
                            placeholder="name@example.com"
                            value={answer.description}
                            onChange={(event) =>
                              handleInputAnswer(
                                "INPUT",
                                event.target.value,
                                question.id,
                                answer.id
                              )
                            }
                          />
                          <label>Answers {index + 1} </label>
                        </div>
                        <div className="btn-group">
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer("ADD", question.id)
                            }
                          >
                            <AiFillPlusSquare className="icon-add" />
                          </span>
                          {question.answers.length > 1 && (
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer(
                                  "REMOVE",
                                  question.id,
                                  answer.id
                                )
                              }
                            >
                              <AiOutlineMinusCircle className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        <div>
          <button className="btn btn-warning" onClick={() =>handleSubmitQuestionForQuiz()}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsAnswer;
