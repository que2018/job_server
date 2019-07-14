import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import remark from 'remark'
import reqwest from 'reqwest'
import reactRenderer from 'remark-react'
import dateFormat from 'dateformat'
import {Upload, Input, Select, Button, Modal, Icon, message, Form} from 'antd';
import {actions} from '../../../reducers/category/category_edit';
import style from './style.css'
       
class CategoryEdit extends Component {
    constructor(props) {
        super(props);
		
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            Name: undefined,
            fileList: [],
        };
    }

    onChangeInput = (e) => {
        this.setState({ Name: e.target.value });
    }

    onUpdateCategory() {   
		let name =  this.state.Name == undefined? this.props.name:this.state.Name
        const { fileList } = this.state;
        const formData = new FormData();
        formData.append('id', this.props.id)
        formData.append('name', name)
        formData.append('url', this.props.url)
        fileList.forEach((file) => {
           formData.append('image', file);     
        });
		
        reqwest({
            url: '/api/admin/category/update_category', 
            method: 'post',
            processData: false,
            data: formData,
            success: (result) => {
				message.success('更新成功');
				setTimeout(function () {
					location.replace('/category');
				}, 1000)
            },
            error: (result) => {
              message.error('更新失败.');
            },
        });
    };

    beforeUpload = (file) => {
        const r = new FileReader();
        r.readAsDataURL(file);
		
        r.onload = e => {
          file.thumbUrl = e.target.result;
          this.setState(state => ({
            fileList: [file],
          }));
        };
		
        return false;
    }

    render() {
        const props = {
            listType: 'picture',
            name:'image',
            beforeUpload: this.beforeUpload,
            multiple: false,
            onChange: this.onChange
        };
        
        return (
            <div>
              <h2>编辑分类</h2>
              <div className={style.container}>         
                <span className={style.subTitle}>名称</span>              
				<Input
					className={style.titleInput}
					value = {this.state.Name == undefined? this.props.name : this.state.Name}
					placeholder={'请输入分类名称'}
					type='text'				  
					onChange={this.onChangeInput} 
					/>
                <img src = {this.props.url} height="45" width="45" />
                <span className={style.subTitle}>当前图标</span>
                <div>
                   <Upload {...props} fileList={this.state.fileList}>
                   <Button>
                     <Icon type="upload" /> 上传新图片
                   </Button>
                  </Upload>
                </div> 
				<div className={style.bottomContainer}>
				  <Button type='primary' onClick={this.onUpdateCategory.bind(this)}className={style.buttonStyle}>更新</Button>
				</div>
              </div>
            </div>
        ) 
    }
}

function mapStateToProps(state) {
    const {name,id,url} = state.admin.category_edit
	
    return {
        id,
        name,
        url
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryEdit)
