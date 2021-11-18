import jwt_decode from "jwt-decode";
import Constants from "../lib/constants";
import CookieUtil from "./cookieUtil";

const getUserId = () => {
  let token = CookieUtil.getCookie(Constants.ACCESS_PROPERTY);
  if (token) {
    let decodedToken = jwt_decode(token);
    return decodedToken.userId;
  }
  return "";
};

const getFormatedChatUser = (chatUsers) => {
  const userId = getUserId();
  return chatUsers.reduce((acumulator, item) => {
    if (item.type === "DM" || item.type === "SELF") {
      let newResult = {};
      newResult["roomId"] = item.roomId;
      let member = null;
      for (let user of item.member) {
        if (user.id !== userId || item.type === "SELF") {
          member = user;
        }
      }
      if (member) {
        newResult["name"] = member.first_name + " " + member.last_name;
        newResult["image"] = member.image;
        newResult["id"] = member.id;
      }
      acumulator.push(newResult);
      return acumulator;
    }
    return acumulator;
  }, []);
};

const CommonUtil = {
  getUserId: getUserId,
  getFormatedChatUser: getFormatedChatUser,
};

export default CommonUtil;
