import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {Input, Select, Button, Modal} from 'antd';
import {actions} from "../../../reducers/adminManagerNewUserGroup";
import dateFormat from 'dateformat'
import style from './style.css'

const {update_name, update_description, save_user_group} = actions;
const Option = Select.Option;

class UserAdd extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            options: [],
            modalVisible: false
        };
    }

    //正文内容
    onChanges(e) {
        this.props.update_description(e.target.value);
    }

    //标题输入框
    nameOnChange(e) {
        this.props.update_name(e.target.value)
    };
	
	//描述输入框
    descriptionOnChange(e) {
        this.props.update_description(e.target.value)
    };

    //保存
    saveUserGroup() {
        let userGroupData = {};
        userGroupData.name = this.props.name;
        userGroupData.description = this.props.description;
        this.props.save_user_group(userGroupData);
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
                    <span className={style.subTitle}>描述</span>
                    <textarea className={style.textArea} value={this.props.description} onChange={this.descriptionOnChange.bind(this)} />
                    <div className={style.bottomContainer}>
                        <Button type="primary" className={style.buttonStyle} onClick={this.saveUserGroup.bind(this)}>保存</Button>
                    </div>
                </div>
            </div>

        )
    }

    componentDidMount() {
        //this.props.get_all_tags();
    }
}

UserAdd.propsTypes = {
    name: PropTypes.string,
    description: PropTypes.string
};

UserAdd.defaultProps = {
    name: '',
    description: ''
};

function mapStateToProps(state) {
    const {name, description} = state.admin.newUserGroup;
    
    return {
        name,
        description
    }
}

function mapDispatchToProps(dispatch) {
    return {
        update_name: bindActionCreators(update_name, dispatch),
        update_description: bindActionCreators(update_description, dispatch),
        save_user_group: bindActionCreators(save_user_group, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserAdd)

