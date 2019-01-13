import React, { Component } from "react";

export default class Error extends Component {
  render() {
    const { message } = this.props;

    return <div className="error-message">{message}</div>;
  }
}
