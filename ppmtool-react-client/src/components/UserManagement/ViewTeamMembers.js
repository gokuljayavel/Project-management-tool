
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from "react-redux";

export function ViewTeamMembers(props) {


  const retrieveDataFromLocalStorage = () => {
    const data = localStorage.getItem('mgr_id');
    return JSON.parse(data);
  };



    const [members, setmembers] = useState([])

    const id = retrieveDataFromLocalStorage();
 
    useEffect(() => {
        async function fetchData() {
          const response = await axios.get(`/api/users/${id}`);
          setmembers(response.data)
        }
        fetchData();
      }, []);
    
      console.log(members)

    return (
      <>
     {
      members.map(member => {
        return <h1>{member.fullName}</h1>
      })
     }
      </>  
    );
}


const mapStateToProps = (state) => ({
    security: state.security,
  });
  
  export default connect(mapStateToProps)(ViewTeamMembers);
  
