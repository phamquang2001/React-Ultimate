import { useState } from "react";
import "./Login.scss";

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div>
      <div>
        <span>Don't have an account yet?</span>
        <button className="btn-sign-up">Sign up</button>
      </div>
      <div>
        <div className="text-center mt-5">
          <h3 className="col-4 mx-auto">Typeform</h3>
          <h5 className="col-4 mx-auto pt-4">Hello, who's this?</h5>
        </div>
        <div className="sign-in-content col-4 mx-auto ">
          <div className="mb-4 sign-in-input" >
            <label>Email</label>
            <input
              type="email"
              className="w-100 p-2 "
              placeholder="bruce@wayne.com"
              value={email}
              onChange = {(e)=> setEmail(e.target.value)}
            ></input>
          </div>
          <div className="mb-2 sign-in-input">
            <label>Password</label>
            <input
              type="password"
              className="w-100 p-2 "
              placeholder="At least 8 character"
              value={password}
              onChange = {(e)=> setPassword(e.target.value)}
            ></input>
          </div>
          <div className="mb-4">
            <span >Forgot password?</span>
          </div>
          <div>
            <button className="w-100 btn-login">Log in to Typeform</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
