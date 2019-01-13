import React, { Component } from "react";
import { connect, PromiseState } from "react-refetch";
import { Link } from "react-router-dom";
import Header from "./Header";
import FetchComponent from "./FetchComponent";

class Document extends Component {
  render() {
    const { revisionFetch, allRevisionsFetches } = this.props;
    const urlParams = this.props.match.params;
    const allFetches = PromiseState.all([revisionFetch, allRevisionsFetches]);

    return (
      <div>
        <Header linkToGoBack={"/"} />
        <div className="main-container">
          <FetchComponent
            fetch={allFetches}
            callbackOnSuccess={allFetches =>
              renderDocument(allFetches, urlParams)
            }
          />
        </div>
      </div>
    );
  }
}

const renderDocument = (allFetches, urlParams) => {
  const [revisionFetch, allRevisionsFetches] = allFetches.value;

  return (
    <div>
      <div className="document-title">{revisionFetch.title}</div>
      <div className="document-content">{revisionFetch.data}</div>
      <div className="document-revisions">
        {allRevisionsFetches.revisions.map(revision => {
          const isLatest = revisionIsLatest(
            allRevisionsFetches.revisions,
            revision
          );
          const linkUrl = getRevisionLinkUrl(
            urlParams.title,
            isLatest ? "latest" : revision
          );
          const isSelected = revisionIsSelected(
            urlParams.revision,
            revision,
            isLatest
          );

          return renderRevision(linkUrl, revision, isSelected);
        })}
      </div>
    </div>
  );
};

const revisionIsLatest = (revisions, revision) => {
  return revisions.indexOf(revision) === revisions.length - 1;
};

const getRevisionLinkUrl = (title, revision) => {
  return `/page/${title}/${revision}`;
};

const revisionIsSelected = (revisionInUrlParams, revision, isLatest) => {
  return (
    revisionInUrlParams == revision ||
    (isLatest && revisionInUrlParams == "latest")
  );
};

const renderRevision = (linkUrl, revision, isSelected) => {
  return (
    <div key={revision} className={isSelected ? "a-selected" : ""}>
      <Link to={linkUrl}>Revision {revision}</Link>
    </div>
  );
};

export default connect(props => {
  const { title, revision } = props.match.params;

  return {
    revisionFetch: `http://localhost:5003/page/${title}/${revision}`,
    allRevisionsFetches: `http://localhost:5003/page/${title}`
  };
})(Document);
