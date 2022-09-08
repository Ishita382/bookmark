import send_request from "../Request";
import { put } from "redux-saga/effects";

import { folderConst } from "../actions/folderConstants";
export function* createMyFolder(action) {
  // const {folder : name} = data;
  if (localStorage.getItem("auth")) {
    try {
      let item = {
        name: action.payload.name,
      };
      if (action.payload.id !== "") {
        item.parentId = action.payload.id;
      }
      let response = yield send_request("folder", "POST", item);
      yield put({ type: folderConst.CREATE_FOLDER_SUCCESS, payload: { response } });
    } catch (error) {
      yield put({ type: folderConst.CREATE_FOLDER_FAILURE }, error);
    }
  }
}
