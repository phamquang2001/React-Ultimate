import "./Question.scss";
function Question(props) {
  const { data, index } = props;
  return (
    <div className="detail-quiz-form">
      <div className="question-quiz">
        Question {index + 1} : {data.decription} ?
      </div>
        {data.image ? (
          <div className="image-quiz">
            <img src={`data:image/jpeg;base64,${data.image}`} />
          </div>
        ) : (
          <div className="image-quiz">

          </div>
        )}
      <div className="answers-quiz">
        {data.answers &&
          data.answers.map((e) => {
            return (
              <div className="answer-id" key={e.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={e.isChecked}
                  onChange={(event) =>props.handleChecked(event.target.checked , e.id, data.QuestionId)}
                  id={`flexCheckDefault ${e.id}`}
                />
                <label
                  className="form-check-label"
                  htmlFor={`flexCheckDefault ${e.id}`}
                >
                  {e.description}
                </label>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Question;
