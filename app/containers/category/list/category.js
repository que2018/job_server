import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {actions} from '../../../reducers/category/manageCategory'
import {Table, Pagination} from 'antd';
import {Divider, Tag} from 'antd';
import {Row, Col} from 'antd';
import {Button} from 'antd'

import {CategoryCell} from './component/CategoryCell';
import style from './style.css'

const {get_categorys, delete_category} = actions;

class Category extends Component {

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state={
            categorys: ['其他',],
        }
    }
    
    render() {
		const columns = [{
			title:'名称',
			dataIndex:'Name',
			key:'Name',
			width: 500
		}, 
		{
			title: '操作',
			key: 'action',
			width: 100,
			render: (text, record) => (	
				<CategoryCell
					delete = {(id) => {
						this.props.delete_category(record._id); 
					}}					
					history= {this.props.history}
					data={record} />
			)
		}];

        return (	
            <div>
			  <Row className={style.titleRow}>
			    <Col span={12}><h2>分类管理</h2></Col>
			    <Col span={12}><Button type="primary" icon="plus" className={style.btnAdd} onClick={()=>{this.props.history.push('/admin/category_add')}}/></Col>
			  </Row>
			  <Table columns={columns} dataSource={this.props.category} />
            </div>
        )
    }

    componentDidMount() {
        this.props.get_categorys();
    }
}

function mapStateToProps(state) {
    return{
           category:state.admin.category
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_categorys: bindActionCreators(get_categorys, dispatch),
		delete_category: bindActionCreators(delete_category, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category)

