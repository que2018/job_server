import {take,call,put,select} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as CustomerTypes} from '../reducers/customer/list/customer_list'
import {actionTypes as CustomerAddTypes} from '../reducers/customer/add/customer_add'
import {actionTypes as CustomerEditypes} from '../reducers/customer/edit/customer_edit'

export function* getCustomerList(pageNum) {
    yield put({type: IndexActionTypes.FETCH_START});
	
    try {
        return yield call(get, `/admin/customer/get_customers?pageNum=${pageNum}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getCustomerListFlow() {
    while (true){
        let req = yield take(CustomerTypes.GET_CUSTOMERS);
        let res = yield call(getCustomerList,req.pageNum);
        if(res){
            if (res.code === 0) {
                res.data.pageNum = req.pageNum;
                yield put({type:CustomerTypes.RESPONSE_GET_CUSTOMERS,data:res.data})
            } else if (res.message === '身份信息已过期，请重新登录') {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
                setTimeout(function () {
                    location.replace('/');
                }, 1000);
            } else {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}

export function* addCustomer(data) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(post, '/admin/customer/add_customer', data);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* addCustomerFlow() {
    while (true) {
        let request = yield take(CustomerAddTypes.ADD_CUSTOMER);
        if (request.data.name === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入名字', msgType: 0});
        } else if (request.data.description === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入描述', msgType: 0});
        } else {
			
			console.log(request.data);
			
            let res = yield call(addCustomer, request.data);
            if (res) {
                if (res.code === 0) {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
                    setTimeout(function () {
                        location.replace('/admin/customer');
                    }, 1000);
                } else if (res.message === '身份信息已过期，请重新登录') {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
                    setTimeout(function () {
                        location.replace('/');
                    }, 1000);
                } else {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
                }
            }
        }
    }
}

export function* updateCustomer(data) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(post, '/admin/customer/update_customer', data);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* updateCustomerFlow() {
    while (true) {
        let request = yield take(CustomerEditypes.UPDATE_CUSTOMER);
        if (request.data.name === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入发布标题', msgType: 0});
        } else if (request.data.description === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入发布作者', msgType: 0});
        } else {
            let res = yield call(updateCustomer, request.data);
            if (res) {
                if (res.code === 0) {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
                    setTimeout(function () {
                        location.replace('/admin/customer');
                    }, 1000);
                } else if (res.message === '身份信息已过期，请重新登录') {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
                    setTimeout(function () {
                        location.replace('/');
                    }, 1000);
                } else {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
                }
            }
        }
    }
}

export function* getCustomerFlow() {
    while (true){
        let req = yield take(CustomerTypes.GET_CUSTOMER);
        let res = yield call(getCustomer, req.id);
        if(res){
			let id = res.data._id;
			let name = res.data.name;
			let description = res.data.description;

			yield put({type:CustomerEditypes.SET_CUSTOMER_ID, id});
			yield put({type:CustomerEditypes.EDITING_NAME, name});
			yield put({type:CustomerEditypes.EDITING_DESCRIPTION, description});
        }
    }
}

export function* getCustomer(id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/admin/customer/get_customer?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* deleteCustomerFlow() {
    while (true){
        let req = yield take(CustomerTypes.DELETE_CUSTOMER);
		const pageNum = yield select(state => state.admin.customers.pageNum);

        let res = yield call(deleteCustomer,req.id);
		
        if(res){
            if (res.code === 0) {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '删除成功!', msgType: 1});
                yield put({type: CustomerTypes.GET_CUSTOMERS, pageNum})
            } else if (res.message === '身份信息已过期，请重新登录') {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
                setTimeout(function () {
                    location.replace('/');
                }, 1000);
            } else {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}

export function* deleteCustomer(id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/admin/customer/delete_customer?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}







