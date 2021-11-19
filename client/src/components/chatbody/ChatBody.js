import React, { useEffect, useState } from "react";
import ApiConnector from "../../api/apiConnector";
import ApiEndpoints from "../../api/apiEndpoints";
import Constants from "../../lib/constants";
import CommonUtil from "../../util/commonUtil";
import "./chatBodyStyle.css";

const ChatBody = ({ match }) => {
  const [messages, setMessages] = useState([]);

  const fetchChatMessage = async () => {
    const currentChatId = CommonUtil.getActiveChatId(match);
    if (currentChatId) {
      const url =
        ApiEndpoints.CHAT_MESSAGE_URL.replace(
          Constants.CHAT_ID_PLACE_HOLDER,
          currentChatId
        ) + "?limit=20&offset=0";
      const chatMessages = await ApiConnector.sendGetRequest(url);
      setMessages(chatMessages);
    }
  };

  useEffect(() => {
    fetchChatMessage();
  }, [CommonUtil.getActiveChatId(match)]);

  return (
    <div className="col-12 col-lg-8 col-xl-10 pl-0 pr-0">
      <div className="py-2 px-4 border-bottom d-none d-lg-block">
        <div className="d-flex align-items-center py-1">
          <div className="position-relative">
            <img
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y"
              className="rounded-circle mr-1"
              alt="User"
              width="40"
              height="40"
            />
          </div>
          <div className="flex-grow-1 pl-3">
            <strong>Raihan</strong>
            <div className="text-muted small">
              <em>Typing...</em>
            </div>
          </div>
        </div>
      </div>
      <div className="position-relative">
        <div
          id="chat-message-container"
          className="chat-messages pl-4 pt-4 pr-4 pb-1 d-flex flex-column-reverse"
        >
          <div className="chat-message-left pb-3">
            <div>
              <img
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y"
                className="rounded-circle mr-1"
                alt="user image"
                width="40"
                height="40"
              />
              <div className="text-muted small text-nowrap mt-2">10:15 AM</div>
            </div>
            <div className="flex-shrink-1 bg-light ml-1 rounded py-2 px-3 mr-3">
              <div className="font-weight-bold mb-1">Raihan</div>
              This is left message
            </div>
          </div>
          <div className="chat-message-right pb-3">
            <div>
              <img
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y"
                className="rounded-circle mr-1"
                alt="user image"
                width="40"
                height="40"
              />
              <div className="text-muted small text-nowrap mt-2">10:20 AM</div>
            </div>
            <div className="flex-shrink-1 bg-light ml-1 rounded py-2 px-3 mr-3">
              <div className="font-weight-bold mb-1">Raihan</div>
              This is right message
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow-0 py-3 px-4 border-top">
        <form>
          <div className="input-group">
            <input
              id="chat-message-input"
              type="text"
              className="form-control"
              placeholder="Type your message"
            />
            <button
              id="chat-message-submit"
              className="btn btn-outline-warning"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBody;
