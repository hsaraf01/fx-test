import { applyMiddleware, createStore,combineReducers } from "redux";
import { reducer } from "./reducer";
import { adminReducer } from "./adminReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const combinedReducer = combineReducers({reducer, adminReducer})
export const store = createStore(combinedReducer, applyMiddleware(thunk,logger));