import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Tabs} from 'antd';
import LoginForm from './LoginForm'
import style from './style.css'

const TabPane = Tabs.TabPane;

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        const {login,register} = this.props;
		
        return (
            <div className={style.container}>
              <LoginForm login={login}/>  
            </div>
        )
    }
}


