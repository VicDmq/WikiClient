import React, { Component } from "react";
import { connect } from "react-refetch";
import { Link } from "react-router-dom";
import Header from "./Header";
import FetchComponent from "./FetchComponent";

class Home extends Component {
  render() {
    const { titleFetches } = this.props;

    return (
      <div>
        <Header />
        <div className="main-container">
          <FetchComponent
            fetch={titleFetches}
            callbackOnSuccess={titleFetches => renderTitles(titleFetches)}
          />
        </div>
      </div>
    );
  }
}

const renderTitles = titleFetch => {
  return titleFetch.value.titles.map(title => (
    <div>
      <Link to={`/page/${title}/latest`}>{title}</Link>
    </div>
  ));
};

export default connect(() => ({
  titleFetches: `http://localhost:5003/pages`
}))(Home);
