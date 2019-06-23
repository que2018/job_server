import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {Input, Select, Button, Modal} from 'antd';
import {actions} from '../../../reducers/customer/customer_add';
import dateFormat from 'dateformat'
import style from './style.css'

const {update_name, update_description, add_customer} = actions;

class CustomerAdd extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    nameOnChange(e) {
        this.props.updateName(e.target.value)
    };
	
	descriptionOnChange(e) {
        this.props.updateDescription(e.target.value)
    };
	
    addCustomer() {
        let customerData = {};
        customerData.name = this.props.name;
        customerData.description = this.props.description;
        this.props.addCustomer(customerData);
    };

    render() {
        return (
            <div>
                <h2>增加客户</h2>
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
					<span className={style.subTitle}>添加日期</span>
                    <div className={style.bottomContainer}>
                        <Button type='primary' onClick={this.addCustomer.bind(this)} className={style.buttonStyle}>添加</Button>
                    </div>
                </div>
            </div>
        ) 
    }

    componentDidMount() {}
}

CustomerAdd.propsTypes = {
    name: PropTypes.string,
    description: PropTypes.string
};

CustomerAdd.defaultProps = {
    name: '',
    description: ''
};

function mapStateToProps(state) {
    const {name, description} = state.admin.customer_add;
    
    return {
        name,
        description
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateName: bindActionCreators(update_name, dispatch),
        updateDescription: bindActionCreators(update_description, dispatch),
        addCustomer: bindActionCreators(add_customer, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerAdd)
