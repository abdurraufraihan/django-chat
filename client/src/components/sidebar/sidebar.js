import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import CookieUtil from "../../util/cookieUtil";
import AppPaths from "../../lib/appPaths";
import ApiConnector from "../../api/apiConnector";
import ApiEndpoints from "../../api/apiEndpoints";
import CommonUtil from "../../util/commonUtil";
import Constants from "../../lib/constants";
import Modal from "../modal/modal";

const Sidebar = (props) => {
  const [chatUsers, setChatUsers] = useState([]); //sidebar users
  const [users, setUsers] = useState([]); //popup users
  const [isShowAddPeopleModal, setIsShowAddPeopleModal] = useState(false);

  const redirectUserToDefaultChatRoom = (chatUsers) => {
    if (props?.location?.pathname === AppPaths.HOME) {
      props.setCurrentChattingMember(chatUsers[0]);
      props.history.push("/c/" + chatUsers[0].roomId);
    } else {
      const activeChatId = CommonUtil.getActiveChatId(props.match);
      const chatUser = chatUsers.find((user) => user.roomId === activeChatId);
      props.setCurrentChattingMember(chatUser);
    }
  };

  const fetchChatUser = async () => {
    const url = ApiEndpoints.USER_CHAT_URL.replace(
      Constants.USER_ID_PLACE_HOLDER,
      CommonUtil.getUserId()
    );
    const chatUsers = await ApiConnector.sendGetRequest(url);
    const formatedChatUser = CommonUtil.getFormatedChatUser(
      chatUsers,
      props.onlineUserList
    );
    setChatUsers(formatedChatUser);
    redirectUserToDefaultChatRoom(formatedChatUser);
  };

  useEffect(() => {
    fetchChatUser();
  }, []);

  const getConnectedUserIds = () => {
    let connectedUsers = "";
    for (let chatUser of chatUsers) {
      connectedUsers += chatUser.id + ",";
    }
    return connectedUsers.slice(0, -1);
  };

  const fetchUsers = async () => {
    const url = ApiEndpoints.USER_URL + "?exclude=" + getConnectedUserIds();
    const users = await ApiConnector.sendGetRequest(url);
    setUsers(users);
  };

  const addPeopleClickHandler = async () => {
    await fetchUsers();
    setIsShowAddPeopleModal(true);
  };

  const addMemberClickHandler = async (memberId) => {
    const userId = CommonUtil.getUserId();
    let requestBody = {
      members: [memberId, userId],
      type: "DM",
    };
    await ApiConnector.sendPostRequest(
      ApiEndpoints.CHAT_URL,
      JSON.stringify(requestBody),
      true,
      false
    );
    fetchChatUser();
    setIsShowAddPeopleModal(false);
  };

  const getActiveChatClass = (roomId) => {
    let activeChatId = CommonUtil.getActiveChatId(props.match);
    return roomId === activeChatId ? "active-chat" : "";
  };

  const logoutClickHandler = () => {
    CookieUtil.deleteCookie(Constants.ACCESS_PROPERTY);
    CookieUtil.deleteCookie(Constants.REFRESH_PROPERTY);
    window.location.href = AppPaths.LOGIN;
  };

  const getChatListWithOnlineUser = () => {
    let updatedChatList = chatUsers.map((user) => {
      if (props.onlineUserList.includes(user.id)) {
        user.isOnline = true;
      } else {
        user.isOnline = false;
      }
      return user;
    });
    return updatedChatList;
  };

  return (
    <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-2 border-right">
      <div className="d-none d-md-block">
        <button
          onClick={addPeopleClickHandler}
          className="btn btn-outline-warning btn-block my-1 mt-4"
        >
          Add People
        </button>
      </div>
      <div className="user-list-container">
        {getChatListWithOnlineUser()?.map((chatUser) => {
          return (
            <Link
              onClick={() => props.setCurrentChattingMember(chatUser)}
              to={`/c/${chatUser.roomId}`}
              className={
                "pl-1 list-group-item list-group-item-action border-0 " +
                getActiveChatClass(chatUser.roomId)
              }
              key={chatUser.id}
            >
              <div className="d-flex align-items-start">
                <img
                  src={chatUser.image}
                  className="rounded-circle mr-1"
                  alt={chatUser.name}
                  width="40"
                  height="40"
                />
                <div className="flex-grow-1 ml-3">
                  {chatUser.name}
                  <div className="small">
                    {chatUser.isOnline ? (
                      <>
                        <span className="fas fa-circle chat-online"></span>{" "}
                        Online
                      </>
                    ) : (
                      <>
                        <span className="fas fa-circle chat-offline"></span>{" "}
                        offline
                      </>
                    )}
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
      <hr className="d-block d-lg-none mt-1 mb-0" />
      <Modal
        modalCloseHandler={() => setIsShowAddPeopleModal(false)}
        show={isShowAddPeopleModal}
      >
        {users.length > 0 ? (
          users?.map((user) => (
            <div
              key={user.id}
              className="d-flex align-items-start pt-1 pb-1 d-flex align-items-center"
            >
              <img
                src={user.image}
                className="rounded-circle mr-1"
                alt={user.first_name + " " + user.last_name}
                width="40"
                height="40"
              />
              <div className="flex-grow-1 ml-2 mr-5">
                {user.first_name + " " + user.last_name}
              </div>
              <button
                onClick={() => addMemberClickHandler(user.id)}
                className="btn btn-sm btn-success"
              >
                Add
              </button>
            </div>
          ))
        ) : (
          <h3>No More User Found</h3>
        )}
      </Modal>
    </div>
  );
};

export default Sidebar;
