import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  getProjectTask,
  updateProjectTask
} from "../../../actions/backlogActions";
import PropTypes from "prop-types";
import axios from 'axios';

class UpdateProjectTask extends Component {
  constructor() {
    super();
  
    this.state = {
      id: "",
      projectSequence: "",
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: "",
      dueDate: "",
      projectIdentifier: "",
      create_At: "",
      errors: {},
      storyType:"", 
      user_id: "",
      membersList: [],
      isAllTeam:false,
      curr_id:""
      
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
   
  }

  componentDidMount() {
    const { backlog_id, pt_id } = this.props.match.params;
    this.props.getProjectTask(backlog_id, pt_id, this.props.history);

    const fetchData = async () => {
      const id = localStorage.getItem("mgr_id");
      const response = await axios.get(`/api/users/${id}`);
      console.log(response.data);
      this.setState({ membersList: response.data });
    };
    fetchData();

    let mgr_id = localStorage.getItem("mgr_id")
    let id = localStorage.getItem("id")
    this.setState({curr_id: id})

    if(mgr_id == id){
      this.setState({isAllTeam: true})
    }
    else{
      this.setState({isAllTeam: false})
    }

    
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

 
   
    const {
      id,
      projectSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectIdentifier,
      create_At,
      storyType,
      user_id,
    } = nextProps.project_task;

    this.setState({
      id,
      projectSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectIdentifier,
      create_At,
      storyType,
      user_id,
    });
  }

  




  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const UpdateProjectTask = {
      id: this.state.id,
      projectSequence: this.state.projectSequence,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      projectIdentifier: this.state.projectIdentifier,
      create_At: this.state.create_At,
      storyType:this.state.storyType,
      user_id: this.state.user_id
    };

    // console.log(UpdateProjectTask);
    this.props.updateProjectTask(
      this.state.projectIdentifier,
      this.state.projectSequence,
      UpdateProjectTask,
      this.props.history
    );
  }

  

  render() {
    const { errors } = this.state;
    return (
      <div className="add-PBI">
      
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/projectBoard/${this.state.projectIdentifier}`}
                className="btn btn-light"
              >
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Update Project Task</h4>
              <p className="lead text-center">
                Project Name: {this.state.projectIdentifier} | Project Task ID:{" "}
                {this.state.projectSequence}{" "}
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.summary
                    })}
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  />
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="storyType"
                  value={this.state.storyType}
                  onChange={this.onChange}
                >
                  <option value="">Select Story Type</option>
                  <option value="Dev">Development Story</option>
                  <option value="Test">Test Story</option>
                </select>
              </div>

              <div className="form-group">
              <select
                className="form-control form-control-lg"
                name="user_id"
                value={this.state.user_id}
                onChange={this.onChange}
              >
              <option value="">Select Asigned to</option>


              { this.state.isAllTeam ? (this.state.membersList.map((member) => (
                (<option key={member.id} value={member.id}>
                  {member.fullName}
                </option>))
              )) : (

                this.state.membersList.map((member) => 
                  {
                    if (member.id==this.state.curr_id || this.state.user_id == member.id)
                    return (
                    <option key={member.id} value={member.id}>
                    {member.fullName}
                  </option>)
                })
                
              ) }
                
              </select>
            </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProjectTask.propTypes = {
  getProjectTask: PropTypes.func.isRequired,
  project_task: PropTypes.object.isRequired,
  updateProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project_task: state.backlog.project_task,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProjectTask, updateProjectTask }
)(UpdateProjectTask);
