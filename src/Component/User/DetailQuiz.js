import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./DetailQuiz.scss";
import _ from "lodash";
import Question from "./Question";
import DisplayResult from "./DisplayResult";

function DetailQuiz() {
  const param = useParams();
  const access_token = useSelector((state) => state.user.account.access_token);
  const location = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [indexQuiz, setIndexQuiz] = useState(0);
  const [resultQuiz, setResultQuiz] = useState({})
  const [showResult, setShowResult] = useState(false)
  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };

  
  const getDetailQuiz = async () => {
    let res = await axios.get(
      `http://localhost:8081/api/v1/questions-by-quiz?quizId=${param.id}`,
      config
    );
    // console.log(res.data.DT)
    if (res.data.EC === 0) {
      let data = _.chain(res.data.DT)
        .groupBy("id")
        .map((value, key) => {
          let decription,
            image = null;
          let answers = [];
          value.forEach((e, index) => {
            // console.log(value);
            if (index === 0) {
              decription = e.description;
              image = e.image;
            }
            e.answers.isChecked = false;
            answers.push(e.answers);
          });
          return { QuestionId: key, decription, image, answers };
        })
        .value();
      setDataQuiz(data);
    }
  };
  useEffect(() => {
    getDetailQuiz();
  }, [param.id]);
  const prevHandle = () => {
    if (indexQuiz >= 1) setIndexQuiz(indexQuiz - 1);
  };
  const nextHandle = () => {
    if (indexQuiz < dataQuiz.length - 1) setIndexQuiz(indexQuiz + 1);
  };
  const finishHandle = async() => {
    let payload = {
      quizId: param.id,
      answers: [],
    };
    let answers = [];
    {
      dataQuiz &&
        dataQuiz.length > 0 &&
        dataQuiz.map((e) => {
          // console.log(e)
          let questionId = e.QuestionId;
          let userAnswerId = [];
          e.answers.forEach((item) => {
            if (item.isChecked) {
              userAnswerId.push(item.id);
            }
          });
          answers.push({
            questionId: +questionId,
            userAnswerId: userAnswerId,
          });
        });
    }
    payload.answers = answers;
    // http://localhost:8081/api/v1/quiz-submit
    let res = await axios.post('http://localhost:8081/api/v1/quiz-submit', {...payload} ,config)
    setResultQuiz(res.data.DT)
    console.log(res.data.DT)
    setShowResult(true)
  };

  const handleChecked = (event, aID, qID) => {
    let dataClone = _.cloneDeep(dataQuiz);
    let indexQz = dataClone.findIndex((e) => +e.QuestionId === +qID);
    dataClone.answers = dataClone[indexQz].answers.map((item) => {
      if (item.id === aID) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });
    setDataQuiz(dataClone);
  };
  return (
    <div className="Detail-quiz">
      <div className="left-quiz">
        <div className="description-quiz">{location?.state?.description}</div>
        <Question
          index={indexQuiz}
          handleChecked={handleChecked}
          data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[indexQuiz] : []}
        />
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => prevHandle()}>
            Prev
          </button>
          <button className="btn btn-primary" onClick={() => nextHandle()}>
            Next
          </button>
          <button className="btn btn-warning" onClick={() => finishHandle()}>
            Finish
          </button>
        </div>
      </div>
      <div className="right-quiz">right</div>
      <DisplayResult
      show={showResult}
      setShow={setShowResult}
      resultQuiz ={resultQuiz}
      />
    </div>

  );
}

export default DetailQuiz;
