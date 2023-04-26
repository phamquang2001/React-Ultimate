import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";

function DetailQuiz() {
  const param = useParams();
  const access_token = useSelector((state) => state.user.account.access_token);

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
          let decription,image = null;
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
    }
  };
  useEffect(() => {
    getDetailQuiz();
  }, [param.id]);

  return <div>DetailQuiz</div>;
}

export default DetailQuiz;
