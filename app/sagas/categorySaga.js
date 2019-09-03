import {put, take, call, select} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as CategoryListTypes} from '../reducers/category/category_list'
import {actionTypes as CategoryEditTypes} from '../reducers/category/category_edit'

export function* getCategories() {
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

export function* getCategoriesFlow() {
    while (true) {
        yield take(CategoryListTypes.GET_CATEGORIES);
        let res = yield call(getCategories);
        if (res.code === 0) {
            let tempArr = [];
            for (let i = 0; i < res.data.list.length; i++) {
                tempArr.push(res.data.list[i])
            }
            yield put({type: CategoryListTypes.SET_CATEGORIES, data: tempArr});
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
        let req = yield take(CategoryListTypes.DELETE_CATEGORY);
        console.log(req)
        let res = yield call(delCategory,req.id, req.ImageUrl);
        if (res.code === 0) {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
            yield put({type:CategoryListTypes.GET_CATEGORIES});
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
        let req = yield take(CategoryListTypes.ADD_CATEGORY);
		
        if (req.name === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入分类名称', msgType: 0});
        } else {
            let res = yield call(addCategory, req.name, req.url);       
            console.log(res) 
            if (res.code === 0) {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
                yield put({type:CategoryListTypes.GET_CATEGORIES});
                setTimeout(function () {
                    location.replace('/category/list');
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
        let req = yield take(CategoryListTypes.GET_CATEGORY);
        let res = yield call(getCategory, req.id);
		
        if(res){
            yield put({type:CategoryEditTypes.SET_CATEGORY_DATA, 
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


