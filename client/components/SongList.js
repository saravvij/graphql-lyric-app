import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchSongsQuery from "../queries/fetch-songs";
import deletSongMutation from "../queries/delete-song";

class SongList extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    const {
      data: { loading, songs }
    } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <ul className='collection'>{this.renderSongs(songs)}</ul>
        <Link className='btn-floating btn-large red light' to='/songs/new'>
          <i className='material-icons cursor '>add</i>
        </Link>
      </div>
    );
  }

  handleDelete(id) {
    this.props
      .mutate({
        variables: {
          id
        }
        //  refetchQueries: [{ query: fetchSongsQuery }]
      })
      .then(() => this.props.data.refetch());
  }

  renderSongs(songs) {
    return songs.map(({ id, title }) => (
      <li className='collection-item' key={id}>
        <Link to={`/songs/${id}`}>{title}</Link>
        <i className='material-icons' onClick={() => this.handleDelete(id)}>
          delete
        </i>
      </li>
    ));
  }
}

export default graphql(deletSongMutation)(graphql(fetchSongsQuery)(SongList));
