import {combineReducers} from 'redux'
import {reducer as post_add} from './post/post_add';
import {reducer as post_edit} from './post/post_edit';
import {reducer as post_list} from './post/post_list';
import {reducer as customer_add} from './customer/customer_add'
import {reducer as customer_edit} from './customer/customer_edit'
import {reducer as customer_list} from './customer/customer_list'
import {reducer as category_add} from './category/category_add'
import {reducer as category_edit} from './category/category_edit'
import {reducer as category_list} from './category/category_list'
import {reducer as user_add} from './user/user_add'
import {reducer as user_edit} from './user/user_edit'
import {reducer as user_list} from './user/user_list'
import {reducer as user_group_add} from './user_group/user_group_add'
import {reducer as user_group_list} from './user_group/user_group_list'

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
	post_add,
	post_edit,
	post_list,
	customer_add,
	customer_edit,
	customer_list,
    category_add,
    category_edit,
	category_list,
	user_add,
	user_edit,
    user_list,
	user_group_add,
	user_group_list
});

export default admin

