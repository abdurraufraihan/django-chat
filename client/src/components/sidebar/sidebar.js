import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import CookieUtil from "../../util/cookieUtil";
import AppPaths from "../../lib/appPaths";
import ApiConnector from "../../api/apiConnector";
import ApiEndpoints from "../../api/apiEndpoints";
import CommonUtil from "../../util/commonUtil";
import Constants from "../../lib/constants";

const Sidebar = () => {
  const [chatUsers, setChatUsers] = useState();

  useEffect(async () => {
    const url = ApiEndpoints.USER_CHAT_URL.replace(
      Constants.USER_ID_PLACE_HOLDER,
      CommonUtil.getUserId()
    );
    const chatUsers = await ApiConnector.sendGetRequest(url);
    setChatUsers(CommonUtil.getFormatedChatUser(chatUsers));
  }, []);

  const logoutClickHandler = () => {
    CookieUtil.deleteCookie(Constants.ACCESS_PROPERTY);
    CookieUtil.deleteCookie(Constants.REFRESH_PROPERTY);
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
        {chatUsers?.map((chatUser) => {
          return (
            <Link
              className="pl-1 list-group-item list-group-item-action border-0"
              key={chatUser.id}
            >
              <div className="d-flex align-items-start">
                <img
                  src={chatUser.image}
                  className="rounded-circle mr-1"
                  alt="User"
                  width="40"
                  height="40"
                />
                <div className="flex-grow-1 ml-3">
                  {chatUser.name}
                  <div className="small">
                    <span className="fas fa-circle chat-online"></span> Online
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
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
