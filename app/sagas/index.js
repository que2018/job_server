import {fork} from 'redux-saga/effects'
import {loginFlow, registerFlow, user_auth} from './homeSaga'
import {get_all_users_flow} from './adminManagerUsersSaga'
import {get_all_user_groups_flow, editUserGroupFlow} from './adminManagerUserGroupSaga'
import {getPostListFlow, addPostFlow, updatePostFlow, getPostFlow, deletePostFlow} from './PostSaga'
import {getCustomerListFlow, addCustomerFlow, updateCustomerFlow, getCustomerFlow, deleteCustomerFlow} from './CustomerSaga'
import {getAllCategorysFlow, addCategoryFlow, delCategoryFlow ,getCategoryFlow} from './ManagerCategory'
import {saveUserGroupFlow} from './adminManagerNewUserGroupSaga'

export default function* rootSaga() {
	yield fork(getPostListFlow);
	yield fork(addPostFlow);
	yield fork(updatePostFlow);
	yield fork(getPostFlow);
	yield fork(deletePostFlow);
	
	yield fork(getCustomerListFlow);
	yield fork(addCustomerFlow);
	yield fork(updateCustomerFlow);
	yield fork(getCustomerFlow);
	yield fork(deleteCustomerFlow);

    yield fork(loginFlow);
    yield fork(registerFlow);
    yield fork(user_auth);
    yield fork(get_all_users_flow);
	yield fork(get_all_user_groups_flow);
	yield fork(saveUserGroupFlow);
	yield fork(editUserGroupFlow);
	
	yield fork(getAllCategorysFlow);
	yield fork(addCategoryFlow);
	yield fork(delCategoryFlow);
	yield fork(getCategoryFlow)
}
