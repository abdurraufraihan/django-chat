import React from "react";
import { Link } from "react-router-dom";
import "../authStyle.css";

const SignupScreen = () => {
  return (
    <div id="authFormContainer">
      <div id="authForm">
        <h2 id="authTitle">Sign Up</h2>
        <form>
          <div className="authFieldContainer">
            <input
              className="authField"
              type="text"
              name="first_name"
              placeholder="First Name"
            />
          </div>
          <div className="authFieldContainer">
            <input
              className="authField"
              type="text"
              name="last_name"
              placeholder="Last Name"
            />
          </div>
          <div className="authFieldContainer">
            <input
              className="authField"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <input type="file" name="image" />
          <div className="authFieldContainer">
            <input
              className="authField"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="authFieldContainer">
            <input
              className="authField"
              type="password"
              name="passwordTwo"
              placeholder="Confirm Password"
            />
          </div>
          <br />
          <button className="btn btn-outline-warning btn-block" type="submit">
            Sign Up
          </button>
        </form>
        <p id="authFormFooter">
          Already have an account. <Link to="/login">Click here</Link> to login.
        </p>
      </div>
    </div>
  );
};

export default SignupScreen;
