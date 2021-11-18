import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import CookieUtil from "../../util/cookieUtil";
import AppPaths from "../../lib/appPaths";

const Sidebar = () => {
  const logoutClickHandler = () => {
    CookieUtil.deleteCookie("access");
    CookieUtil.deleteCookie("refresh");
    window.location.href = AppPaths.LOGIN;
  };

  return (
    <div className="col-12 col-lg-4 col-xl-2 border-right">
      <div className="d-none d-md-block">
        <button className="btn btn-outline-warning btn-block my-1 mt-4">
          Add People
        </button>
      </div>
      <div className="user-list-container">
        <Link className="pl-1 list-group-item list-group-item-action border-0">
          <div className="d-flex align-items-start">
            <img
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y"
              className="rounded-circle mr-1"
              alt="User"
              width="40"
              height="40"
            />
            <div className="flex-grow-1 ml-3">
              Raihan
              <div className="small">
                <span className="fas fa-circle chat-online"></span> Online
              </div>
            </div>
          </div>
        </Link>
        <Link className="pl-1 list-group-item list-group-item-action border-0">
          <div className="d-flex align-items-start">
            <img
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y"
              className="rounded-circle mr-1"
              alt="User"
              width="40"
              height="40"
            />
            <div className="flex-grow-1 ml-3">
              Raihan
              <div className="small">
                <span className="fas fa-circle chat-online"></span> Online
              </div>
            </div>
          </div>
        </Link>
        <Link className="pl-1 list-group-item list-group-item-action border-0">
          <div className="d-flex align-items-start">
            <img
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y"
              className="rounded-circle mr-1"
              alt="User"
              width="40"
              height="40"
            />
            <div className="flex-grow-1 ml-3">
              Raihan
              <div className="small">
                <span className="fas fa-circle chat-online"></span> Online
              </div>
            </div>
          </div>
        </Link>
      </div>
      <button
        onClick={logoutClickHandler}
        className="btn btn-outline-danger btn-block mt-1"
      >
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
