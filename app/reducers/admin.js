import {combineReducers} from 'redux'
import {users} from './adminManagerUser'
import {user_groups} from './adminManagerUserGroup'
import {reducer as newUserGroup} from "./adminManagerNewUserGroup";
import {posts} from './post/post';
import {reducer as postAdd} from "./post/postAdd";
import {reducer as postEdit} from "./post/postEdit";
import {customer} from './customer/customer';
import {reducer as category} from "./category/manageCategory"
import {reducer as categoryEdit} from "./category/categroyEdit"

export const actionTypes = {
    ADMIN_URI_LOCATION:"ADMIN_URI_LOCATION"
};

const initialState = {
    url:"/"
};

export const actions = {
    change_location_admin:function (url) {
        return{
            type:actionTypes.ADMIN_URI_LOCATION,
            data:url
        }
    }
};

export function reducer(state=initialState,action) {
    switch (action.type){
        case actionTypes.ADMIN_URI_LOCATION:
            return {
                ...state,url:action.data
            };
        default:
            return state
    }
}

const admin = combineReducers({
    adminGlobalState:reducer,
    users,
	user_groups,
	newUserGroup,
	posts,
	postAdd,
	postEdit,
	customer,
    category,
    categoryEdit
});

export default admin

