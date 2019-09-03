import React from 'react'
import {Button} from 'antd'
import style from './style.css'

export const UserCell = (props)=>(	
    <div>
      <Button type='primary' icon='edit' className={style.btnEdit} onClick={()=>{props.getUser(props.data._id);props.history.push('/user/edit')}}>编辑</Button>
      <Button type='primary' icon='delete' className={style.btnDel} onClick={()=>{props.deleteUser(props.data._id);}}>删除</Button>
	</div>
);