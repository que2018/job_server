
const initialState={
    title:'',
    author:'',
	description:'',
    dateAdded:'',
    category:'',
    viewCount: 0
};

export const actionTypes = {
    NEWING_TITLE:'NEWING_TITLE',
    NEWING_AUTHOR:'NEWING_AUTHOR',
	NEWING_DESCRIPTION:'NEWING_DESCRIPTION',
    NEWING_DATE_ADDED:'NEWING_DATE_ADDED',
    NEWING_VIEW_COUNT:'NEWING_VIEW_COUNT',
    NEWING_CATEGORY:' NEWING_CATEGORY',

	ADD_POST:'ADD_POST'
};

export const actions = {
    update_title:function (title) {
        return{
            type:actionTypes.NEWING_TITLE,
            title
        }
    },
    update_author:function (author) {
        return{
            type:actionTypes.NEWING_AUTHOR,
            author
        }
    },
	update_description:function (description) {
        return{
            type:actionTypes.NEWING_DESCRIPTION,
            description
        }
    },
	update_date_added:function (dateAdded) {
        return{
            type:actionTypes.NEWING_DATE_ADDED,
            dateAdded
        }
    },
	update_view_count:function (viewCount) {
        return{
            type:actionTypes.NEWING_VIEW_COUNT,
            viewCount
        }
    },

    update_category:function (category) {
        return{
            type:actionTypes.NEWING_CATEGORY,
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
        case actionTypes.NEWING_TITLE:
            return{
                ...state,title:action.title
            };
        case actionTypes.NEWING_AUTHOR:
            return{
                ...state,author:action.author
            };
		case actionTypes.NEWING_DESCRIPTION:
            return{
                ...state,description:action.description
            };
		case actionTypes.NEWING_DATE_ADDED:
            return{
                ...state,dateAdded:action.dateAdded
            };
		case actionTypes.NEWING_VIEW_COUNT:
            return{
                ...state,viewCount:action.viewCount
            };	

        case actionTypes.NEWING_CATEGORY:
            return{
                ...state,category:action.category
            };	
		
        default:
            return state;
    }
}