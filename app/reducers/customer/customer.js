import {combineReducers} from 'redux'

import customer_add from './add/customer_add'
import customer_edit from './edit/customer_edit'
import customer_list from './list/customer_list'

const customer = combineReducers({
    customer_add,
	customer_edit,
    customer_list
});

export default customer


