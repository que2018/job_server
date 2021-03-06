import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import UserAdd from './user_add/UserAdd'
import UserEdit from './user_edit/UserEdit'
import UserList from './user_list/UserList'

export default class User extends Component {

    constructor(props) {
        super(props);  
    }

    render() {
		const {url} = this.props.match;
		
        return (
			<Switch>
				<Route exact path={url} component={UserList} />
				<Route path='/user/add' component={UserAdd} />
				<Route path='/user/edit' component={UserEdit} />
			</Switch>
        )
    }
}

