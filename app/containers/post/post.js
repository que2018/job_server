import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import PostAdd from "./post_add/PostAdd"
import PostEdit from "./post_edit/PostEdit"
import PostList from "./post_list/PostList"

export default class Post extends Component {

    constructor(props) {
        super(props);  
    }

    render() {
		const {url} = this.props.match;
		
        return (
			<Switch>
				<Route exact path={url} component={PostList} />
				<Route path='/post/add' component={PostAdd} />
				<Route path='/post/edit' component={PostEdit} />
			</Switch>
        )
    }
}



