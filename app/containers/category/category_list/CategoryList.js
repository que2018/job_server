import React,{Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, Row, Col, Pagination} from 'antd';
import {Button, Divider, Tag} from 'antd';
import {actions} from '../../../reducers/category/category_list'
import {CategoryCell} from './component/CategoryCell';
import style from './style.css'

const {get_categories, delete_category, get_category} = actions;

class Category extends Component {

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state={
            categories: []
        }
    }
    
    render() {
		const columns = [{
			title:'名称',
			dataIndex:'Name',
			key:'name',
			width: 1000
		}, 
		{
			title:'图标',
			dataIndex:'ImageUrl',
			key:'image_url',
			width: 1000,
			alien: 'center',
			render: (record) => (	
		      <img src={record} height='40' width='40' />
			)
		}, 
		{
			title: '操作',
			key: 'action',
			width: 500,
			render: (text, record) => (	
				<CategoryCell
					delete = {() => {
						this.props.delete_category(record._id , record.ImageUrl); 
					}}	
					getCategory = {() => {
						this.props.get_category(record._id)
					}}			
					history = {this.props.history}
					data={record} />
			)
		}];

        return (	
            <div>
			  <Row className={style.titleRow}>
			    <Col span={12}><h2>分类管理</h2></Col>
			    <Col span={12}><Button type="primary" icon="plus" className={style.btnAdd} onClick={()=>{this.props.history.push('/category/add')}}/></Col>
			  </Row>
			  <Table rowKey="Name" pagination = {true} columns={columns} dataSource={this.props.category_list} />
            </div>
        )
    }

    componentDidMount() {
        if(this.props.category_list.length === 0)
            this.props.get_categories();
    }
}

function mapStateToProps(state) {
    return {
        category_list:state.admin.category_list
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_categories: bindActionCreators(get_categories, dispatch),
		get_category: bindActionCreators(get_category, dispatch),
		delete_category: bindActionCreators(delete_category, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category)

