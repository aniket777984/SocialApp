import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {userReducer,postOfFollowingReducer, allUsersReducer, userProfileReducer} from "./Reducers/Users";
import { likeReducer, myPostsReducer, userPostsReducer } from "./Reducers/Post";

const reducer = combineReducers({
   user : userReducer,
   postOfFollowing  : postOfFollowingReducer,
   allUsers : allUsersReducer,
   like : likeReducer,
   myPosts : myPostsReducer,
   userProfile : userProfileReducer,
   userPosts : userPostsReducer,
});

let initialState = {

};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;