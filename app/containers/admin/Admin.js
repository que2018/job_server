import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import AdminMenu from "../../components/adminMenu/AdminMenu";
import Detail from "../detail/Detail";
import AdminIndex from "../adminIndex/AdminIndex"
import NotFound from "../../components/notFound/NotFound"; 
import style from './style.css'
import {bindActionCreators} from 'redux'
import {actions} from '../../reducers/admin'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Post from "../post/list/Post";
import PostAdd from "../post/add/PostAdd";
import PostEdit from "../post/edit/PostEdit";
import Customer from "../customer/list/Customer";
import CustomerAdd from "../customer/add/CustomerAdd";
import CustomerEdit from "../customer/edit/CustomerEdit";
import AdminLogin from "../adminLogin/AdminLogin";
import AdminManagerUser from "../adminManagerUser/AdminManagerUser";
import AdminNewUserGroup from "../AdminNewUserGroup/AdminNewUserGroup";
import AdminManagerUserGroup from "../AdminManagerUserGroup/AdminManagerUserGroup";
import {Loading} from "../components/loading/Loading"

import listCategory from "../category/list/category"
import addCategory from "../category/add/CategoryAdd"
import editCategory from "../category/edit/CategoryEdit"


const {change_location_admin} = actions;

class Admin extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        const {url} = this.props.match;
		
        console.log(this.props.match)
        // if(this.props.userInfo && this.props.userInfo.userType){
            return (
                <div>
                    {
                       this.props.userInfo.userType === 'admin' ?
                            <div className={style.container}>
                                <div className={style.menuContainer}>
                                    <AdminMenu history={this.props.history}
                                               url={this.props.adminUrl}
                                               changeUrl={this.props.change_location_admin}/>
                                </div>
                             
                                <div className={style.contentContainer}>
                                    <Switch>
                                        <Route exact path={url} component={AdminIndex}/>
										<Route path='/admin/post' component={Post}/>
										<Route path={`${url}/post_add`} component={PostAdd}/>
										<Route path={`${url}/post_edit`} component={PostEdit}/>
										
										<Route path={`${url}/category`} component={listCategory}/>
                                        <Route path={`${url}/category_add`} component={addCategory}/>
                                        <Route path={`${url}/category_edit`} component={editCategory}/>
										
										<Route path={`${url}/customer`} component={Customer}/>
										<Route path={`${url}/customer_add`} component={CustomerAdd}/>
										<Route path={`${url}/customer_edit`} component={CustomerEdit}/>
										
                                        <Route path={`${url}/managerUser`} component={AdminManagerUser}/>
										<Route path={`${url}/newUserGroup`} component={AdminNewUserGroup}/>
										<Route path={`${url}/managerUserGroup`} component={AdminManagerUserGroup}/>
                                        <Route path={`${url}/detail`} component={Detail}/>
                                        <Route component={NotFound}/>
                                    </Switch>
                                </div>           
                                           
                            </div> 
                                       :  this.props.isFetching? <Loading/>:<Redirect to='/login'/>
                            // undefined
                            // : <AdminLogin/>
                            // <Redirect to='/'/>
                    }
                </div>
            )
        // }
        // else{
        //     return <AdminLogin/>
        // }
    }

    //     componentDidMount() {
    //     this.props.user_auth();
    // }
    // componentWillMount(){
    //     this.props.change_location_admin(window.location.pathname.replace(/\/admin/, "")||'/');
    // }
    componentWillReceiveProps() {
        this.props.change_location_admin(window.location.pathname.replace(/\/admin/, "")||'/');
    }
}
Admin.defaultProps = {
    adminUrl: '/'
};

Admin.propTypes = {
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
)(Admin)