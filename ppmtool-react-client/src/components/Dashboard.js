import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import { CreateTeamUserButton } from "./UserManagement/CreateTeamUserButton";
import { connect } from "react-redux";
import { getProject } from "../actions/projectActions";
import PropTypes from "prop-types";
import {ViewTeamMembersButton} from "./UserManagement/ViewTeamMembersButton"

class Dashboard extends Component {
//  constructor(){
//   super();
  
//  }

  componentDidMount() {
    
    this.props.getProject(this.props.security.id);
    
    
  }
  render() {
    
    const role = this.props.role;
    const  projects  = this.props.project.project;
    const id = this.props.id;
    
    const saveDataToLocalStorage = (data) => {
      localStorage.setItem('id', id);
    };
    saveDataToLocalStorage()

   

    return (

      <div className="projects">
      
      <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />
              <ViewTeamMembersButton/>
             
              { role == "Manager" ?
              <CreateProjectButton isEnabled={true}/>:  <CreateProjectButton isEnabled={false}/>
            }
              { role == "Manager" ?
                <CreateTeamUserButton isEnabled={true}/>:  <CreateTeamUserButton isEnabled={false}/>
              }
             
              <br />
              <hr />

              {(Array.isArray(projects) && projects.length!=0) && projects.map(project => (
                <ProjectItem key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  project: PropTypes.object.isRequired,
  getProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  project: state.project,
  security: state.security.user,
  role: state.security.user.role,
  id: state.security.user.id, 

});

export default connect(
  mapStateToProps,
  { getProject }
)(Dashboard);
