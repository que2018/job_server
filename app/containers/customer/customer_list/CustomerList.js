import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, Pagination} from 'antd';
import {Row, Col} from 'antd';
import {Button} from 'antd'

import {CustomerCell} from './component/customerCell'
import {actions} from '../../../reducers/customer/customer_list'
import style from './style.css'

const {get_customers, get_customer, delete_customer} = actions

class CustomerList extends Component {

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
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
				<CustomerCell
					getCustomer={(id)=>this.props.getCustomer(record._id)}		
					deleteCustomer={(id)=>this.props.deleteCustomer(record._id)}					
					history={this.props.history}
					data={record} />
			)
		}];

        return (	
            <div>
			  <Row className={style.titleRow}>
			    <Col span={12}><h2>客户管理</h2></Col>
			    <Col span={12}><Button type="primary" icon="plus" className={style.btnAdd} onClick={()=>{this.props.history.push('/admin/customer_add')}}/></Col>
			  </Row>
			  <Table columns={columns} dataSource={this.props.customerList} />
            </div>
        )
    }

    componentDidMount() {
        if(this.props.customerList.length === 0)
            this.props.getCustomers();
    }
}

CustomerList.propsTypes = {
    pageNUm: PropTypes.number.isRequired,
    customerList: PropTypes.arrayOf(PropTypes.object),
    total:PropTypes.number.isRequired
};

CustomerList.defaultProps = {
    pageNum: 1,
    customerList: [],
    total: 0
};

function mapStateToProps(state) {
    let {pageNum, customerList, total} = state.admin.customer_list;
	
    return {
        pageNum,
        customerList,
        total
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCustomers: bindActionCreators(get_customers, dispatch),
		getCustomer: bindActionCreators(get_customer, dispatch),
		deleteCustomer: bindActionCreators(delete_customer, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerList)

