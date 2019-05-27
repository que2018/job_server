
const initialState={
    name:'',
    description:''
};

export const actionTypes = {
    UPDATING_NAME:'UPDATING_NAME',
    UPDATING_DESCRIPTION:'UPDATING_DESCRIPTION',
	ADD_CUSTOMER:'ADD_CUSTOMER'
};

export const actions = {
    update_name:function (name) {
        return{
            type:actionTypes.UPDATING_NAME,
            name
        }
    },
    update_description:function (description) {
        return{
            type:actionTypes.UPDATING_DESCRIPTION,
            description
        }
    },
	add_customer:function (data) {
        return{
            type:actionTypes.ADD_CUSTOMER,
            data
        }
    }
};

export function reducer(state = initialState, action) {
    switch (action.type){
        case actionTypes.UPDATING_NAME:
            return{
                ...state,name:action.name
            };
        case actionTypes.UPDATING_DESCRIPTION:
            return{
                ...state,description:action.description
            };	
		
        default:
            return state;
    }
}