import React from "react";

const ErrorHandler = props => {
  return <p>{props.location.state.msg}</p>;
};
export default ErrorHandler;
