import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {Upload, Input, Select, Button, Modal, Icon, message, Form} from 'antd';
import {actions} from '../../../reducers/category/manageCategory';
import dateFormat from 'dateformat'
import style from './style.css'
import reqwest from 'reqwest'


const {add_category , upload_category_image} = actions;  
class CategoryAdd extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            Name: undefined,
            fileList: [],
          };
    }



    // titleOnChange(e) {
    //     this.props.updateTitle(e.target.value)
    // };
	
	// authorOnChange(e) {
    //     this.props.updateAuthor(e.target.value)
    // };
	
	// dateAddedOnChange(e) {
    //     this.props.updateDateAdded(e.target.value)
    // };
	
	// viewCountOnChange(e) {
    //     this.props.updateViewCount(e.target.value)
    // };
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
        // this.props.addCategory(this.state.Name, formData);
        reqwest({
            url: '/api/admin/category/update_category', 
            method: 'post',
            processData: false,
            data: formData,
            success: (result) => {
              message.success('更新成功');
              setTimeout(function () {
                location.replace('/admin/category');
            }, 1000)
            },
            error: (result) => {
              message.error('更新失败.');
            },
        });

    };

    // onChange = (info) => { 

    //      let fileList = info.fileList;
     
        
    //       if (info.file.status === 'done') {
    //         message.success(`${info.file.name} 上传成功`);
    //         fileList = fileList.slice(-1);

    //       } else if (info.file.status === 'error') {
    //         message.error(`${info.file.name} 上传失败.`);
    //         fileList.pop()
    //       }
    //       this.setState({ fileList });
    //       console.log(this.state.fileList)
 
    //   }


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

    //   onChangeInputFile = (event) =>{
    //     console.log(event.target.files)
    //   }

    render() {
        console.log(this.props.url)
        const props = {
            // action: '/api/admin/category/upload_image',
            listType: 'picture',
            name:'image',

            beforeUpload: this.beforeUpload,
            // headers: {
            //     authorization: 'authorization-text',
            //   },
            // defaultFileList: [...fileList],
            multiple: false,
            onChange: this.onChange,
            // customRequest
          };
        
        return (
            <div>
                <h2>更新分类</h2>
                <div className={style.container}>         
                    <span className={style.subTitle}>名称</span>              
                    <Input
                        className={style.titleInput}
                        // defaultValue={0} name=
                        value = {this.state.Name == undefined? this.props.name : this.state.Name}
                        placeholder={'请输入分类名称'}
                        type='text'
                      
                        // value = {this.props.name}
                        onChange={this.onChangeInput} 
                        />
                    <img src = {'https://s3-us-west-1.amazonaws.com/job-upload-imge/' + this.props.url} height="45" width="45" />
                     <span className={style.subTitle}>当前图标</span>
                   
              
                <div>
                   <Upload {...props} fileList={this.state.fileList}>
                   <Button>
                     <Icon type="upload" /> 上传新图片
                   </Button>
                  </Upload>
                  {/* <Input type ='file'  onChange={this.onChangeInputFile} /> */}
                </div>

                    
                    <div className={style.bottomContainer}>
                        <Button type='primary' onClick={this.onUpdateCategory.bind(this)}className={style.buttonStyle}>更新</Button>
                    </div>
                </div>
            </div>




        ) 
    }

}

// PostAdd.propsTypes = {
//     title: PropTypes.string,
// };

// PostAdd.defaultProps = {
//     title: '',
// };

function mapStateToProps(state) {
    const {name,id,url} = state.admin.categoryEdit
    return {
        id,
        name,
        url
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // addCategory: bindActionCreators(add_category, dispatch),
        // uploadCategoryImage:bindActionCreators(upload_category_image, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryAdd)
