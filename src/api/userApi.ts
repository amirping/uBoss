// import axios from "axios";
export default class AuthApi {
  static API_URL = "http://127.0.0.1:3333/api/users/";
  static API_Header = new Headers({ "Content-Type": "application/json" });
  static getUser(user: any) {
    console.log("Fire API -> getuser");
    //   return authHeader:Headers = this.API_Header.set('AUTHORIZATION','Bearer ${user.token}')
    const request = new Request(this.API_URL + user._id, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        AUTHORIZATION: `Bearer ${user.token}`
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
  static updateUser(user: any) {
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
}
