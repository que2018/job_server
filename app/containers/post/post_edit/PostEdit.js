import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import style from './style.css'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {Input, Select, Button, Modal} from 'antd';
import {DatePicker} from 'antd';
import {actions} from '../../../reducers/post/post_edit';
import {actions as action_category_list} from '../../../reducers/category/category_list'

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const {TextArea} = Input;
const Option = Select.Option;
const {update_title, update_author, update_description, update_date_added, update_view_count, update_category, update_post , update_category_id} = actions;
const {get_categories} = action_category_list;

class PostEdit extends Component {
    constructor(props) {
        super(props);
		
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    titleOnChange(e) {
        this.props.updateTitle(e.target.value)
    };
	
	authorOnChange(e) {
        this.props.updateAuthor(e.target.value)
    };
	
	descriptionOnChange(e) {
        this.props.updateDescription(e.target.value)
    };
	
	dateAddedOnChange(e) {
		let d = new Date(e._d);
		
        var month = '' + (d.getMonth() + 1);
        var day = '' + d.getDate();
        var year = d.getFullYear();

		if(month.length < 2) month = '0' + month;
		if(day.length < 2) day = '0' + day;

		let dateFormate = year + "-" + month + "-" + day;

        this.props.updateDateAdded(dateFormate)
    };
	
	viewCountOnChange(e) {
        this.props.updateViewCount(e.target.value)
    };

    categoryOnchange(value){
       console.log(value)
       this.props.updateCategory(value.label)
       this.props.update_category_id(value.key)
    }

    updatePost() {
       let postData = {};
	    postData.id = this.props.id;
        postData.title = this.props.title;
        postData.author = this.props.author;
		postData.description = this.props.description;
		postData.dateAdded = this.props.dateAdded;
        postData.viewCount = this.props.viewCount;
        postData.category = this.props.category;
        postData._category_id = this.props._category_id
        this.props.updatePost(postData);
    };

    render() {		
        return (
            <div>
			  <h2>编辑发布</h2>
			  <div className={style.container}>
				<span className={style.subTitle}>标题</span>
				<Input
					className={style.titleInput}
					placeholder={'请输入标题'}
					type='text'
					value={this.props.title}
					onChange={this.titleOnChange.bind(this)} />	
				<span className={style.subTitle}>作者</span>
				<Input
					className={style.titleInput}
					placeholder={'请输入作者'}
					type='text'
					value={this.props.author}
					onChange={this.authorOnChange.bind(this)} />
				<span className={style.subTitle}>内容</span>
				<TextArea
					className={style.titleInput}
					placeholder={'请输入内容'}
					rows={6}
					value={this.props.description}
					onChange={this.descriptionOnChange.bind(this)} />							
				<span className={style.subTitle}>添加日期</span>
				<DatePicker 
					className={style.titleInput}
					defaultValue={moment(this.props.dateAdded, 'YYYY-MM-DD')}
					onChange={this.dateAddedOnChange.bind(this)}
				/>
				<span className={style.subTitle}>阅读量</span>
				<Input
					className={style.titleInput}
					placeholder={'请输入阅读量'}
					type='text'
					value={this.props.viewCount}
					onChange={this.viewCountOnChange.bind(this)} />
				<div style = {{marginTop :'10px'}}>
				<span className={style.subTitle}>阅读量</span>
				<Select   
					className={style.titleInput}					
					placeholder="请选择分类"                          
					labelInValue 
					value = {{ key:this.props.category}}
					onChange={this.categoryOnchange.bind(this)}>
					{ this.props.categories.map( (item) => 
					<Option key = {item._id}>{item.Name}</Option>
					)}                       
				</Select>
			  </div>	
			  <div className={style.bottomContainer}>
			    <Button type='primary' onClick={this.updatePost.bind(this)} className={style.buttonStyle}>保存</Button>
			  </div>
			</div>
          </div>
        ) 
    }

    componentDidMount() { 
        this.props.get_categories(); 
    }
}

PostEdit.propsTypes = {
	id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
	description: PropTypes.string,
	dateAdded: PropTypes.date,
    viewCount: PropTypes.number,
    category:PropTypes.string,
    _category_id:PropTypes.string
};

PostEdit.defaultProps = {
	id: '',
	title: '',
    author: '',
	description: '',
	dateAdded: '',
    viewCount: 0,
    category:'',
    _category_id:''
};

function mapStateToProps(state) {
    const {id, title, author, description, dateAdded, viewCount, category, _category_id} = state.admin.post_edit;
    
    return {
		id,
		title,
        author,
		description,
        dateAdded,
        category,
        viewCount,
        _category_id,
        categories : state.admin.category_list
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateTitle: bindActionCreators(update_title, dispatch),
        updateAuthor: bindActionCreators(update_author, dispatch),
		updateDescription: bindActionCreators(update_description, dispatch),
        updateDateAdded: bindActionCreators(update_date_added, dispatch),
        updateViewCount: bindActionCreators(update_view_count, dispatch),
        updateCategory: bindActionCreators(update_category, dispatch),
        updatePost: bindActionCreators(update_post, dispatch),
        update_category_id : bindActionCreators(update_category_id, dispatch),
        get_categories: bindActionCreators(get_categories, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostEdit)
