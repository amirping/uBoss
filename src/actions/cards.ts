import * as Types from "./actionTypes";
import dashboardApi from "../api/dashboardApi";
import { netError } from "./net";
import { closeDashboardCreator } from "./view";
import TrelloApi from "../api/trelloApi";
import store from "../store/store";
import ImportedDashboardApi from "../api/importedDashboardApi";
/**
 *
 * @param dashboardData the same data that the dashboard have
 */
export function loadCards(dashboard_data: any) {
  let jobTodo = 0;
  let jobDone = 0;
  dashboard_data.importedDashboards.map((ImportedDash: any) => {
    jobTodo += Object.keys(ImportedDash.mappedLists).length;
  });

  return function(dispatch: any) {
    let _cardsData: any = {};
    const state: any = store.getState();
    Object.keys(dashboard_data.lists).map(key => {
      _cardsData[key] = {};
    });
    dashboard_data.importedDashboards.map((ImportedDash: any) => {
      // goes here
      const client_token =
        state.auth.user.accounts[ImportedDash.dashboard_from].token;
      // on item in mappedLists call request an push result to  _cardsData
      const mappedListsKeys = Object.keys(ImportedDash.mappedLists);
      mappedListsKeys.map(key => {
        const remoteList = ImportedDash.mappedLists[key];
        return ImportedDashboardApi.getCards(
          remoteList.idlistRemote,
          ImportedDash.dashboard_from,
          client_token
        )
          .then(result => {
            jobDone++;
            if (result && result.length > 0) {
              if (
                !_cardsData[remoteList.idlistLocal][
                  ImportedDash.remote_board_id
                ]
              ) {
                _cardsData[remoteList.idlistLocal][
                  ImportedDash.remote_board_id
                ] = [];
              }
              _cardsData[remoteList.idlistLocal][
                ImportedDash.remote_board_id
              ] = _cardsData[remoteList.idlistLocal][
                ImportedDash.remote_board_id
              ].concat(result);
              //console.log(_cardsData);
              if (jobDone === jobTodo) {
                // safe update
                setTimeout(() => {
                  dispatch(cardsLoadedSuccess(_cardsData));
                }, 3000);
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
    //dispatch(cardsLoadedSuccess(_cardsData));
  };
}
export function cardsLoadedSuccess(payload: any) {
  return { type: Types.LOAD_CARDS_SUCCESS, payload: payload };
}
export function updateCard(
  cardID: string,
  cardFrom: string,
  queryParams: any,
  oldLocalListID: string,
  newLocalListID: string
) {
  const state: any = store.getState();
  const client_token = state.auth.user.accounts[cardFrom].token;
  console.log("start update card action");
  return function(dispatch: any) {
    return ImportedDashboardApi.updateCard(
      cardID,
      cardFrom,
      client_token,
      queryParams
    )
      .then(response => {
        //  disptach some thing to update the lists card
        dispatch(cardUpdateSuccess(response, oldLocalListID, newLocalListID));
        //console.log(response);
      })
      .catch(
        err => {
          console.log(err);
          dispatch(netError(err));
        }
        // diptach update card error
      );
  };
}
export function cardUpdateSuccess(
  card: any,
  oldListID: string,
  listLocalID: string
) {
  return {
    type: Types.UPDATE_CARD_SUCCESS,
    payload: { card: card, oldList: oldListID, newList: listLocalID }
  };
}

/**
 * @summary this function only working for trello cards since the provide the comments & checklist in diff api
 */
export function loadCardMoreData(secret_token: string, cardID: string) {
  // get comments
  // get checklists
  let cards_more_data = {
    comments: null,
    checklists: null
  };
  return function(dispatch: any) {
    return TrelloApi.getCardComments(cardID, secret_token)
      .then(response => {
        console.log("comments ---------------------- ");
        console.log(response);
        cards_more_data.comments = response;
        return TrelloApi.getCardChecklist(cardID, secret_token)
          .then(response => {
            console.log("Checklist -------------------- ");
            console.log(response);
            cards_more_data.checklists = response;
            //dispatch
            dispatch(cardLoadMoreDataSuccess(cards_more_data));
          })
          .catch(error => {
            //dispatch
            dispatch(netError(error));
          });
      })
      .catch(error => {
        // dispatch error
        dispatch(netError(error));
      });
  };
}

export function cardLoadMoreDataSuccess(payload: any) {
  return {
    type: Types.LOAD_MORE_CARD_DATA_SUCCESS,
    payload: payload
  };
}
