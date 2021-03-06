export default {
  dashboardsList: {
    dashboardsIDs: null,
    dashboards: {}
  },
  loadedDashboard: {
    selectedDashboardID: null,
    selectedCard: null,
    moreCardData: null,
    selectedDashboardData: null,
    cards: null,
    rawCards: [],
    searchCard: "",
    stats: null,
    viewConfig: {
      sortByProject: false,
      timeout: false,
      sooner: false,
      closed: false,
      soonerTime: 2
    },
    remoteBoards: {}
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
    cardData: false,
    statsView: false
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
