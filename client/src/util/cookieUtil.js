const setCookie = (cookieName, cookieValue, expairydays = 30) => {
  const today = new Date();
  today.setTime(today.getTime() + expairydays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + today.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
};

const getCookie = (cookieName) => {
  let name = cookieName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookieList = decodedCookie.split(";");
  for (let i = 0; i < cookieList.length; i++) {
    let cookie = cookieList[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
};

const CookieUtil = {
  setCookie: setCookie,
  getCookie: getCookie,
};

export default CookieUtil;
