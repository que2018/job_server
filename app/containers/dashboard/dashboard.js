import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Switch, Route, Redirect} from 'react-router-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import DashboardMenu from '../../components/dashboard_menu/DashboardMenu';
import NotFound from '../../components/notFound/NotFound'; 
import Home from '../home/Home'
import Post from "../post/post";
import Category from '../category/category';
import Customer from '../customer/Customer';
import AdminManagerUser from '../adminManagerUser/AdminManagerUser';
import AdminNewUserGroup from '../AdminNewUserGroup/AdminNewUserGroup';
import AdminManagerUserGroup from '../AdminManagerUserGroup/AdminManagerUserGroup';
import {Loading} from '../components/loading/Loading'
import {actions} from '../../reducers/admin'
import style from './style.css'

const {change_location_admin} = actions;

class Dashboard extends Component {
	
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        const {url} = this.props.match;
		
		return (
			<div>
				{
				   this.props.userInfo.userType === 'admin' ?
						<div className={style.container}>
							<div className={style.menuContainer}>
								<DashboardMenu history={this.props.history}
									url={this.props.adminUrl}
									changeUrl={this.props.change_location_admin}/>
							</div>
							<div className={style.contentContainer}>
								<Switch>
									<Route exact path={url} component={Home} />
									<Route path='/post' component={Post} />
									<Route path='/category' component={Category} />
									<Route path='/customer' component={Customer} />
									<Route component={NotFound} />
								</Switch>
							</div>           
									   
						</div> 
								   :  this.props.isFetching? <Loading/>:<Redirect to='/login'/>
				}
			</div>
		)
    }

    componentWillReceiveProps() {
        this.props.change_location_admin(window.location.pathname.replace(/\/admin/, "")||'/');
    }
}

Dashboard.defaultProps = {
    adminUrl: '/'
};

Dashboard.propTypes = {
    adminUrl: PropTypes.string,
    change_location_admin: PropTypes.func
};

function mapStateToProps(state) {
    const {url} = state.admin.adminGlobalState;
    return {
        isFetching: state.globalState.isFetching,
        adminUrl: url,
        userInfo:state.globalState.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        change_location_admin: bindActionCreators(change_location_admin, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)
