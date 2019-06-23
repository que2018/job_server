import React from 'react'
import {Button} from 'antd'

import style from './style.css'

export const PostCell = (props)=>(	
    <div>
      <Button type='primary' icon='edit' className={style.btnEdit} onClick={()=>{props.getPost(props.data._id);props.history.push('/post/edit')}}>编辑</Button>
      <Button type='primary' icon='delete' className={style.btnDel} onClick={()=>{props.deletePost(props.data._id);}}>删除</Button>
	</div>
);