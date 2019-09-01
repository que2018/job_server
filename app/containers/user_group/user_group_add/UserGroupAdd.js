import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {Input, Select, Button, Modal} from 'antd';
import {actions} from '../../../reducers/user_group/user_group_add'
import style from './style.css'

const {update_name, add_user_group} = actions;

class UserGroupAdd extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    nameOnChange(e) {
        this.props.updateName(e.target.value);
    }
	
	addUserGroup() {
        let userGroupData = {};
        userGroupData.name = this.props.name;
        this.props.addUserGroup(userGroupData);
    };

    render() {
        return (
            <div>
              <h2>新建用户组</h2>
			  <div className={style.container}>
				<span className={style.subTitle}>名称</span>
				<Input
					className={style.titleInput}
					placeholder={'请输入名称'}
					type='text'
					value={this.props.name}
					onChange={this.nameOnChange.bind(this)} />
				<div className={style.bottomContainer}>
			      <Button type='primary' onClick={this.addUserGroup.bind(this)} className={style.buttonStyle}>保存</Button>
				</div>
			  </div>
            </div>
        )
    }
}

UserGroupAdd.propsTypes = {
    name: PropTypes.string
};

UserGroupAdd.defaultProps = {
    name: ''
};

function mapStateToProps(state) {
    const {name} = state.admin.user_group_add;
    
    return {
        name
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateName: bindActionCreators(update_name, dispatch),
		addUserGroup: bindActionCreators(add_user_group, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserGroupAdd)

