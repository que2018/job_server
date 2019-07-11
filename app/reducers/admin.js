import {combineReducers} from 'redux'
import {users} from './user/user_list'
import {user_groups} from './user_group/user_group_list'
import {reducer as newUserGroup} from "./adminManagerNewUserGroup";
import {posts} from './post/post';
import {reducer as postAdd} from "./post/postAdd";
import {reducer as postEdit} from "./post/postEdit";
import {reducer as customer_add} from './customer/customer_add';
import {reducer as customer_edit} from './customer/customer_edit';
import {reducer as customer_list} from './customer/customer_list';
import {reducer as category_add} from "./category/category_add"
import {reducer as category_edit} from "./category/category_edit"
import {reducer as category_list} from "./category/category_list"

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
	customer_add,
	customer_edit,
	customer_list,
    category_add,
    category_edit,
	category_list
});

export default admin

