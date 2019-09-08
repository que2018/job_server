import {put, take, call, select} from 'redux-saga/effects'
import {get} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as UserGroupAddActionTypes} from '../reducers/user_group/user_group_add'
import {actionTypes as UserGroupEditActionTypes} from '../reducers/user_group/user_group_edit'
import {actionTypes as UserGroupListActionTypes} from '../reducers/user_group/user_group_list'

export function* getUserGroups(pageNum) {
    yield put({type: IndexActionTypes.FETCH_START});
	
    try {
        return yield call(get, `/admin/getUserGroups?pageNum=${pageNum}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getUserGroupsFlow() {
    while (true) {
        let request = yield take(UserGroupListActionTypes.GET_USER_GROUPS);
        let pageNum = request.pageNum || 1;
        let response = yield call(getUserGroups, pageNum);
		
        if(response && response.code === 0) {
            for(let i = 0;i < response.data.list.length; i++) {
                response.data.list[i].key = i;
            }
			
            let data = {};
            data.total = response.data.total;
            data.list  = response.data.list;
            data.pageNum = Number.parseInt(pageNum);
			
            yield put({type:UserGroupActionTypes.RESOLVE_GET_ALL_USER_GROUPS,data:data})
        } else {
            yield put({type:IndexActionTypes.SET_MESSAGE,msgContent:response.message,msgType:0});
        }
    }
}

export function* addUserGroup(name) {
    yield put({type: IndexActionTypes.FETCH_START});
		
    try {
        return yield call(post, '/admin/user_group/add_user_group', {name:name});
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* addUserGroupFlow() {
    while (true) {
        let req = yield take(UserGroupAddActionTypes.ADD_USER_GROUP);
		
        if (req.name === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入分类名称', msgType: 0});
        } else {
            let res = yield call(addUserGroup, req.name);       
			
            if (res.code === 0) {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
                yield put({type:UserGroupListActionTypes.GET_USER_GROUPS});
				
                setTimeout(function () {
                    location.replace('/user_group/list');
                }, 1000);
				
            } else if(res.message === '身份信息已过期，请重新登录') {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
                setTimeout(function () {
                    location.replace('/');
                }, 1000);
				
            }  else {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}

export function* editUserGroup(id) {
    yield put({type: IndexActionTypes.FETCH_START});
	
    try {
        return yield call(get, `/getUserGroupDetail?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* editUserGroupFlow() {
    while (true){
        let req = yield take(UserGroupListActionTypes.EDIT_USER_GROUP);
		
        let res = yield call(editUserGroup, req.id);
        if(res){
            if (res.code === 0) {
				let id = res.data._id;
                let name = res.data.name;
                let description = res.data.description;
					
                yield put({type:EditUserGroupActionTypes.SET_USER_GROUP_ID, id});					
                yield put({type:EditUserGroupActionTypes.UPDATING_NAME, name});
            } else {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}
