import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchSongQuery from "../queries/fetch-song";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component {
  render() {
    const { loading, error, song } = this.props.data;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error on loading.</div>;

    if (!song) return <span></span>;

    return (
      <div>
        <Link to='/'>Back</Link>
        <h2>{song.title}</h2>
        <LyricList lyrics={song.lyrics}></LyricList>
        <LyricCreate songId={song.id}></LyricCreate>
      </div>
    );
  }
}

// 6523208
export default graphql(fetchSongQuery, {
  options: props => {
    return { variables: { id: props.params.id } };
  }
})(SongDetail);
