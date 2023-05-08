import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./DetailQuiz.scss";
import _ from "lodash";

function DetailQuiz() {
  const param = useParams();
  const access_token = useSelector((state) => state.user.account.access_token);
  const location = useLocation();
  console.log(location);
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
            if (index === 0) {
              decription = e.description;
              image = e.image;
            }
            answers.push(e.answers);
          });
          return { QuestionId: key, decription, image, answers };
        })
        .value();
        console.log(data)
    }
  };
  useEffect(() => {
    getDetailQuiz();
  }, [param.id]);

  return (
    <div className="Detail-quiz">
      <div className="left-quiz">
        <div className="description-quiz">{location?.state?.description}</div>
        <div className="question-quiz">Question</div>
        <div className="image-quiz">
          <img
            src={`data:image/jpeg;base64,${location?.state?.image}`}
          />
        </div>
        <div className="answers-quiz">
          <div>A. abv</div>
          <div>B. abv</div>
          <div>C. abv</div>
          <div>D. abv</div>
        </div>
        <div className="footer">
          <button className="btn btn-secondary">Prev</button>
          <button className="btn btn-primary">Next</button>
        </div>
      </div>
      <div className="right-quiz">right</div>
    </div>
  );
}

export default DetailQuiz;
