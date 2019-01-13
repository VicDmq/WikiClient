import React, { Component } from "react";
import Error from "./Error";
import Loader from "react-loader-spinner";

export default class FetchComponent extends Component {
  render() {
    const { fetch, callbackOnSuccess } = this.props;

    if (fetch.pending) {
      return (
        <div className="content-centered">
          <Loader type="Oval" width={80} height={80} color="#297e29" />
        </div>
      );
    } else if (fetch.rejected) {
      return (
        <div className="content-centered">
          <Error message={fetch.reason.message} />
        </div>
      );
    } else if (fetch.fulfilled) {
      return <div>{callbackOnSuccess(fetch)}</div>;
    }
  }
}
