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
    console.log("Fire API -> updateUser");
    let newObej = {
      name: user.name,
      email: user.email
    };
    const request = new Request(this.API_URL + user._id, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        AUTHORIZATION: `Bearer ${user.token}`
      }),

      body: JSON.stringify(newObej)
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
