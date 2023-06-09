import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProject, getProject } from "../../actions/projectActions";

class ProjectItem extends Component {
  onDeleteClick = id => {
    this.props.deleteProject(id);
    var ID = localStorage.getItem("id")
    this.props.getProject(ID);
  };

  render() {
    
    const style_disabled ={
      color: "grey"
    }
    const { project } = this.props;
    const role = this.props.role;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{project.projectIdentifier}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{project.projectName}</h3>
              <p>{project.description}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link to={`/projectBoard/${project.projectIdentifier}`}>
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1"> Project Board </i>
                  </li>
                </Link>

                {(role=="Manager") ?
                (<Link to={`/updateProject/${project.projectIdentifier}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update Project Info</i>
                  </li>
                </Link>):(<a to={`#`}>
                <li className="list-group-item">
                  <i style= {style_disabled} className="fa fa-edit pr-1"> Update Project Info</i>
                </li>
              </a> )
                }
{



    (role=="Manager") ? (<li
    className="list-group-item delete"
    onClick={this.onDeleteClick.bind(
      this,
      project.projectIdentifier
    )}
  >
    <i className="fa fa-minus-circle pr-1"> Delete Project</i>
  </li>) : (
    <li
    className="list-group-item"
  >
    <i style= {style_disabled} className="fa fa-minus-circle pr-1"> Delete Project</i>
  </li>
  )



}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectItem.propTypes = {
  deleteProject: PropTypes.func.isRequired,
  getProject : PropTypes.func.isRequired
};
const mapStateToProps = state => ({

  role: state.security.user.role
});

export default connect(
  mapStateToProps,
  { deleteProject , getProject}
)(ProjectItem);
