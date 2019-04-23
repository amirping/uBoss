import * as Types from "../actions/actionTypes";
import intialState from "./intialState";
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
    // create the cards holder in the store
    // let cardsSkull: any = {};
    // Object.keys(action.payload.lists).map((idLis: any) => {
    //   cardsSkull[idLis] = {};
    //   console.log("still up");
    // });
    // action.payload.importedDashboards.map((impDash: any) => {
    //   const mappedListsKeys = Object.keys(impDash.mappedLists);
    //   mappedListsKeys.map((key: any) => {
    //     const mpList = impDash.mappedLists[key];
    //     cardsSkull[mpList.idlistLocal][impDash.remote_board_id] = [1, 2, 3];
    //     console.log("still working");
    //   });
    // });
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
    return { ...state, cards: action.payload };
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
      selectedCard: null
    });
  }
  return state;
}
