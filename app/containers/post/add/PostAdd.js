import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {Input, Select, Button, Modal} from 'antd';
import {actions} from '../../../reducers/post/postAdd';
import dateFormat from 'dateformat'
import style from './style.css'

const {TextArea} = Input;
const {update_title, update_author, update_description, update_date_added, update_view_count, add_post} = actions;

class PostAdd extends Component {
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
        this.props.updateDateAdded(e.target.value)
    };
	
	viewCountOnChange(e) {
        this.props.updateViewCount(e.target.value)
    };

    addPost() {
        let postData = {};
        postData.title = this.props.title;
        postData.author = this.props.author;
		postData.description = this.props.description;
		postData.dateAdded = this.props.dateAdded;
        postData.viewCount = this.props.viewCount;
		
        this.props.addPost(postData);
    };

    render() {
        return (
            <div>
                <h2>增加发布</h2>
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
                    <Input
                        className={style.titleInput}
                        placeholder={'请输入添加日期'}
                        type='text'
                        value={this.props.dateAdded}
                        onChange={this.dateAddedOnChange.bind(this)} />
					<span className={style.subTitle}>阅读量</span>
                    <Input
                        className={style.titleInput}
                        placeholder={'请输入阅读量'}
                        type='text'
                        value={this.props.viewCount}
                        onChange={this.viewCountOnChange.bind(this)} />
                    <div className={style.bottomContainer}>
                        <Button type='primary' onClick={this.addPost.bind(this)}className={style.buttonStyle}>添加</Button>
                    </div>
                </div>
            </div>
        ) 
    }

    componentDidMount() {}
}

PostAdd.propsTypes = {
    title: PropTypes.string,
    author: PropTypes.string,
	description: PropTypes.date,
	dateAdded: PropTypes.string,
    viewCount: PropTypes.number
};

PostAdd.defaultProps = {
    title: '',
    author: '',
	description: '',
	dateAdded: '',
	viewCount: 0
};

function mapStateToProps(state) {
    const {title, author, description, dateAdded, viewCount} = state.admin.postAdd;
    
    return {
        title,
        author,
		description,
		dateAdded,
		viewCount
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateTitle: bindActionCreators(update_title, dispatch),
        updateAuthor: bindActionCreators(update_author, dispatch),
		updateDescription: bindActionCreators(update_description, dispatch),
        updateDateAdded: bindActionCreators(update_date_added, dispatch),
        updateViewCount: bindActionCreators(update_view_count, dispatch),
        addPost: bindActionCreators(add_post, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostAdd)
