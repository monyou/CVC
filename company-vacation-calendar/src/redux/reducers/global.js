import { combineReducers } from "redux";
import common from "./common.reducer";
import user from "./user.reducer";

export default combineReducers({ common, user });
