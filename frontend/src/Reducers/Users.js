export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "REGISTER_USER_REQUEST":
    case "LOAD_USER_REQUEST":
      return {
        loading: true,
        isAuthenticated: false,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_USER_SUCCESS":
    case "LOAD_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT_USER_REQUEST" :
      return{
        loading : true,
      };
    case "LOGOUT_SUCCESS":
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case "LOGIN_FAIL":
    case "REGISTER_USER_FAIL":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "LOAD_USER_FAIL":
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "LOGOUT_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
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

export const postOfFollowingReducer =(state= {} , action) => {
  switch(action.type){
    case "postOfFollowingRequest" :
      return {
        loading : true,
      };
      case "postOfFollowingSuccess" : 
      return {
        loading : false,
        posts : action.payload,
      };
      case "postOfFollowingFailure" :
        return {
          ...state,
          loading :  false,
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

export const allUsersReducer =(state= {} , action) => {
  switch(action.type){
    case "allUsersRequest" :
      return {
        loading : true,
      };
      case "allUsersSuccess" : 
      return {
        loading : false,
        users : action.payload,
      };
      case "allUsersFailure" :
        return {
          ...state,
          loading :  false,
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

export const userProfileReducer =(state= {} , action) => {
  switch(action.type){
    case "userProfileRequest" :
      return {
        loading : true,
      };
      case "userProfileSuccess" : 
      return {
        loading : false,
        user : action.payload,
      };
      case "userProfileFailure" :
        return {
          ...state,
          loading :  false,
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