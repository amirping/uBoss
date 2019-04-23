export default {
  dashboardsList: {
    dashboardsIDs: [],
    dashboards: {}
  },
  loadedDashboard: {
    selectedDashboardID: null,
    selectedCard: null,
    selectedDashboardData: null,
    cards: null
  },
  dashboardTocreate: {
    lists: []
  },
  view: {
    sideMenu: true,
    profileManagement: false,
    userProfile_anchorEl: null,
    dashboardCreator: false,
    dashboardConfig: false,
    cardData: false
  },
  auth: {
    connected: !!localStorage.getItem("token"),
    approvingAction: JSON.parse(
      localStorage.getItem("approvingAction") || "null"
    ),
    endApprovingAction: JSON.parse(
      localStorage.getItem("endApprovingAction") || "null"
    ),
    user: JSON.parse(localStorage.getItem("user") || "null")
  },
  system: { success: null, error: null }
};
