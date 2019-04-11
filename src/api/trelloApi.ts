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
  static moveCard(
    user_token: string,
    board_id: string,
    card_id: string,
    list_id: string
  ) {}
  static addCard(user_token: string, board_id: string, list_id: string) {}
  static removeCard(user_token: string, board_id: string, list_id: string) {}
  static updateCard(
    user_token: string,
    card_id: string,
    list_id: string,
    data: any
  ) {}
}
