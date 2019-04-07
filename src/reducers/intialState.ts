export default {
  dashboardsList: {
    dashboardsIDs: [],
    dashboards: {}
  },
  loadedDashboard: {
    selectedDashboardID: null,
    selectedDashboardData: null
  },
  dashboardTocreate: {
    // title: "",
    // description: "",
    lists: []
  },
  view: {
    sideMenu: true,
    profileManagement: false,
    userProfile_anchorEl: null,
    dashboardCreator: false,
    dashboardConfig: false
  },
  auth: {
    connected: !!localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user") || "null")
  },
  system: { success: null, error: null }
};
