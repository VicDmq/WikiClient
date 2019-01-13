import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    const { linkToGoBack } = this.props;

    const backLink = linkToGoBack ? <Link to={linkToGoBack}>back</Link> : "";

    return (
      <div className="header-container">
        <div className="header-backLink">{backLink}</div>
        <div className="header-title">Wiki Passfort</div>
      </div>
    );
  }
}
