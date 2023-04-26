import { useSelector } from "react-redux";
import videoHome from "../../assets/video-home-page.mp4";
import "./Home.scss";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) => state.user.isAuthen);
  return (
    <div className="video-home">
      <video loop autoPlay muted>
        <source src={videoHome} />
      </video>
      <div className="Doing-quizz container">
        <h1>There's a better way to ask</h1>
        <div>
          You don't want to make a boring form. And your audience won't answer
          one. Create a type form insted - and make everyone happy.
        </div>
        {isAuthenticated === false ? (
          <button onClick={() => navigate('./login')}>Login now!</button>
        ) : (
          <button onClick={() => navigate('./user')}>Start Quizz Now!</button>
        )}
      </div>
    </div>
  );
}

export default Home;
