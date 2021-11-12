import React from "react";
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
      </div>
    </div>
  );
};

export default LoginScreen;
