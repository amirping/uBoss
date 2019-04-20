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
                dispatch(cardsLoadedSuccess(_cardsData));
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
