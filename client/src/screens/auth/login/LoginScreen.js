import React from "react";
import { Link } from "react-router-dom";
import "../authStyle.css";

const LoginScreen = () => {
  return (
    <div id="authFormContainer">
      <div id="authForm">
        <h2 id="authTitle">Login</h2>
        <form>
          <div className="authFieldContainer">
            <input
              className="authField"
              type="email"
              name="username"
              placeholder="Email"
            />
          </div>
          <div className="authFieldContainer">
            <input
              className="authField"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <br />
          <button className="btn btn-outline-warning btn-block" type="submit">
            Login
          </button>
        </form>
        <p id="authFormFooter">
          Don't have any account! <Link to={"/signup"}>Click here</Link> to
          singup.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
