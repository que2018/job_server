import React, {Component, PropTypes} from 'react'
import PureRenderMixiin from 'react-addons-pure-render-mixin'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {notification} from 'antd';

import NotFound from '../components/notFound/NotFound';
import {Loading} from './components/loading/Loading'
import Dashboard from './dashboard/dashboard';
import Auth from './auth/auth'
import {actions} from '../reducers'
import './index.css'

const {clear_msg, user_auth} = actions;

class AppIndex extends Component {

    constructor(props) {
        super(props);
        this.openNotification = this.openNotification.bind(this);
    }

    componentDidMount() {
        this.props.user_auth();
    }

    openNotification(type, message) {
        let that = this;
		
        notification[type]({
            message: message,
            onClose: () => {
                that.props.clear_msg();
            }
        });
        that.props.clear_msg();
    };

    render() {
        let {isFetching} = this.props;

        return (
            <Router>
              <div>
			    <Switch>
				  <Route path='/login' component={Auth} />
				  <Route path='/' component={Dashboard} />
				  <Route component={NotFound} />
				</Switch>
				{isFetching && <Loading/>}
				{this.props.notification && this.props.notification.content ?
					(this.props.notification.type === 1 ?
						this.openNotification('success', this.props.notification.content) :
						this.openNotification('error', this.props.notification.content)) :
					null}
              </div>
            </Router> 
        )
    }
}

function mapStateToProps(state) {
    return {
        notification: state.globalState.msg,
        isFetching: state.globalState.isFetching,
        userInfo: state.globalState.userInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clear_msg: bindActionCreators(clear_msg, dispatch),
        user_auth: bindActionCreators(user_auth, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppIndex)