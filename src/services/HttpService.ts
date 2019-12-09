import { XHRequest } from "@/types";

const host = "localhost";
const apiPort = "5000";
const apiEntry = "graphql";
const msPort = "4000";
const msEntry = "sa-auth-ms/resources/users";

const API_URI = `http://${host}:${apiPort}/${apiEntry}`;
const MS_URI = `http://${host}:${msPort}/${msEntry}`;

export default class HttpService {
  static requestToAPI(request: XHRequest) {
    HttpService.sendRequest(API_URI, request);
  }

  static requestToMS(request: XHRequest) {
    HttpService.sendRequest(MS_URI, request);
  }

  private static sendRequest(uri: string, request: XHRequest) {
    let xhr = new XMLHttpRequest();
    xhr.open(request.method, uri);
    xhr.onreadystatechange = function() {
      request.callback(this);
    };
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(request.body);
  }
}
