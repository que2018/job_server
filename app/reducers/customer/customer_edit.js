
const initialState={
	id:'',
	name:'',
    description:''
};

export const actionTypes = {
	SET_CUSTOMER_ID:'SET_CUSTOMER_ID',
    EDITING_NAME:'EDITING_NAME',
    EDITING_DESCRIPTION:'EDITING_DESCRIPTION',
	UPDATE_CUSTOMER:'UPDATE_CUSTOMER'
};

export const actions = {
    edit_name:function (name) {
        return{
            type:actionTypes.EDITING_NAME,
            name
        }
    },
    edit_description:function (description) {
        return{
            type:actionTypes.EDITING_DESCRIPTION,
            description
        }
    },
	update_customer:function (data) {
        return{
            type:actionTypes.UPDATE_CUSTOMER,
            data
        }
    }
};

export function reducer(state = initialState, action) {	
    switch (action.type) {
		case actionTypes.SET_CUSTOMER_ID:
            return{
                ...state,id:action.id
            };	
        case actionTypes.EDITING_NAME:
            return{
                ...state,name:action.name
            };
        case actionTypes.EDITING_DESCRIPTION:
            return{
                ...state,description:action.description
            };
			
        default:
            return state;
    }
}
