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
            Name: '',
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

    onAddCategory() {     
        // console.log(this.state)
        // console.log(this.state.fileList)
        //  this.props.addCategory(this.state.Name,this.state.fileList[0]);
         const { fileList } = this.state;
         const formData = new FormData();
         fileList.forEach((file) => {
           formData.append('image', file);     
         });
         formData.append('name',this.state.Name)

        // this.props.addCategory(this.state.Name, formData);
        reqwest({
            url: '/api/admin/category/add_category', 
            method: 'post',
            processData: false,
            data: formData,
            success: (result) => {
              message.success('添加成功');
              setTimeout(function () {
                location.replace('/admin/category');
            }, 1000)
            },
            error: (result) => {
              message.error('添加失败.');
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
                <h2>添加分类</h2>
                <div className={style.container}>
                    <span className={style.subTitle}>名称</span>
                    <Input
                        className={style.titleInput}
                        placeholder={'请输入分类名称'}
                        type='text'
                        value={this.state.Name}
                        onChange={this.onChangeInput} 
                        />
                <div>
                   <Upload {...props} fileList={this.state.fileList}>
                   <Button>
                     <Icon type="upload" /> 请上传分类图片
                   </Button>
                  </Upload>
                  {/* <Input type ='file'  onChange={this.onChangeInputFile} /> */}
                </div>

                    
                    <div className={style.bottomContainer}>
                        <Button type='primary' onClick={this.onAddCategory.bind(this)}className={style.buttonStyle}>添加</Button>
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
    const {title} = state.admin.postAdd;  
    return {
        title
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addCategory: bindActionCreators(add_category, dispatch),
        // uploadCategoryImage:bindActionCreators(upload_category_image, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryAdd)
