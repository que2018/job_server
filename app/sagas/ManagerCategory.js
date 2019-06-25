import {put, take, call, select} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as ManagerCategoriesTypes} from '../reducers/category/manageCategory'
import {actionTypes as EditCategory} from '../reducers/category/categroyEdit'
import { CollapsePanel } from 'antd/lib/collapse/Collapse';

export function* getAllCategories() {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, '/admin/category/get_categories');
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* addCategory(Name,url) {
    yield put({type: IndexActionTypes.FETCH_START});
    // console.log('from add category' + Name)
		
    try {
        return yield call(post, '/admin/category/add_category', {name:Name},{url});
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* delCategory(_id, ImageUrl) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/admin/category/delete_category?_id=${_id}&ImageUrl=${ImageUrl}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getAllCategoriesFlow() {
    while (true) {
        yield take(ManagerCategoriesTypes.GET_Categories);
        let res = yield call(getAllCategories);
        if (res.code === 0) {
            // console.log(res.data.list[0].Name)
            let tempArr = [];
            for (let i = 0; i < res.data.list.length; i++) {
                tempArr.push(res.data.list[i])
            }
            yield put({type: ManagerCategoriesTypes.SET_Categories, data: tempArr});
        } else if (res.message === '身份信息已过期，请重新登录') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
            setTimeout(function () {
                location.replace('/');
            }, 1000);
        } else {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
        }
    }
}

export function* delCategoryFlow() {
    while (true){
        let req = yield take(ManagerCategoriesTypes.DELETE_CATEGORY);
        console.log(req)
        let res = yield call(delCategory,req.id, req.ImageUrl);
        if (res.code === 0) {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
            yield put({type:ManagerCategoriesTypes.GET_Categories});
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

export function* addCategoryFlow(){
    while (true) {
        let req = yield take(ManagerCategoriesTypes.ADD_CATEGORY);
        // console.log(req)
        if (req.name === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入分类名称', msgType: 0});
        } else {
            let res = yield call(addCategory, req.name, req.url);       
            console.log(res) 
            if (res.code === 0) {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
                yield put({type:ManagerCategoriesTypes.GET_Categories});
                setTimeout(function () {
                    location.replace('/admin/category');
                }, 1000);
            }else if (res.message === '身份信息已过期，请重新登录') {
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

export function* getCategory(_id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/admin/category/get_category?_id=${_id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getCategoryFlow() {
    while (true){
        let req = yield take(ManagerCategoriesTypes.GET_CATEGORY);
        console.log(req)
        let res = yield call(getCategory, req.id);
        console.log(res)
        if(res){
            yield put({type:EditCategory.SET_CATEGORY_DATA, 
                       id:res.data._id,
                       name:res.data.Name,
                       url:res.data.ImageUrl,
            });
        }
    }
}

export function* uploadCategoryImage(formData){
    try {
        return yield call(post, '/admin/category/upload_image', formData);
    } catch (err) {
        console.log(err)
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '图片服务器请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

// export function* uploadCategoryImageFlow(){
//     while (true) {
//         let req = yield take(ManagerCategoriesTypes.UPLOAD_CATEGORY_IMAGE);
        
//     }
// }


