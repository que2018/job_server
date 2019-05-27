import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import style from './style.css'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {Input, Select, Button, Modal} from 'antd';
import {actions} from '../../../reducers/customer/edit/customer_edit';
import dateFormat from 'dateformat'

const {edit_name, edit_description, update_customer} = actions;

class CustomerEdit extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    nameOnChange(e) {
        this.props.editName(e.target.value)
    };
	
	descriptionOnChange(e) {
        this.props.editDescription(e.target.value)
    };
	
    updateCustomer() {
       let customerData = {};
	    customerData.id = this.props.id;
        customerData.name = this.props.name;
        customerData.description = this.props.description;
		
        this.props.updateCustomer(customerData);
    };

    render() {
        return (
            <div>
                <h2>编辑客户</h2>
                <div className={style.container}>
                    <span className={style.subTitle}>名字</span>
                    <Input
                        className={style.titleInput}
                        placeholder={'请输入名字'}
                        type='text'
                        value={this.props.name}
                        onChange={this.nameOnChange.bind(this)} />
					<span className={style.subTitle}>描述</span>
                    <Input
                        className={style.titleInput}
                        placeholder={'请输入描述'}
                        type='text'
                        value={this.props.description}
                        onChange={this.descriptionOnChange.bind(this)} />
                    <div className={style.bottomContainer}>
                        <Button type='primary' onClick={this.updateCustomer.bind(this)} className={style.buttonStyle}>保存</Button>
                    </div>
                </div>
            </div>
        ) 
    }

    componentDidMount() {}
}

CustomerEdit.propsTypes = {
    name: PropTypes.string,
    description: PropTypes.string
};

CustomerEdit.defaultProps = {
	id: '',
	name: '',
    description: ''
};

function mapStateToProps(state) {
    const {id, name, description} = state.admin.customerEdit;
    
    return {
		id,
		name,
        description
    }
}

function mapDispatchToProps(dispatch) {
    return {
        editName: bindActionCreators(edit_name, dispatch),
        editDescription: bindActionCreators(edit_description, dispatch),
		updateCustomer: bindActionCreators(update_customer, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerEdit)
