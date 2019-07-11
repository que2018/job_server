const initialState = []


export const actionTypes = {
    SET_CATEGORY_DATA:"SET_CATEGORY_DATA",
    SET_Categories:"RESPONSE_GET_ALL_Categories",
    GET_Categories: 'GET_Categories',
    EDIT_CATEGORY: "EDIT_CATEGORY",
    DELETE_CATEGORY: "DELETE_CATEGORY",
    GET_CATEGORY: "GET_CATEGORY",
    ADD_CATEGORY :'ADD_CATEGORY',
    UPLOAD_CATEGORY_IMAGE:'UPLOAD_CATEGORY_IMAGE'
};

export const actions = {
    get_categories: function (pageNum = 1) {
        return {
            type: actionTypes.GET_Categories,
            pageNum
        }
    },
    delete_category: function (id,ImageUrl) {
        return {
            type: actionTypes.DELETE_CATEGORY,
            id,
            ImageUrl
        }
    },
    edit_category: function (name) {
        return {
            type: actionTypes.EDIT_CATEGORY,
            name
        }
    },

    get_category:function (id) {		
        return{
            type: actionTypes.GET_CATEGORY,
            id,
        }
    },

    add_category:function (name , url) {		
        return{
            type: actionTypes.ADD_CATEGORY,
            name,
            url
        }
    },
    
    upload_category_image:function (name ,file) {		
        return{
            type: actionTypes.UPLOAD_CATEGORY_IMAGE,
            name,
            file
        }
    }
};

export function reducer(state=initialState,action) {
    switch (action.type){
        // case actionTypes.SET_CATEGORY_DATA:
        // return{
        //     ...state,data:action.data
        // };	
        case actionTypes.SET_Categories:
            return [...action.data];
        default:
            return state;
    }
}