import React, { useState } from "react";
import ServerUrl from "../../api/serverUrl";
import AuthRequired from "../../components/auth/AuthRequired";
import ChatBody from "../../components/chatbody/ChatBody";
import Sidebar from "../../components/sidebar/Sidebar";
import CommonUtil from "../../util/commonUtil";

let socket = new WebSocket(
  ServerUrl.WS_BASE_URL + `ws/users/${CommonUtil.getUserId()}/chat/`
);

const HomeScreen = (props) => {
  const [currentChattingMember, setCurrentChattingMember] = useState({});
  const setActiveChatMember = (member) => {
    setCurrentChattingMember(member);
  };

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <div className="container-fluid">
          <div className="row g-0">
            <Sidebar setActiveChatMember={setActiveChatMember} {...props} />
            <ChatBody
              socket={socket}
              currentChattingMember={currentChattingMember}
              {...props}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthRequired(HomeScreen);
