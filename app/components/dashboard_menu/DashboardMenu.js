import React, {Component} from 'react'
import {Menu, Icon} from 'antd'

const menus = [
    {url: '/', name: '首页', iconType: 'home'},
	{url: '/post', name: '发布管理', iconType: 'appstore'},
	{url: '/category', name: '分类管理', iconType: 'tags'},
	{url: '/customer', name: '客户管理', iconType: 'file-text'},
    {url: '/user', name: '用户管理', iconType: 'user-add'},
	{url: '/user_group', name: '用户组管理', iconType: 'usergroup-add'},
];

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
                    {
                        menus.map((item, index) =>
                            <Menu.Item key={item.url} >
                                <Icon type={item.iconType}/>
                                <span>{item.name}</span>
                            </Menu.Item>)
                    }

                </Menu>
            </div>
        )
    }
}
