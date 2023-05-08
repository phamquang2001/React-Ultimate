import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ListQuiz.scss";
function ListQuiz() {
  const [listQuiz, setListQuiz] = useState([]);
  const access_token = useSelector((state) => state.user.account.access_token);
  const navigate = useNavigate()
  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };
  const getListQuiz = async () => {
    let res = await axios.get(
      "http://localhost:8081/api/v1/quiz-by-participant",
      config
    );
    setListQuiz(res.data.DT);
  };
  useEffect(() => {
    getListQuiz();
  }, []);

  return (
    <div className="list-quizz container">
      {listQuiz.length > 0 ? (
        listQuiz.map((e, index) => (
          <div key={index} className="card" style={{ width: "18rem" }}>
            <img
              src={`data:image/jpeg;base64,${e.image}`}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{`Quizz ${e.id}`}</h5>
              <p className="card-text">{e.description}</p>
              <a className="btn btn-primary"
              onClick={() => {
                navigate(`/quiz/${e.id}`,{ state: { description: e.description , image: e.image } })
              }}
              >
                Start Now!
              </a>
            </div>
          </div>
        ))
      ) : (
        <div>You don't have any Quizz</div>
      )}
    </div>
  );
}

export default ListQuiz;
