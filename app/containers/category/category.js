import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import CategoryEdit from "./category_edit/CategoryEdit"
import CategoryList from "./category_list/CategoryList"

export default class Category extends Component {

    constructor(props) {
        super(props);  
    }

    render() {
		const {url} = this.props.match;
		
        return (
			<Switch>
				<Route exact path={url} component={CategoryList} />
				<Route path='/category/edit' component={CategoryEdit} />
			</Switch>
        )
    }
}



