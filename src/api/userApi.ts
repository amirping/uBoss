// import axios from "axios";
export default class UserApi {
  static API_URL = "http://127.0.0.1:3333/api/users/";
  static API_URL_AUTH_PASSWORD = "http://127.0.0.1:3333/api/auth/password";
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
  static updateUser(user: any, token: string) {
    console.log("Fire API -> updateUser");
    let newObej = {
      name: user.name,
      email: user.email,
      accounts: user.accounts || null
    };
    const request = new Request(this.API_URL + user._id, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        AUTHORIZATION: `Bearer ${token}`
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
  static updatePassword(user: any) {
    console.log("Fire API -> updatePassword");
    let newObej = {
      password: user.old_password,
      new_password: user.new_password
    };
    const request = new Request(this.API_URL_AUTH_PASSWORD, {
      method: "POST",
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
  static connectTrello(token: string, user: any) {
    const request = new Request(this.API_URL + user._id + "/asktrello", {
      method: "POST",
      redirect: "follow",
      headers: new Headers({
        "Content-Type": "application/json",
        AUTHORIZATION: `Bearer ${token}`
      })
    });
    return fetch(request)
      .then(response => {
        //console.log(response.json());
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
  /**
   * removed by passing into more modulaire system for accounts approving
   */
  // static approveTrello(token: string, accountToken: string) {
  //   const request = new Request(this.API_URL);
  //   return fetch(request)
  //     .then(response => {
  //       return response.json();
  //     })
  //     .catch(error => {
  //       return error;
  //     });
  // }
}
