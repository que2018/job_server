import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, Row, Col, Pagination} from 'antd';
import {Button} from 'antd';
import {actions} from '../../../reducers/user_group/user_group_list'
import {UserGroupCell} from './components/UserGroupCell';
import style from './style.css'

const {get_all_user_groups, edit_user_group} = actions;

class UserListGroup extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
		const columns = [{
			title:'名称',
			dataIndex:'name',
			key:'name',
			width: 100
		}, 
		{
			title: '操作',
			key: 'action',
			width: 100
		}];

		return (	
			<div>
			  <Row className={style.titleRow}>
				<Col span={12}><h2>客户组管理</h2></Col>
				<Col span={12}><Button type='primary' icon='plus' className={style.btnAdd} onClick={()=>{this.props.history.push('/user_group/add')}}/></Col>
			  </Row>
			  <Table rowKey='name' columns={columns} dataSource={this.props.list} />
			</div>
		)
    }

    componentDidMount() {
        if(this.props.list.length===0)
            this.props.get_user_groups();
    }
}

UserListGroup.propsTypes = {
    pageNUm: PropTypes.number.isRequired,
    list: PropTypes.arrayOf(PropTypes.object),
    total:PropTypes.number.isRequired
};

UserListGroup.defaultProps = {
    pageNum: 1,
    list: [],
    total:0
};

function mapStateToProps(state) {
    let {pageNum, list, total} = state.admin.user_group_list;
    return {
        pageNum,
        list,
        total
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_user_groups: bindActionCreators(get_all_user_groups, dispatch),
		edit_user_group:bindActionCreators(edit_user_group,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserListGroup)

