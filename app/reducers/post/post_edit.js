
const initialState={
	id:'',
	title:'',
    author:'',
	description:'',
    dateAdded:'',
    category:'',
    viewCount: 0,
    _category_id:'',
};

export const actionTypes = {
	SET_POST_ID:'SET_POST_ID',
    EDITING_TITLE:'EDITING_TITLE',
    EDITING_AUTHOR:'EDITING_AUTHOR',
	EDITING_DESCRIPTION:'EDITING_DESCRIPTION',
    EDITING_DATE_ADDED:'EDITING_DATE_ADDED',
    EDITING_VIEW_COUNT:'EDITING_VIEW_COUNT',    
    EDITING_CATEGORY:' NEWING_CATEGORY',
    EDITING_CATEGORY_ID:' NEWING_CATEGORY_ID',
	UPDATE_POST:'UPDATE_POST'
};

export const actions = {
    update_title:function (title) {
        return{
            type:actionTypes.EDITING_TITLE,
            title
        }
    },
	update_author:function (author) {
        return{
            type:actionTypes.EDITING_AUTHOR,
            author
        }
    },
	update_description:function (description) {
        return{
            type:actionTypes.EDITING_DESCRIPTION,
            description
        }
    },
	update_date_added:function (dateAdded) {
        return{
            type:actionTypes.EDITING_DATE_ADDED,
            dateAdded
        }
    },
	update_view_count:function (viewCount) {
        return{
            type:actionTypes.EDITING_VIEW_COUNT,
            viewCount
        }
    },

    update_category:function (category) {
        return{
            type:actionTypes.EDITING_CATEGORY,
            category
        }
    },
    update_category_id:function (_category_id) {
        return{
            type:actionTypes.EDITING_CATEGORY_ID,
            _category_id
        }
    },
	update_post:function (data) {
        return{
            type:actionTypes.UPDATE_POST,
            data
        }
    }
};

export function reducer(state = initialState, action) {	
    switch (action.type) {
		case actionTypes.SET_POST_ID:
            return{
                ...state,id:action.id
            };	
        case actionTypes.EDITING_TITLE:
            return{
                ...state,title:action.title
            };
        case actionTypes.EDITING_AUTHOR:
            return{
                ...state,author:action.author
            };
		case actionTypes.EDITING_DESCRIPTION:
            return{
                ...state,description:action.description
            };
		case actionTypes.EDITING_DATE_ADDED:
            return{
                ...state,dateAdded:action.dateAdded
            };
		case actionTypes.EDITING_VIEW_COUNT:
            return{
                ...state,viewCount:action.viewCount
            };	

        case actionTypes.EDITING_CATEGORY:
            return{
                ...state,category:action.category
            };	
        case actionTypes.EDITING_CATEGORY_ID:
            return{
                ...state,_category_id:action._category_id
            };	
		
        default:
            return state;
    }
}
