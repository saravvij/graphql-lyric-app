import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class LyricList extends Component {
  constructor() {
    super();
    this.thumbUp = this.thumbUp.bind(this);
  }
  renderList(items) {
    const content = items.map(({ id, content, likes }) => (
      <li key={id} className='collection-item'>
        {content}
        <div className='likes-box'>
          <i className='material-icons' onClick={() => this.thumbUp(id, likes)}>
            thumb_up
          </i>
          <label>{likes}</label>
        </div>
      </li>
    ));
    return content;
  }

  thumbUp(id, likes) {
    console.log(id);
    this.props.mutate({
      variables: {
        id
      },
      optimisticResponse: { //6528164
        __typename: "mutation",
        likeLyric: {
          id,
          likes: likes + 1,
          __typename: "LyricType"
        }
      }
    });
  }

  render() {
    const { lyrics } = this.props;

    if (!lyrics || lyrics.length === 0) {
      return (
        <p>
          <label>No lyrics yet.</label>
        </p>
      );
    }

    return <ul className='collection'>{this.renderList(lyrics)}</ul>;
  }
}

const mutation = gql`
  mutation like($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
      song {
        id
      }
    }
  }
`;

export default graphql(mutation)(LyricList);
