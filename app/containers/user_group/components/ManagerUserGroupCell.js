import style from '../style.css'
import React from 'react'
import {Button} from 'antd'

export const ManagerUserGroupCell = (props)=>(
    <div className={style.cellContainer}>
		<div className={style.cellAboutUserGroup}>     
			<p>{props.data.name}</p>
        </div>
		<div className={style.cellState}>
            <p>{props.data.description}</p>
        </div>
        <div className={style.cellOperation}>
            <Button type='primary' icon="edit" onClick={()=>{props.edit_user_group(props.data._id);props.history.push('/admin/newUserGroup')}}>编辑</Button>
        </div>
    </div>
);