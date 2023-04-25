import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    let result = await axios.post("/api/users/register", newUser);
    history.push("/login");

    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const addTeamMember = (newUser, history, id) => async (dispatch) => {
  try {
    let result = await axios.post(`/api/users/register/${id}`, newUser);
    console.log(result)
    history.push("/dashboard");

    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const login = (LoginRequest) => async (dispatch) => {
  try {
    // post => Login Request
    const res = await axios.post("/api/users/login", LoginRequest);
    // extract token from res.data
    const { token } = res.data;
    console.log("in login call")
    console.log(res.data.user.manager_id)

    if (res.data.user.role =="Manager")
{
  localStorage.setItem('mgr_id', res.data.user.id);
}
else{
  localStorage.setItem('mgr_id', res.data.user.manager_id);
}
   
   
    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);
    
    // set our token in header ***
    setJWTToken(token);
    // decode token on React
    const decoded = jwt_decode(token);
    // dispatch to our securityReducer

    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};
