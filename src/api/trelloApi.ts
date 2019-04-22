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
  static getBoard(user_token: string, boardID: string) {
    let api_url =
      this.URL +
      "boards/" +
      boardID +
      "?key=" +
      this.APP_KEY +
      "&lists=open&token=" +
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
  static addCard(user_token: string, board_id: string, list_id: string) {}
  static removeCard(user_token: string, board_id: string, list_id: string) {}
  static updateCard(user_token: string, card_id: string, data: any) {
    const api_url = `${this.URL}cards/${card_id}?key=${
      this.APP_KEY
    }&token=${user_token}`;
    // build all params
    // 1 - build each key with value
    const params = this.TrellobuildParams(data);
    const api_url_f = `${api_url}&${params}`;
    // go ahead
    const request = new Request(api_url_f, { method: "PUT" });
    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
  static getCards(user_token: string, listID: string) {
    const api_url = `${this.URL}lists/${listID}/cards?key=${
      this.APP_KEY
    }&token=${user_token}&attachment_fields=all&attachments=true`;
    const request = new Request(api_url, {});
    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
  static TrellobuildParams(obj: any) {
    let string_q = "";
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        console.log("params build");
        const element = obj[key];
        string_q = string_q.concat(key, "=", element, "&");
      }
    }
    return string_q;
  }
}
