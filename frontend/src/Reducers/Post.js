export const likeReducer = (state = {}, action) => {
  switch (action.type) {
    case "likeRequest":
    case "addCommentRequest":
    case "deleteCommentRequest":
    case "newPostRequest" :
    case "updateCaptionRequest":
    case "deletePostRequest":
    case "updateProfileRequest":
    case "updatePasswordRequest":
    case "deleteProfileRequest":
    case "forgotPasswordRequest":
    case "resetPasswordRequest" :
    case "followUserRequest" : 
      return {
        loading: true,
      };
    case "likeSuccess":
    case "addCommentSuccess":
    case "deleteCommentSuccess":
    case "newPostSuccess" :
    case "updateCaptionSuccess":
    case "deletePostSuccess":
    case "updateProfileSuccess":
    case "updatePasswordSuccess":
    case "deleteProfileSuccess":
    case "forgotPasswordSuccess":
    case "resetPasswordSuccess" :
    case "followUserSuccess" : 
      return {
        loading: false,
        message: action.payload,
      };
    case "likeFailure":
    case "addCommentFailure":
    case "deleteCommentFailure":
    case "newPostFailure" :
    case "updateCaptionFailure":
    case "deletePostFailure":
    case "updateProfileFailure":
    case "updatePasswordFailure":
    case "deleteProfileFailure":
    case "forgotPasswordFailure":
    case "resetPasswordFailure" :
    case "followUserFailure" : 
      return {
        loading: false,
        error: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "clearMessage":
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

export const myPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case "myPostsRequest":
      return {
        loading:true,
      };
    case "myPostsSuccess":
      return {
        loading:false,
        posts:action.payload
      };
    case "myPostsFailure":
      return {
        loading:false,
        error : action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const userPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case "userPostsRequest":
      return {
        loading:true,
      };
    case "userPostsSuccess":
      return {
        loading:false,
        posts:action.payload
      };
    case "userPostsFailure":
      return {
        loading:false,
        error : action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};