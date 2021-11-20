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
  return null;
};

const deleteCookie = (cookieName) => {
  document.cookie =
    cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

const CookieUtil = {
  setCookie: setCookie,
  getCookie: getCookie,
  deleteCookie: deleteCookie,
};

export default CookieUtil;
