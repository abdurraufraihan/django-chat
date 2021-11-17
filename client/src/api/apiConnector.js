import ServerUrl from "./serverUrl";
import ApiUtils from "./apiUtils";
import HttpMethods from "./httpMethods";

const sendGetRequest = async (relativeUrl) => {
  let url = ServerUrl.BASE_URL + relativeUrl;
  return await fetch(url)
    .then(ApiUtils.statusHandler)
    .then(ApiUtils.jsonHandler)
    .then((data) => data)
    .catch((error) => false);
};

const sendPostRequest = async (relativeUrl, requestBody) => {
  let url = ServerUrl.BASE_URL + relativeUrl;
  return await fetch(url, {
    method: HttpMethods.POST,
    headers: ApiUtils.getSubmitRequestHeader(),
    body: requestBody,
  })
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
