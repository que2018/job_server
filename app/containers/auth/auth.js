import React,{Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Switch, Route, Redirect} from 'react-router-dom'
import {bindActionCreators} from 'redux'

import Login from './components/login/Login';
import Logined from './components/logined/Logined';
import NotFound from '../../components/notFound/NotFound';
import {actions as IndexActions} from '../../reducers/index'
import style from './style.css'

class Auth extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {url} = this.props.match;
        const {login, register} = this.props;
		
        return(
            <div>
			  <div className={style.container}>
				<div className={style.contentContainer}>
				  <div className={style.content}>
					<Switch>
					  <Route exact path={url} />
					  <Route component={NotFound} />
					</Switch>
				  </div>
				  <div className={`${style.loginContainer}`}>
					{this.props.userInfo.userId ?
					  <Redirect to='/'/> :
					  <Login login={login} register={register}/>}
				  </div>
				</div>
			  </div>
            </div>
        )
    }
}

Auth.defaultProps = {
    categories:[]
};

Auth.propTypes = {
    categories:PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return{
        categories:state.admin.tags,
        userInfo: state.globalState.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return{
        login: bindActionCreators(IndexActions.get_login, dispatch),
        register: bindActionCreators(IndexActions.get_register, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth)
