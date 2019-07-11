
const initialState={
	id:'',
    name:'',
    url:''
};

export const actionTypes = {
    SET_CATEGORY_DATA:'SET_CATEGORY_DATA',
    EDIT_CATEGORY_NAME:'EDIT_CATEGORY_NAME',
};

// export const actions = {
//     update_title:function (title) {
//         return{
//             type:actionTypes.EDITING_TITLE,
//             title
//         }
//     },

// };

export function reducer(state = initialState, action) {	
    switch (action.type) {
		case actionTypes.SET_CATEGORY_DATA:
            return{
                ...state,
                id:action.id,
                name:action.name,
                url:action.url
            };	
            case actionTypes.EDIT_CATEGORY_NAME:
            return{
                ...state,name:action.name
            };
        default:
            return state;
    }
}
