
const initialState = {
    name:''
};

export const actionTypes = {
    UPDATE_NAME:'UPDATE_NAME',
	ADD_USER_GROUP:'ADD_USER_GROUP'
};

export const actions = {
    update_name:function (name) {
        return{
            type:actionTypes.UPDATE_NAME,
            name
        }
    },
	add_user_group:function (data) {
        return{
            type:actionTypes.ADD_USER_GROUP,
            data
        }
    }
};

export function reducer(state = initialState, action) {
    switch (action.type){
        case actionTypes.UPDATE_NAME:
            return{
                ...state,title:action.name
            };
        default:
            return state;
    }
}