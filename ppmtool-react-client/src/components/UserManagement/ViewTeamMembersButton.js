import React from 'react'
import {Link} from 'react-router-dom'
import style from './../UserManagement/ViewTeamMembersButton.module.css'

export function ViewTeamMembersButton(props) {

  

    return (
        <span className ={style.paddingLeft}>
<Link to="/viewTeamMembers" className="btn btn-lg btn-info mr-2">
            View Team Members
         </Link>
        </span>
    );
}