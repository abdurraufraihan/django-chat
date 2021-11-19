import React from "react";
import ChatBody from "../../components/chatbody/ChatBody";
import Sidebar from "../../components/sidebar/Sidebar";

const HomeScreen = (props) => {
  return (
    <main className="content">
      <div className="container-fluid p-0">
        <div className="container-fluid">
          <div className="row g-0">
            <Sidebar />
            <ChatBody {...props} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeScreen;
