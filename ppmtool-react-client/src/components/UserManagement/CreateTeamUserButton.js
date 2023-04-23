import React from 'react'
import {Link} from 'react-router-dom'
import style from './../UserManagement/CreateTeamUser.module.css'

export function CreateTeamUserButton() {

    const styles = {
        backgroundColor: 'red',
        borderColor: 'red',
      };
    return (
        <span className ={style.paddingLeft}>
<Link to="/createTeamUser" style ={styles} className="btn btn-lg btn-info">
            Add New Team Member
         </Link>
        </span>
    );
}