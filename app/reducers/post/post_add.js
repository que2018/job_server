
const initialState={
    title:'',
    author:'',
	description:'',
    dateAdded:'',
    category:'',
    viewCount: 0
};

export const actionTypes = {
    UPDATE_TITLE:'UPDATE_TITLE',
    UPDATE_AUTHOR:'UPDATE_AUTHOR',
	UPDATE_DESCRIPTION:'UPDATE_DESCRIPTION',
    UPDATE_DATE_ADDED:'UPDATE_DATE_ADDED',
    UPDATE_VIEW_COUNT:'UPDATE_VIEW_COUNT',
    UPDATE_CATEGORY:' UPDATE_CATEGORY',
	ADD_POST:'ADD_POST'
};

export const actions = {
    update_title:function (title) {
        return{
            type:actionTypes.UPDATE_TITLE,
            title
        }
    },
    update_author:function (author) {
        return{
            type:actionTypes.UPDATE_AUTHOR,
            author
        }
    },
	update_description:function (description) {
        return{
            type:actionTypes.UPDATE_DESCRIPTION,
            description
        }
    },
	update_date_added:function (dateAdded) {
        return{
            type:actionTypes.UPDATE_DATE_ADDED,
            dateAdded
        }
    },
	update_view_count:function (viewCount) {
        return{
            type:actionTypes.UPDATE_VIEW_COUNT,
            viewCount
        }
    },

    update_category:function (category) {
        return{
            type:actionTypes.UPDATE_CATEGORY,
            category
        }
    },
	add_post:function (data) {
        return{
            type:actionTypes.ADD_POST,
            data
        }
    }
};

export function reducer(state = initialState, action) {
    switch (action.type){
        case actionTypes.UPDATE_TITLE:
            return{
                ...state,title:action.title
            };
        case actionTypes.UPDATE_AUTHOR:
            return{
                ...state,author:action.author
            };
		case actionTypes.UPDATE_DESCRIPTION:
            return{
                ...state,description:action.description
            };
		case actionTypes.UPDATE_DATE_ADDED:
            return{
                ...state,dateAdded:action.dateAdded
            };
		case actionTypes.UPDATE_VIEW_COUNT:
            return{
                ...state,viewCount:action.viewCount
            };	

        case actionTypes.UPDATE_CATEGORY:
            return{
                ...state,category:action.category
            };	
		
        default:
            return state;
    }
}