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
  view: {
    sideMenu: true,
    profileManagement: false,
    userProfile_anchorEl: null
  },
  auth: {
    connected: !!localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user") || "null")
  },
  system: { success: null, error: null }
};
