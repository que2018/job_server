import React, {Component} from 'react'
import {Menu, Icon} from 'antd'
const {SubMenu} = Menu

export default class DashboardMenu extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
			  <Menu
				selectedKeys={[this.props.url]}
				mode="inline"
				theme="dark"
				onClick={({key}) => {
					this.props.changeUrl(key);
					this.props.history.push(`${key}`)
				}}
			  >	
			    <Menu.Item key='/'>
				  <Icon type='home' />
				  <span>首页</span>				  
			    </Menu.Item>
			    <Menu.Item key='/post'>
				  <Icon type='appstore' />
				  <span>发布管理</span>				  
			    </Menu.Item>
			    <Menu.Item key='/category'>
				  <Icon type='tags' />
				  <span>分类管理</span>				  
			    </Menu.Item>
			    <Menu.Item key='/customer'>
				  <Icon type='file-text' />
				  <span>客户管理</span>				  
			    </Menu.Item>
			    <SubMenu
				  title={
				    <span>
					  <Icon type="usergroup-add" />
					  <span>用户</span>
				    </span>
				  }  
			    >
				  <Menu.Item key='/user'>用户</Menu.Item>
				  <Menu.Item key='/user_group'>用户组</Menu.Item>
			    </SubMenu>
			  </Menu>	
            </div>
        )
    }
}
