import ServerUrl from "./serverUrl";
import ApiUtils from "./apiUtils";
import HttpMethods from "./httpMethods";

const sendGetRequest = (relativeUrl) => {
  const url = ServerUrl.BASE_URL + relativeUrl;
  const options = { headers: ApiUtils.getAuthHeader() };
  return fetch(url, options)
    .then(ApiUtils.statusHandler)
    .then(ApiUtils.jsonHandler)
    .then((data) => data)
    .catch((error) => false);
};

const sendPostRequest = (relativeUrl, requestBody, isAuth, isFormData) => {
  const url = ServerUrl.BASE_URL + relativeUrl;
  let options = {
    method: HttpMethods.POST,
    body: requestBody,
  };
  if (!isFormData) {
    options.headers = ApiUtils.getPostRequestHeader();
  }
  if (isAuth) {
    if (!isFormData) {
      options.headers = {
        ...options.headers,
        ...ApiUtils.getAuthHeader(),
      };
    } else {
      options.headers = ApiUtils.getAuthHeader();
    }
  }
  return fetch(url, options)
    .then(ApiUtils.statusHandler)
    .then(ApiUtils.jsonHandler)
    .then((data) => data)
    .catch((error) => false);
};

const ApiConnector = {
  sendGetRequest: sendGetRequest,
  sendPostRequest: sendPostRequest,
};

export default ApiConnector;
