export default {
  dashboardsList: {
    dashboardsIDs: [],
    dashboards: {}
  },
  selectedDashboardID: null,
  selectedDashboardData: null,
  dashboardTocreate: {
    id: "",
    title: "",
    lists: []
  },
  view: { sideMenu: true },
  auth: { connected: !!localStorage.getItem("token_jwt"), user: null },
  system: { success: null, error: null }
};
