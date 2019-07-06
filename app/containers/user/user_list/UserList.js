import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {actions} from '../../../reducers/user/user_list'
import {Table, Row, Col} from 'antd';
import {Button} from 'antd'
import style from './style.css'

const {get_all_users} = actions;

class UserList extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
		const columns = [
			{
				title: '姓名',
				dataIndex: 'username',
				key: 'name',
				render: text => <a href="#">{text}</a>,
			}, {
				title: 'ID',
				dataIndex: '_id',
				key: 'ID',
			}, {
				title: '密码(加密后)',
				dataIndex: 'password',
				key: 'password',
			}
			, {
				title: '身份',
				dataIndex: 'type',
				key: 'address',
			}
		];
		
        return (
		  <div>
		    <Row className={style.titleRow}>
			  <Col span={12}><h2>用户管理</h2></Col>
			  <Col span={12}><Button type="primary" icon="plus" className={style.btnAdd} onClick={()=>{this.props.history.push('/user/add')}}/></Col>
		    </Row>	
		    <Table pagination={true} columns={columns} dataSource={this.props.list} />
		  </div>
        )
    }

    componentDidMount() {
        if(this.props.list.length === 0)
            this.props.getAllUsers();
    }
}

UserList.propsTypes = {
    pageNUm: PropTypes.number.isRequired,
    list: PropTypes.arrayOf(PropTypes.object),
    total:PropTypes.number.isRequired
};

UserList.defaultProps = {
    pageNum: 1,
    list: [],
    total:0
};

function mapStateToProps(state) {
    let {pageNum, list,total} = state.admin.users;
	
    return {
        pageNum,
        list,
        total
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllUsers: bindActionCreators(get_all_users, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList)

