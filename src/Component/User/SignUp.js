import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./SignUp.scss";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmit = async () => {
    const isValid = validateEmail(email);
    if (!isValid) {
      toast.error("Invalid email");
    }
    if (!password) {
      toast.error("Invalid password");
    }
    const data = await axios.post("http://localhost:8081/api/v1/register", {
      email: email,
      username: username,
      password: password,
    });
    console.log(data);

    if (data && data.data.EC == 0) {
      toast.success(data.data.EM);
      navigate("/login");
    } else {
      toast.error(data.data.EM);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  };
  return (
    <div>
      <div>
        <span>Already have an account?</span>
        <button className="btn-sign-up" onClick={() => navigate("/login")}>
          Log in
        </button>
      </div>
      <div>
        <div className="text-center mt-5">
          <h3 className="col-4 mx-auto">Sign Up Form</h3>
        </div>
        <div className="sign-in-content col-4 mx-auto ">
          <div className="mb-4 sign-in-input">
            <label>Email</label>
            <input
              type="email"
              className="w-100 p-2 "
              placeholder="bruce@wayne.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="mb-4 sign-in-input">
            <label>Username</label>
            <input
              type="username"
              className="w-100 p-2 "
              placeholder="abc"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>

          <div className="mb-2 sign-in-input show-password">
            <label>Password</label>
            <input
              type= {showPassword ? "text" : "password"} 
              className="w-100 p-2 "
              placeholder="At least 8 character"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {showPassword ? (
              <span className="eyes" onClick={() =>handleShowPassword()}>
                <AiFillEye />
              </span>
            ) : (
              <span className="eyes" onClick={() =>handleShowPassword()}>
                <AiFillEyeInvisible />
              </span>
            )}
          </div>

          <div>
            <button
              className="mt-4 w-100 btn-login"
              onClick={() => handleSubmit()}
            >
              Register Account
            </button>
          </div>
          <div className="back-home text-center" onClick={() => navigate("/")}>
            {" "}
            &lt;&lt;Go to homepage
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
