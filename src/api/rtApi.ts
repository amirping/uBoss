import io from "socket.io-client";
import { getCardsIDS } from "../utils";
import store from "../store/store";
import { loadCards } from "../actions/cards";
import { loadDashboardSuccess } from "../actions/dashboards";
export default class RtApi {
  private API_URL = "http://127.0.0.1:3001";
  public socket: any;
  private cardsIDS: Array<string> = [];
  private tokenUser: string = "";
  private tokenApplication: string = "";
  constructor(tokenUser: string, tokenApplication: string) {
    this.socket = io(this.API_URL);
    this.tokenApplication = tokenApplication;
    this.tokenUser = tokenUser;
    this.startsSession();
    this.socket.on("RESTART_SESSION", (data: any) => {
      alert("REQUETS RESTART");
    });
  }
  /**
   * askWatch
   */
  public askWatch(cards: Array<string>) {
    console.log(getCardsIDS(cards));
    // we don't ask for watch if we already watching the same ids
    const cards_ids = getCardsIDS(cards);
    let isSame =
      cards_ids.length === this.cardsIDS.length &&
      cards_ids.sort().every((value, index) => this.cardsIDS.includes(value));
    if (!isSame) {
      this.cardsIDS = cards_ids;
      this.socket.emit("START_WATCH", {
        cards: this.cardsIDS,
        token: this.tokenUser
      });
    }
  }

  /**
   * removeWatch
   */
  public removeWatch() {
    this.cardsIDS = [];
    this.socket.emit("STOP_WATCH");
  }

  public startsSession() {
    this.socket.emit("START_SESSION", {
      app: this.tokenApplication,
      user: this.tokenUser
    });
  }
}
