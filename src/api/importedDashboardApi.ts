/**
 * class of all possible API on the imported Dashboard
 */
export default class ImportedDashboardApi {
  static API_URL = "http://127.0.0.1:3333/api/ImportedDashboards";
  static API_Header = new Headers({ "Content-Type": "application/json" });

  /**
   *
   * @param token the user token
   * @param dashboard_id the id of uBoss dashboard
   */

  static getAllImportedDashboards(token: string, dashboard_id: string) {
    const request = new Request(this.API_URL + "/b/" + dashboard_id, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        AUTHORIZATION: `Bearer ${token}`
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
  /**
   *
   * @param token the user token
   * @param ImportedDashboard_id the id of the importedDashboard
   */
  static getImportedDashboard(token: string, ImportedDashboard_id: string) {
    const request = new Request(this.API_URL + "/" + ImportedDashboard_id, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        AUTHORIZATION: `Bearer ${token}`
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

  /**
   *
   * @param token the user token
   * @param ImportedDashboard_id the id of the importedDashboard
   */
  static deteleImportedDashboard(token: string, ImportedDashboard_id: string) {
    const request = new Request(this.API_URL + "/" + ImportedDashboard_id, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        AUTHORIZATION: `Bearer ${token}`
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
  /**
   *
   * @param token the user token
   * @param ImportedDashboard_id the id of the importedDashboard
   * @param ImportedDashboard the ImportedDashboard Object - only mappedLists will be updated
   */
  static updateImportedDashboard(
    token: string,
    ImportedDashboard_id: string,
    ImportedDashboard: any
  ) {
    const request = new Request(this.API_URL + "/" + ImportedDashboard_id, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        AUTHORIZATION: `Bearer ${token}`
      }),
      body: JSON.stringify(ImportedDashboard)
    });
    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
  /**
   *
   * @param token the user token
   * @param dashboard_id the id of uBoss dashboard
   * @param ImportedDashboard the ImportedDashboard Object - must have dashboard_from , remote_board_id
   */
  static createImportedDashboard(
    token: string,
    dashboard_id: string,
    ImportedDashboard: any
  ) {
    const request = new Request(this.API_URL + "/" + dashboard_id, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        AUTHORIZATION: `Bearer ${token}`
      }),
      body: JSON.stringify(ImportedDashboard)
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
