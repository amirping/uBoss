// import axios from "axios";
import uuidv1 from "uuid";
export default class DashboardApi {
  static API_URL = "http://127.0.0.1:3333/api/dashboards/";
  static API_Header = new Headers({ "Content-Type": "application/json" });
  static getDashboards(token: string) {
    console.log("Fire API -> getDashboards");
    const request = new Request(this.API_URL, {
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
  static getDashboard(token: any, dashboardId: string) {
    console.log("Fire API -> getDashboard");
    const request = new Request(this.API_URL + dashboardId, {
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
  static updateDashboard(dashboard: any, token: any) {
    console.log("Fire API -> updateDashboard");
    let newObej = {
      title: dashboard.title,
      description: dashboard.description,
      lists: dashboard.lists
    };
    const request = new Request(this.API_URL + dashboard._id, {
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
  static createDashboard(dashboard: any, token: any) {
    console.log("Fire API -> createDashboard");
    // normelize dashboard to meet the backend struct
    let lists: any = {};
    dashboard.lists.map((li: string) => {
      const code = uuidv1(); // generate unique code
      lists[code] = {
        id: code,
        name: li
      };
    });
    dashboard.lists = lists;
    const request = new Request(this.API_URL, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        AUTHORIZATION: `Bearer ${token}`
      }),

      body: JSON.stringify(dashboard)
    });
    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
  static deleteDashboard(dashboardId: string, user: any) {
    console.log("Fire API -> deleteDashboard");
    const request = new Request(this.API_URL + dashboardId, {
      method: "DELETE",
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
}
