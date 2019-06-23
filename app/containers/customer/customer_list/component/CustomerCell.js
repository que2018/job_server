import React from 'react'
import {Button} from 'antd'

import style from './style.css'

export const CustomerCell = (props)=>(	
    <div>
      <Button type='primary' icon='edit' className={style.btnEdit} onClick={()=>{props.getCustomer(props.data._id);props.history.push('/admin/customer_edit')}}>编辑</Button>
      <Button type='primary' icon='delete' className={style.btnDel} onClick={()=>{props.deleteCustomer(props.data._id);}}>删除</Button>
	</div>
);