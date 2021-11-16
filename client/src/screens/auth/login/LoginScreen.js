import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../authStyle.css";

const LoginScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div id="authFormContainer">
      <div id="authForm">
        <h2 id="authTitle">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="authFieldContainer">
            <input
              className="authField"
              type="email"
              placeholder="Email"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="requiredFieldError">This field is required</p>
            )}
          </div>
          <div className="authFieldContainer">
            <input
              className="authField"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="requiredFieldError">This field is required</p>
            )}
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