import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { lyric: "" };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ lyric: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: {
          content: this.state.lyric,
          songId: this.props.songId
        }
      })
      .then(() => {
        this.setState({ lyric: "" });
      });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>Add a Lyric</label>
        <input
          value={this.state.lyric}
          onChange={this.onInputChange}
          type='text'
        ></input>
      </form>
    );
  }
}

const mutation = gql`
  mutation addLyric($content: String, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
