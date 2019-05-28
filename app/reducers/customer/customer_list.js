
const initialState = {
    customerList: [],
    pageNum: 1,
    total:0
};

export const actionTypes = {
    'GET_CUSTOMERS':'GET_CUSTOMERS',
	'RESPONSE_GET_CUSTOMERS':'RESPONSE_GET_CUSTOMERS',
	'GET_CUSTOMER':'GET_CUSTOMER',
	'DELETE_CUSTOMER':'DELETE_CUSTOMER'
};

export const actions = {
    get_customers: function (pageNum=1) {
        return {
            type: actionTypes.GET_CUSTOMERS,
            pageNum:pageNum
        }
    },
	get_customer: function (id) {
        return {
            type: actionTypes.GET_CUSTOMER,
            id
        }
    },
	delete_customer: function (id) {
        return {
            type: actionTypes.DELETE_CUSTOMER,
            id
        }
    }
};

export function customers(state = initialState, action) {
    switch (action.type) {
        case actionTypes.RESPONSE_GET_CUSTOMERS:
            return {
                ...state, 
				customerList: [...action.data.list], 
				total: action.data.total,
				pageNum: action.data.pageNum
            };
        default:
            return state;
    }
}
