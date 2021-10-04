import { applyMiddleware, createStore,combineReducers } from "redux";
import { reducer } from "./reducer";
import { adminReducer } from "./adminReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const saveToLocalStorage = (state) => {
    try {
      localStorage.setItem('state', JSON.stringify(state));
    } catch (e) {
      console.error(e);
    }
  };
  
  const loadFromLocalStorage = () => {
    try {
      const stateStr = localStorage.getItem('state');
      return stateStr ? JSON.parse(stateStr) : undefined;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };
  
  const rootReducer = combineReducers({reducer, adminReducer})

  const persistedStore = loadFromLocalStorage();
  if(!persistedStore) {
      //in some cases mins/secs of timer component as stored 
      localStorage.clear();
  }
  
  const store = createStore(rootReducer, persistedStore, applyMiddleware(thunk,logger));
  
  store.subscribe(() => {
    saveToLocalStorage(store.getState());
  }); 

export default store;