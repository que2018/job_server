
const initialState = {
    name:''
};

export const actionTypes = {
    UPDATING_NAME:'UPDATING_NAME',
	ADD_USER:'ADD_USER'
};

export const actions = {
    update_name:function (name) {
        return{
            type:actionTypes.UPDATING_NAME,
            name
        }
    },
	add_user:function (data) {
        return{
            type:actionTypes.ADD_USER,
            data
        }
    }
};

export function reducer(state = initialState, action) {
    switch (action.type){
        case actionTypes.UPDATING_NAME:
            return{
                ...state,title:action.name
            };
        default:
            return state;
    }
}