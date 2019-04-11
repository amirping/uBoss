export default class TrelloApi {
  static URL = "https://api.trello.com/1/";
  static APP_KEY = "352af8ad953a870235a0e23bcbdbea3d";
  static getBoards(user_token: string) {
    let api_url =
      this.URL +
      "members/me/boards?key=" +
      this.APP_KEY +
      "&token=" +
      user_token;
    const request = new Request(api_url, {});
    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
  static getUser(user_token: string) {
    let api_url =
      this.URL + "members/me?key=" + this.APP_KEY + "&token=" + user_token;
    const request = new Request(api_url, {});
    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
}
