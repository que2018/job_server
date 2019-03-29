import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {actions} from '../../../reducers/post/post'
import {Table, Pagination} from 'antd';
import {Divider, Tag} from 'antd';
import {Row, Col} from 'antd';
import {Button} from 'antd'

import {PostCell} from './component/postCell';
import style from './style.css'

const {get_posts, get_post, delete_post} = actions;

class Post extends Component {

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
		const columns = [{
			title:'标题',
			dataIndex:'title',
			key:'title',
			width: 100
		}, 
		{
			title:'作者',
			dataIndex:'author',
			key:'author',
			width: 100
		}, 
		{
			title:'添加时间',
			dataIndex:'dateAdded',
			key:'dateAdded',
			width: 100
		}, 
		{
			title:'阅读量',
			dataIndex:'viewCount',
			key:'viewCount',
			width: 100
		},  

		{
			title:'分类',
			dataIndex:'category',
			key:'category',
			width: 100
		},  

		{
			title: '操作',
			key: 'action',
			width: 100,
			render: (text, record) => (	
				<PostCell
					getPost={(id)=>this.props.getPost(record._id)}		
					deletePost={(id)=>this.props.deletePost(record._id)}					
					history={this.props.history}
					data={record} />
			)
		}];

        return (	
            <div>
			  <Row className={style.titleRow}>
			    <Col span={12}><h2>发布管理</h2></Col>
			    <Col span={12}><Button type="primary" icon="plus" className={style.btnAdd} onClick={()=>{this.props.history.push('/admin/post_add')}}/></Col>
			  </Row>
			  <Table columns={columns} dataSource={this.props.postList} />
            </div>
        )
    }

    componentDidMount() {
        if(this.props.postList.length === 0)
            this.props.getPosts();
    }
}

Post.propsTypes = {
    pageNUm: PropTypes.number.isRequired,
    postList: PropTypes.arrayOf(PropTypes.object),
    total:PropTypes.number.isRequired
};

Post.defaultProps = {
    pageNum: 1,
    postList: [],
    total: 0
};

function mapStateToProps(state) {
    let {pageNum, postList, total} = state.admin.posts;
	
    return {
        pageNum,
        postList,
        total
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPosts: bindActionCreators(get_posts, dispatch),
		getPost: bindActionCreators(get_post, dispatch),
		deletePost: bindActionCreators(delete_post, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)

