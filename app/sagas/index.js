import {fork} from 'redux-saga/effects'
import {loginFlow, registerFlow} from './authSaga'
import {getPostListFlow, addPostFlow, editPostFlow, getPostFlow, deletePostFlow} from './PostSaga'
import {getCustomerListFlow, addCustomerFlow, editCustomerFlow, getCustomerFlow, deleteCustomerFlow} from './CustomerSaga'
import {getCategoriesFlow, addCategoryFlow, delCategoryFlow ,getCategoryFlow} from './categorySaga'
import {getUsersFlow} from './userSaga'
import {getUserGroupsFlow, addUserGroupFlow, editUserGroupFlow} from './userGroupSaga'

export default function* rootSaga() {
	yield fork(getPostListFlow);
	yield fork(addPostFlow);
	yield fork(editPostFlow);
	yield fork(getPostFlow);
	yield fork(deletePostFlow);
	yield fork(getCustomerListFlow);
	yield fork(addCustomerFlow);
	yield fork(editCustomerFlow);
	yield fork(getCustomerFlow);
	yield fork(deleteCustomerFlow);
    yield fork(loginFlow);
    yield fork(registerFlow);
    yield fork(getUsersFlow);
	yield fork(getUserGroupsFlow);
	yield fork(addUserGroupFlow);
	//yield fork(editUserGroupFlow);
	//yield fork(getUserGroupFlow);
	//yield fork(deleteUserGroupFlow);
	yield fork(getCategoriesFlow);
	yield fork(addCategoryFlow);
	yield fork(delCategoryFlow);
	yield fork(getCategoryFlow);
}
