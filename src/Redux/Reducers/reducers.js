import {
  asyncBookmarkTypes,
  asyncAuthTypes,
  asyncFolderTypes,
} from "../actions/asyncTypes";
export const initialState = {
  folders: {},
  bookmarks: {},
  folderIds: [],
  renameFolderId: "",
  parentId: "",
  bookmarkFolder: "",
  currentParentFolderId: "",
  setFolderIdToRename: false,
  openModal: false,
  bookmarkLoading: false,
  folderLoading: false,
  loginLoading: false,
  registrationLoading: false,
};
export const appReducers = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case asyncAuthTypes.LOGIN_SUCCESS:
      return { ...state, loginLoading: false };

    case asyncAuthTypes.LOGIN_FAILURE:
      return { ...state, loginLoading: true };

    case asyncAuthTypes.LOGIN_REQUEST:
      return { ...state, loginLoading: true };

    case asyncAuthTypes.REGISTRATION_REQUEST:
      return { ...state, registrationLoading: true };

    case asyncAuthTypes.REGISTRATION_SUCCESS:
      return { ...state, registrationLoading: false };

    case asyncAuthTypes.REGISTRATION_FAILURE:
      return { ...state, registrationLoading: true };

    case asyncFolderTypes.GET_MY_FOLDERS_REQUEST:
      return { ...state, folderLoading: true };

    case asyncFolderTypes.GET_MY_FOLDERS_SUCCESS: {
      const temp = [];
      payload.response.map((item) => temp.push(item.id));
      const obj = {};
      payload.response.map((item) => (obj[item.id] = item));
      return {
        ...state,
        folders: obj,
        folderIds: temp,
        folderLoading: false,
      };
    }

    case asyncFolderTypes.GET_MY_FOLDERS_FAILURE:
      return { ...state, folderLoading: "true" };

    case asyncFolderTypes.GET_FOLDER_CHILDREN_REQUEST: {
      return { ...state, parentId: payload };
    }

    case asyncFolderTypes.GET_FOLDER_CHILDREN_SUCCESS:
      const arr = [];
      let cloneFolders = {};
      cloneFolders = state.folders;
      payload.response.map((item) => (cloneFolders[item.id] = item));
      payload.response.map((item) => arr.push(item.id));
      cloneFolders[state.parentId].childIds = arr;
      return { ...state, folders: cloneFolders };

    case asyncFolderTypes.SET_PARENT_ID:
      return { ...state, parentId: payload.id };

    case asyncFolderTypes.CREATE_FOLDER_SUCCESS:
      let updatedFolders = {};
      updatedFolders = state.folders;
      updatedFolders[payload.response.id] = payload.response;
      if (state.currentParentFolderId === "") {
        state.folderIds.push(payload.response.id);
      } else {
        updatedFolders[state.currentParentFolderId].childIds.push(
          payload.response.id
        );
      }
      return { ...state, folders: updatedFolders };

    case asyncAuthTypes.LOGOUT_SUCCESS:
      return { ...initialState };

    case asyncFolderTypes.SET_SUBFOLDER_ID:
      return { ...state, openModal: true, currentParentFolderId: payload };

    case asyncFolderTypes.CLOSE_MODAL:
      return { ...state, openModal: false };

    case asyncFolderTypes.SET_RENAMEFOLDER_ID:
      return { ...state, setFolderIdToRename: true, renameFolderId: payload };

    case asyncFolderTypes.CLOSE_RENAME_MODAL:
      return { ...state, setFolderIdToRename: false };

    case asyncFolderTypes.RENAME_FOLDER_SUCCESS:
      state.folders[state.renameFolderId].name = payload.response.name;
      return { ...state };

    case asyncFolderTypes.CREATE_FOLDER_REQUEST:
      return { ...state, create: false };

    case asyncBookmarkTypes.GET_BOOKMARKS_REQUEST:
      return {
        ...state,

        bookmarkFolder: payload,
        bookmarkLoading: true,
      };

    case asyncBookmarkTypes.GET_BOOKMARKS_SUCCESS: {
      let bookmarkId = [];
      let rootBookmarkId = [];
      payload.response.map((item) =>
        state.bookmarkFolder === ""
          ? rootBookmarkId.push(item.id)
          : bookmarkId.push(item.id)
      );
      const object = {};
      payload.response.map((item) => (object[item.id] = item));
      if (!state.bookmarkFolder.isEmpty) {
        state.folders[state.bookmarkFolder].bIds = bookmarkId;
      }

      return {
        ...state,

        bookmarks: { ...state.bookmarks, ...object },
        bookmarkLoading: false,
      };
    }

    case asyncBookmarkTypes.CREATE_BOOKMARK_SUCCESS: {
      let cloneBookmarks = {};
      let cloneFolders = {};
      cloneFolders = state.folders;
      cloneBookmarks = state.bookmarks;
      cloneBookmarks[payload.response.id] = payload.response;
      cloneFolders[state.bookmarkFolder].bIds.push(payload.response.id);
      return { ...state, bookmarks: cloneBookmarks, folders: cloneFolders };
    }

    default:
      return state;
  }
};
