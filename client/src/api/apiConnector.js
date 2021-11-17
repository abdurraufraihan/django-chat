import ServerUrl from "./serverUrl";
import ApiUtils from "./apiUtils";
import HttpMethods from "./httpMethods";

const sendGetRequest = async (relativeUrl) => {
  const url = ServerUrl.BASE_URL + relativeUrl;
  return await fetch(url)
    .then(ApiUtils.statusHandler)
    .then(ApiUtils.jsonHandler)
    .then((data) => data)
    .catch((error) => false);
};

const sendPostRequest = async (relativeUrl, requestBody, isFormData) => {
  const url = ServerUrl.BASE_URL + relativeUrl;
  let options = {
    method: HttpMethods.POST,
    body: requestBody,
  };
  if (!isFormData) {
    options.headers = ApiUtils.getPostRequestHeader();
  }
  return await fetch(url, options)
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
