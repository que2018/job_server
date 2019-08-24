import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, Pagination} from 'antd';
import {actions} from '../../reducers/user_group/user_group_list'
import {UserGroupCell} from "./components/UserGroupCell";
import style from './style.css'

const {get_all_user_groups, edit_user_group} = actions;

class UserListGroup extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        return (
            const columns = [{
				title:'名字',
				dataIndex:'name',
				key:'name',
				width: 100
			}, 
			{
				title:'描述',
				dataIndex:'description',
				key:'description',
				width: 100
			}, 
			{
				title: '操作',
				key: 'action',
				width: 100,
				render: (text, record) => (	
					 <UserGroupCell
						edit_user_group={(id)=>this.props.edit_user_group(id)}
						history={this.props.history}
						get_user_group={(id)=>this.props.get_user_group(id)}
						delete={(id)=>this.props.delete_user_group(id)}
						key={index} 
						data={item}
					/>
				)
			}];

			return (	
				<div>
				  <Row className={style.titleRow}>
					<Col span={12}><h2>客户组管理</h2></Col>
					<Col span={12}><Button type="primary" icon="plus" className={style.btnAdd} onClick={()=>{this.props.history.push('/user_group/add')}}/></Col>
				  </Row>
				  <Table rowKey="name" columns={columns} dataSource={this.props.customerList} />
				</div>
			)
			
			
			<!--<div>
                <h2>用户组管理</h2>
				<div className={style.userGroupListContainer}>
                    {
                        this.props.list.map((item,index)=>(
                            <UserGroupCell
                                edit_user_group={(id)=>this.props.edit_user_group(id)}
                                history={this.props.history}
                                getUserGroupDetail={(id)=>this.props.get_user_group_detail(id)}
                                delete={(id)=>this.props.delete_user_group(id)}
                                key={index} 
								data={item}
							/>
                        ))
                    }
                </div>
                <div>
                    <Pagination
                        onChange={(pageNum)=>{
                            this.props.get_user_groups(pageNum);
                        }}
                        current={this.props.pageNum}
                        total={this.props.total}/>
                </div>
            </div>-->
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
    let {pageNum, list,total} = state.admin.user_groups;
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

