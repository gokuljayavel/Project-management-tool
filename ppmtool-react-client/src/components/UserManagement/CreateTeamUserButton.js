import React from 'react'
import {Link} from 'react-router-dom'
import style from './../UserManagement/CreateTeamUser.module.css'

export function CreateTeamUserButton(props) {

    const styles_enabled = {
        borderColor: 'red',
        backgroundColor: 'red'
      };
      const styles_disabled = {
        borderColor: '#F19A9A',
        backgroundColor: '#F19A9A',
        pointerEvents: "none"
      };

      if (props.isEnabled)
      {
    return (
        <span className ={style.paddingLeft}>
<Link to="/createTeamUser" style ={styles_enabled} className="btn btn-lg btn-info">
            Add New Team Member
         </Link>
        </span>
    );}

    else{
        return (
            <span className ={style.paddingLeft}>
    <a to="#" style ={styles_disabled} className="btn btn-lg btn-info"><a/>
                Add New Team Member
             </a>
            </span>
        );
    }
}