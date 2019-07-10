import React from 'react'
import {Button} from 'antd'
import style from './style.css'

export const UserCell = (props)=>(	
    <div>
      <Button  type='primary' icon='edit' className={style.btnEdit} 
      onClick={()=>{
		props.history.push('/category/edit')
      }}
      >
      编辑
      </Button>
	</div>
);