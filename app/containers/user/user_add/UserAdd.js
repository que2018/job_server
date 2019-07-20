import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {Input, Select, Button, Modal} from 'antd';
import {actions} from '../../../reducers/user/user_add'
import style from './style.css'

const {update_name, add_user} = actions;

class UserAdd extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    nameOnChange(e) {
        this.props.updateName(e.target.value);
    }
	
	addUser() {
        let userData = {};
        userData.name = this.props.name;
        this.props.addUser(userData);
    };

    render() {
        return (
            <div>
              <h2>新建用户</h2>
			  <div className={style.container}>
				<span className={style.subTitle}>名称</span>
				<Input
					className={style.titleInput}
					placeholder={'请输入名称'}
					type='text'
					value={this.props.name}
					onChange={this.nameOnChange.bind(this)} />
				<div className={style.bottomContainer}>
			      <Button type='primary' onClick={this.addUser.bind(this)} className={style.buttonStyle}>保存</Button>
				</div>
			  </div>
            </div>
        )
    }
}

UserAdd.propsTypes = {
    name: PropTypes.string
};

UserAdd.defaultProps = {
    name: ''
};

function mapStateToProps(state) {
    const {name} = state.admin.user_add;
    
    return {
        name
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateName: bindActionCreators(update_name, dispatch),
		addUser: bindActionCreators(add_user, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserAdd)

