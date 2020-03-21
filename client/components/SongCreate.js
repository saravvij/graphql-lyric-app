import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link, hashHistory } from "react-router";
import fetchSongsQuery from "../queries/fetch-songs";

class SongCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: {
          title: this.state.title
        },
        refetchQueries: [{ query: fetchSongsQuery }]
      })
      .then(() => hashHistory.push("/"));
  }

  render() {
    return (
      <div>
        <Link to='/'>Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={e => this.setState({ title: e.target.value })}
            value={this.state.value}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
