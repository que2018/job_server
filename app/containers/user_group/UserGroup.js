import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import UserGroupAdd from './user_group_add/UserGroupAdd'
import UserGroupList from './user_group_list/UserGroupList'

export default class UserGroup extends Component {

    constructor(props) {
        super(props);  
    }

    render() {
		const {url} = this.props.match;
		
        return (
		  <Switch>
		    <Route exact path={url} component={UserGroupList} />
			<Route path='/user_group/add' component={UserGroupAdd} />
		  </Switch>
        )
    }
}

