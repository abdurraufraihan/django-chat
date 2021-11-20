import React, { useState } from "react";
import AuthRequired from "../../components/auth/AuthRequired";
import ChatBody from "../../components/chatbody/ChatBody";
import Sidebar from "../../components/sidebar/Sidebar";

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
