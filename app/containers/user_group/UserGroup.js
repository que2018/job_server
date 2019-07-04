import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {actions} from '../../reducers/adminManagerUserGroup'
import {Table, Pagination} from 'antd';
import style from './style.css'
import {ManagerUserGroupCell} from "./components/ManagerUserGroupCell";

const {get_all_user_groups, edit_user_group} = actions;

class AdminManagerUserGroup extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        return (
            <div>
                <h2>用户组管理</h2>
				<div className={style.userGroupListContainer}>
                    {
                        this.props.list.map((item,index)=>(
                            <ManagerUserGroupCell
                                edit_user_group={(id)=>this.props.edit_user_group(id)}
                                history={this.props.history}
                                getUserGroupDetail={(id)=>this.props.get_user_group_detail(id)}
                                delete={(id)=>this.props.delete_user_group(id)}
                                key={index} data={item}/>
                        ))
                    }
                </div>
                <div>
                    <Pagination
                        onChange={(pageNum)=>{
                            this.props.getAllUserGroups(pageNum);
                        }}
                        current={this.props.pageNum}
                        total={this.props.total}/>
                </div>
            </div>
        )
    }

    componentDidMount() {
        //缓存
        if(this.props.list.length===0)
            this.props.getAllUserGroups();
    }
}

AdminManagerUserGroup.propsTypes = {
    pageNUm: PropTypes.number.isRequired,
    list: PropTypes.arrayOf(PropTypes.object),
    total:PropTypes.number.isRequired
};

AdminManagerUserGroup.defaultProps = {
    pageNum: 1,
    list: [],
    total:0
};

function mapStateToProps(state) {
    let {pageNum, list,total} = state.admin.user_groups;
    return {
        pageNum,
        list,
        total
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllUserGroups: bindActionCreators(get_all_user_groups, dispatch),
		edit_user_group:bindActionCreators(edit_user_group,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminManagerUserGroup)

