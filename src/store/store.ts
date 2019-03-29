import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
// const storeEnhancers =
//   (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// // need to enhance with thunk
// const store = createStore(rootReducer);

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
