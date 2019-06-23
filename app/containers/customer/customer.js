import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import CustomerAdd from './customer_add/CustomerAdd'
import CustomerEdit from './customer_edit/CustomerEdit'
import CustomerList from './customer_list/CustomerList'

export default class Post extends Component {

    constructor(props) {
        super(props);  
    }

    render() {
		const {url} = this.props.match;
		
        return (
			<Switch>
	          <Route exact path={url} component={CustomerList} />
			  <Route path='/customer/add' component={CustomerAdd} />
			  <Route path='/customer/edit' component={CustomerEdit} />
			</Switch>
        )
    }
}



