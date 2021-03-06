import {take,call,put,select} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as PostAddTypes} from '../reducers/post/post_add'
import {actionTypes as PostEditypes} from '../reducers/post/post_edit'
import {actionTypes as PostListTyes} from '../reducers/post/post_list'

export function* getPostList(pageNum) {
    yield put({type: IndexActionTypes.FETCH_START});
	
    try {
        return yield call(post, `/admin/post/get_posts?pageNum=${pageNum}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getPostListFlow() {
    while (true){
        let req = yield take(PostListTyes.GET_POSTS);
        let res = yield call(getPostList,req.pageNum);
        if(res){
            if (res.code === 0) {
                res.data.pageNum = req.pageNum;
                yield put({type:PostListTyes.RESPONSE_GET_POSTS,data:res.data})
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

export function* addPost(data) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(post, '/admin/post/add_post', data);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* addPostFlow() {
    while (true) {
        let request = yield take(PostAddTypes.ADD_POST);
        if (request.data.title === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入发布标题', msgType: 0});
        } else if (request.data.author === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入发布作者', msgType: 0});
        } else if (request.data.description === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入发布内容', msgType: 0});
        } else if (request.data.date_added === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入发布时间', msgType: 0});
        } 
		else if (request.data.view_count === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入发布阅读数量', msgType: 0});
        }
        else if (request.data.category === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请选择分类', msgType: 0});
        } 
            else {
            let res = yield call(addPost, request.data);
            if (res) {
                if (res.code === 0) {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
                    setTimeout(function () {
                        location.replace('/post');
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

export function* editPost(data) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(post, '/admin/post/update_post', data);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* editPostFlow() {
    while (true) {
        let request = yield take(PostEditypes.UPDATE_POST);
        if (request.data.title === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入发布标题', msgType: 0});
        } else if (request.data.author === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入发布作者', msgType: 0});
        } else if (request.data.author === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入发布内容', msgType: 0});
        } else if (request.data.date_added === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入发布时间', msgType: 0});
        } else if (request.data.view_count === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入发布阅读数量', msgType: 0});
        } else {
            let res = yield call(editPost, request.data);
            if (res) {
                if (res.code === 0) {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
                    setTimeout(function () {
                        location.replace('/post');
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

export function* getPostFlow() {
    while (true){
        let req = yield take(PostListTyes.GET_POST);
        let res = yield call(getPost, req.id);
        if(res){
			let id = res.data._id;
			let title = res.data.title;
			let author = res.data.author;
			let description = res.data.description;
			let dateAdded = res.data.dateAdded;
            let viewCount = res.data.viewCount;
            let category = res.data.category;
            let _category_id = res.data._category_id;

			yield put({type:PostEditypes.SET_POST_ID, id});
			yield put({type:PostEditypes.EDITING_TITLE, title});
			yield put({type:PostEditypes.EDITING_AUTHOR, author});
			yield put({type:PostEditypes.EDITING_DESCRIPTION, description});
			yield put({type:PostEditypes.EDITING_DATE_ADDED, dateAdded});
            yield put({type:PostEditypes.EDITING_VIEW_COUNT, viewCount}); 
            yield put({type:PostEditypes.EDITING_CATEGORY, category}); 
            yield put({type:PostEditypes.EDITING_CATEGORY_ID, _category_id}); 
        }
    }
}

export function* getPost(id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/admin/post/get_post?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* deletePostFlow() {
    while (true){
        let req = yield take(PostListTyes.DELETE_POST);
		const pageNum = yield select(state => state.admin.posts.pageNum);

        let res = yield call(deletePost,req.id);
		
        if(res){
            if (res.code === 0) {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '删除成功!', msgType: 1});
                yield put({type: PostListTyes.GET_POSTS, pageNum})
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

export function* deletePost(id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/admin/post/delete_post?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}







