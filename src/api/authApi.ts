// import axios from "axios";
export default class AuthApi {
  static API_URL = "http://127.0.0.1:3333/api/auth/";
  static API_Header = new Headers({ "Content-Type": "application/json" });
  static login(credentials: any) {
    console.log("Fire API -> login");
    const request = new Request(this.API_URL + "login", {
      method: "POST",
      headers: this.API_Header,
      body: JSON.stringify(credentials)
    });
    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
  static signup(user: any) {
    console.log("Fire API -> signup");
    const request = new Request(this.API_URL + "register", {
      method: "POST",
      headers: this.API_Header,
      body: JSON.stringify(user)
    });
    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
  static logout(token: string, refreshToken: string) {
    const request = new Request(this.API_URL + "logout", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        AUTHORIZATION: `Bearer ${token}`,
        refreshToken: `${refreshToken}`
      })
    });
    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
}
