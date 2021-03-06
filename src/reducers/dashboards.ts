import * as Types from "../actions/actionTypes";
import intialState from "./intialState";
import { datediff } from "../utils";
let dashboardsState = {};
Object.assign(
  dashboardsState,
  intialState.auth,
  intialState.system,
  intialState.dashboardTocreate,
  intialState.dashboardsList,
  intialState.loadedDashboard
);
export default function dashboards(state: any = dashboardsState, action: any) {
  if (action.type === Types.LOAD_DASHBOARDS_SUCCESS) {
    console.log("fiirrreee");
    let dashboardsIDS: any = [];
    let dashslist: any = {};
    action.payload.map((dash: any) => {
      dashboardsIDS.push(dash._id);
      dashslist[dash._id] = dash;
    });
    return Object.assign({}, state, {
      dashboardsIDs: dashboardsIDS,
      dashboards: dashslist
    });
  }
  if (action.type === Types.LOAD_DASHBOARD_SUCCESS) {
    const cardsSkull: any = Object.keys(action.payload.lists).reduce(
      (acc, idList) => ({ ...acc, [idList]: {} }),
      {}
    );

    action.payload.importedDashboards.forEach((impDash: any) => {
      Object.keys(impDash.mappedLists).forEach((key: any) => {
        const mpList = impDash.mappedLists[key];
        cardsSkull[mpList.idlistLocal][impDash.remote_board_id] = [];
        //console.log("still working");
      });
    });
    // assign and ready to go
    return {
      ...state,
      selectedDashboardData: action.payload,
      cards: cardsSkull
    };
  }
  if (action.type === Types.LOAD_DASHBOARD_ERROR) {
    console.log("fiirrreee one");
    return Object.assign({}, state, {
      success: null,
      error: { id: "DASHBOARD", dettails: action.error }
    });
  }
  if (action.type === Types.LOAD_DASHBOARDS_ERROR) {
    return Object.assign({}, state, {
      success: null,
      error: { id: "DASHBOARDS", dettails: action.error }
    });
  }
  if (action.type === Types.DASHBOARD_CREATOR_ADD_LIST) {
    return Object.assign({}, state, {
      lists: state.lists.concat(action.payload)
    });
  }
  if (action.type === Types.DASHBOARD_CREATOR_REMOVE_LIST) {
    let arr = state.lists;
    arr.splice(state.lists.indexOf(action.payload), 1);
    return Object.assign({}, state, {
      lists: arr
    });
  }
  if (action.type === Types.CREATE_DASHBOARD_SUCCESS) {
    let dashs = state.dashboards;
    dashs[action.payload._id] = action.payload;
    return Object.assign({}, state, {
      lists: [],
      error: null,
      dashboardsIDs: state.dashboardsIDs.concat(action.payload._id),
      dashboards: dashs,
      success: {
        id: "DASHBOARDS",
        message: "Your Dashboard Have been created"
      }
    });
  }
  if (action.type === Types.SELECT_DASHBOARD) {
    console.log("select", action.payload);
    return Object.assign({}, state, {
      selectedDashboardID: action.payload,
      selectedDashboardData: null
    });
  }
  if (action.type === Types.UPDATE_DASHBOARD_SUCCESS) {
    return Object.assign({}, state, {
      selectedDashboardData: action.payload,
      success: {
        id: "DASHBOARD",
        message: "Your Dashboard Have been Updated"
      },
      error: null
    });
  }
  if (action.type === Types.UPDATE_DASHBOARD_ERROR) {
    return Object.assign({}, state, {
      error: { id: "DASHBOARD", dettails: action.error },
      success: null,
      selectedDashboardData: state.selectedDashboardData // keep the same -> not sure
    });
  }
  if (action.type === Types.CREATE_IMPORTED_DASHBOARD_SUCCESS) {
    return Object.assign({}, state, {
      error: null,
      success: action.payload
    });
  }
  if (action.type === Types.CREATE_IMPORTED_DASHBOARD_ERROR) {
    return Object.assign({}, state, {
      success: null,
      error: action.error
    });
  }
  if (action.type === Types.LOAD_CARDS_SUCCESS) {
    // gather stats from cards
    // due - dueComplete - closed
    let _stats: any = {
      closed: 0,
      open: 0,
      sooner: 0,
      outOftime: 0,
      closed_Cards: <any>[],
      open_Cards: <any>[],
      sooner_Cards: <any>[],
      outOftime_Cards: <any>[],
      cardsBylist: <any>[],
      cardsByboard: <any>[],
      statsByBoards: <any>[],
      lastActivityCards: <any>[]
    };
    let cardsByList: any = {};
    let cardsByBoard: any = {};
    let activityByDate: any = {};
    Object.keys(action.payload).map(l => {
      const list = action.payload[l];
      cardsByList[l] = 0;
      Object.keys(list).map(ar => {
        const arr = list[ar];
        arr.map((item: any) => {
          cardsByList[l]++;
          if (activityByDate[item.dateLastActivity.substring(0, 10)]) {
            activityByDate[item.dateLastActivity.substring(0, 10)]++;
          } else {
            activityByDate[item.dateLastActivity.substring(0, 10)] = 1;
          }
          if (cardsByBoard[item.idBoard]) {
            cardsByBoard[item.idBoard]++;
          } else {
            cardsByBoard[item.idBoard] = 1;
          }
          if (item.closed || item.dueComplete != false) {
            _stats.closed++;
            _stats.closed_Cards.push(item);
          } else if (item.due) {
            const today = new Date();
            const iDate = new Date(item.due);
            if (iDate < today) {
              _stats.outOftime++;
              _stats.outOftime_Cards.push(item);
            } else if (
              Math.abs(datediff(iDate, today)) <= state.viewConfig.soonerTime
            ) {
              _stats.sooner++;
              _stats.sooner_Cards.push(item);
            } else {
              _stats.open++;
              _stats.open_Cards.push(item);
            }
          } else {
            _stats.open++;
            _stats.open_Cards.push(item);
          }
        });
      });
    });
    Object.keys(activityByDate).map(d => {
      _stats.lastActivityCards.push({ date: d, activity: activityByDate[d] });
    });
    Object.keys(cardsByList).map(k => {
      _stats.cardsBylist.push({
        id: state.selectedDashboardData.lists[k].name,
        total: cardsByList[k]
      });
    });
    Object.keys(cardsByBoard).map(k => {
      _stats.cardsByboard.push({ id: k, total: cardsByBoard[k] });
    });
    Object.keys(cardsByBoard).map(idBoard => {
      // bad method here -- need opti
      let open = _stats.open_Cards.filter((x: any) => x.idBoard === idBoard);
      let closed = _stats.closed_Cards.filter(
        (x: any) => x.idBoard === idBoard
      );
      let sooner = _stats.sooner_Cards.filter(
        (x: any) => x.idBoard === idBoard
      );
      let out = _stats.outOftime_Cards.filter(
        (x: any) => x.idBoard === idBoard
      );
      const item = {
        id: idBoard,
        data: [
          { name: "open", value: open.length, color: "#3F51B5" },
          { name: "closed", value: closed.length, color: "#4CAF50" },
          { name: "sooner", value: sooner.length, color: "#F9A825" },
          { name: "out of time", value: out.length, color: "#e53935" }
        ]
      };
      _stats.statsByBoards.push(item);
    });
    // finish
    return Object.assign({}, state, {
      cards: action.payload,
      stats: _stats
    });
    // return { ...state, cards: action.payload }; -> remove for optimi
  }
  if (action.type === Types.UPDATE_CARD_SUCCESS) {
    console.log("updating state");
    var AllCards = Object.assign({}, state.cards);
    const oldListID = action.payload.oldList;
    const newListID = action.payload.newList;
    const card = action.payload.card;
    // 1 remore the card from the old list
    for (
      let index = 0;
      index < AllCards[oldListID][card.idBoard].length;
      index++
    ) {
      const element = AllCards[oldListID][card.idBoard][index];
      if (element.id === card.id) {
        AllCards[oldListID][card.idBoard].splice(index, 1);
        break;
      }
    }
    // 2 add the card into the new list
    if (
      AllCards[newListID][card.idBoard] === undefined ||
      AllCards[newListID][card.idBoard] === null
    ) {
      AllCards[newListID][card.idBoard] = [];
    }
    AllCards[newListID][card.idBoard].push(card);
    console.log(AllCards);
    return { ...state, cards: AllCards };
  }
  if (action.type === Types.SELECTED_CARD_SET) {
    return Object.assign({}, state, {
      selectedCard: action.payload
    });
  }
  if (action.type === Types.SELECTED_CARD_UNSET) {
    return Object.assign({}, state, {
      selectedCard: null,
      moreCardData: null
    });
  }
  if (action.type === Types.LOAD_MORE_CARD_DATA_SUCCESS) {
    let comments = action.payload.comments.filter(
      (com: any) => com.type === "commentCard"
    );
    action.payload.comments = comments;
    return Object.assign({}, state, {
      moreCardData: action.payload
    });
  }
  if (action.type === Types.DASHBOARD_VIEW_CHANGE) {
    let viewChange = Object.assign({}, action.payload);
    console.log("we are about to change ");
    console.log(viewChange);
    return Object.assign({}, state, {
      viewConfig: viewChange
    });
  }
  if (action.type === Types.SEARCH_CARD_SET) {
    console.log("seeting up search string with value :", action.payload);
    return Object.assign({}, state, {
      searchCard: action.payload
    });
  }
  return state;
}
