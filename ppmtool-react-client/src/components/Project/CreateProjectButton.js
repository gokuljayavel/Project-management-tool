import React from "react";
import { Link } from "react-router-dom";

const CreateProjectButton = (props) => {

  const styles_disabled = {
    borderColor: '#96CCF1',
    backgroundColor: '#96CCF1',
    pointerEvents: "none"
  };


if (props.isEnabled){
  return (

    <React.Fragment>
      <Link to="/addProject" className="btn btn-lg btn-info">
        Create a Project
      </Link>
    </React.Fragment>
  );
}

else {

  return (
    <React.Fragment>
      <a style={styles_disabled} to="#" className="btn btn-lg btn-info">
        Create a Project
      </a>
    </React.Fragment>
  );
}

  
};

export default CreateProjectButton;
