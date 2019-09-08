
const initialState = {
    list: [],
    pageNum: 1,
    total:0
};

export const actionTypes = {
    'GET_USER_GROUPS':'GET_USER_GROUPS',
    'RESOLVE_GET_ALL_USER_GROUPS': 'RESOLVE_GET_ALL_USER_GROUPS'
};

export const actions = {
    get_user_groups: function(pageNum = 1) {
        return {
            type: actionTypes.GET_USER_GROUPS,
            pageNum: pageNum
        }
    }
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.RESOLVE_GET_ALL_USER_GROUPS:
            return {
                list: action.data.list,
                pageNum: action.data.pageNum,
                total:action.data.total
            };
        default:
            return state;

    }
}