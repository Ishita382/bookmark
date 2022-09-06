import { useDispatch } from "react-redux";
import {
  REGISTRATION_DETAILS,
  LOGIN_DETAILS,
  GET_ME_REQUEST,
  GET_MY_FOLDERS_REQUEST,
  CREATE_FOLDER_REQUEST,
  LOGOUT_REQUEST,
  DELETE_FOLDER_REQUEST,
  RENAME_FOLDER_REQUEST,
  ADD_SUBFOLDER_REQUEST,
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_RENAME_MODAL,
  CLOSE_RENAME_MODAL,
  GET_FOLDER_CHILDREN_REQUEST,
  GET_CURRENT_FOLDER_REQUEST,
  GET_BOOKMARKS_REQUEST,
  CREATE_BOOKMARK_REQUEST,
  SET_PARENT_ID,
  SET_BOOKMARK_FOLDER,
} from "../actions/constant";

export const useCustomHooks = () => {
  const dispatch = useDispatch();

  const sendRegistrationDetails = (data) => {
    return dispatch({
      type: REGISTRATION_DETAILS,
      payload: data,
    });
  };

  const sendLoginDetails = (data) => {
    return dispatch({
      type: LOGIN_DETAILS,
      payload: data,
    });
  };

  const getMe = () => {
    return dispatch({
      type: GET_ME_REQUEST,
    });
  };

  const getMyFolders = () => {
    return dispatch({
      type: GET_MY_FOLDERS_REQUEST,
    });
  };

  const createFolder = (name, createFolderParent) => {
    console.log("folder name", name);
    return dispatch({
      type: CREATE_FOLDER_REQUEST,
      payload: {
        name: name,
        id: createFolderParent,
      },
    });
  };

  const logout = (navigate) => {
    return dispatch({
      type: LOGOUT_REQUEST,
      navigate: navigate,
    });
  };

  const deleteFolder = (folderId) => {
    return dispatch({
      type: DELETE_FOLDER_REQUEST,
      payload: { folderId: folderId },
    });
  };

  const renameFolder = (renameFolderId, folderName) => {
    console.log(renameFolderId, folderName);
    return dispatch({
      type: RENAME_FOLDER_REQUEST,
      payload: {
        folderId: renameFolderId,
        name: folderName,
      },
    });
  };

  const addSubFolder = (folderId) => {
    console.log(folderId);
    return dispatch({
      type: ADD_SUBFOLDER_REQUEST,
      payload: {
        folderId: folderId,
      },
    });
  };

  const openModal = (id) => {
    console.log(id);
    return dispatch({
      type: OPEN_MODAL,
      payload: id,
    });
  };

  const closeModal = () => {
    return dispatch({
      type: CLOSE_MODAL,
    });
  };

  const openRenameModal = (id) => {
    return dispatch({
      type: OPEN_RENAME_MODAL,
      payload: id,
    });
  };

  const closeRenameModal = () => {
    return dispatch({
      type: CLOSE_RENAME_MODAL,
    });
  };

  const getFolderChildren = (id) => {
    return dispatch({
      type: GET_FOLDER_CHILDREN_REQUEST,
      payload: id,
    });
  };

  const getCurrentFolder = (id) => {
    return dispatch({
      type: GET_CURRENT_FOLDER_REQUEST,
      payload: id,
    });
  };

  const getBookmarks = (id) => {
    return dispatch({
      type: GET_BOOKMARKS_REQUEST,
      payload: id,
    });
  };

  const createBookmark = (url, folderId) => {
    return dispatch({
      type: CREATE_BOOKMARK_REQUEST,
      payload: {
        url: url,
        folderId: folderId,
      },
    });
  };

  const setParent = (id) => {
    return dispatch({
      type: SET_PARENT_ID,
      payload: id,
    });
  };

  const setBookmarkFolder = (id) => {
    return dispatch({
      type: SET_BOOKMARK_FOLDER,
      payload: id,
    });
  };

  return {
    sendRegistrationDetails,
    sendLoginDetails,
    getMe,
    getMyFolders,
    createFolder,
    logout,
    deleteFolder,
    renameFolder,
    addSubFolder,
    openModal,
    closeModal,
    openRenameModal,
    closeRenameModal,
    getFolderChildren,
    getCurrentFolder,
    getBookmarks,
    createBookmark,
    setParent,
    setBookmarkFolder,
  };
};
