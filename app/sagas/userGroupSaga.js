import {put, take, call, select} from 'redux-saga/effects'
import {get} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as UserGroupActionTypes} from '../reducers/user_group/user_group_list'
import {actionTypes as NewUserGroupActionTypes} from '../reducers/user_group/user_group_list'

export function* fetch_user_groups(pageNum) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/admin/getUserGroups?pageNum=${pageNum}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* get_all_user_groups_flow() {
    while (true) {
        let request = yield take(UserGroupActionTypes.GET_ALL_USER_GROUPS);
        let pageNum = request.pageNum||1;
        let response = yield call(fetch_user_groups,pageNum);
        if(response&&response.code === 0){
            for(let i = 0;i<response.data.list.length;i++){
                response.data.list[i].key = i;
            }
            let data = {};
            data.total = response.data.total;
            data.list  = response.data.list;
            data.pageNum = Number.parseInt(pageNum);
            yield put({type:UserGroupActionTypes.RESOLVE_GET_ALL_USER_GROUPS,data:data})
        }else{
            yield put({type:IndexActionTypes.SET_MESSAGE,msgContent:response.message,msgType:0});
        }
    }
}


export function* editUserGroup (id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/getUserGroupDetail?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* editUserGroupFlow () {
    while (true){
        let req = yield take(UserGroupActionTypes.EDIT_USER_GROUP);
        let res = yield call(editUserGroup,req.id);
        if(res){
            if (res.code === 0) {
				let id = res.data._id;
                let name = res.data.name;
                let description = res.data.description;
					
                yield put({type:NewUserGroupActionTypes.SET_USER_GROUP_ID,id});					
                yield put({type:NewUserGroupActionTypes.UPDATING_NAME,name});
                yield put({type:NewUserGroupActionTypes.UPDATING_DESCRIPTION,description});
            } else {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}
