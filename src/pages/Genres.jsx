import React from 'react'
import { getGenres } from '../services/API'
import { useQuery } from 'react-query'
import { useHistory } from 'react-router'
import Container from 'react-bootstrap/esm/Container'

const Genres = () => {
  //Page with list of Genres 
  const { data: genres } = useQuery('genres', getGenres);
  const history = useHistory();

  const handleClick = (genreId) => {
    if (genreId === undefined) {
      history.push(`/PageNotFound`);
    } else {
      history.push(`/genres/${genreId}`);
    }
  };

  //List of genres with links to single genre page
  // handle Click to send user to single genres page
  return (
    <Container className="py-3">
      <div className="genre-list">
        {genres?.genres.map(genre => (
          <div
            className="genre"
            key={genre.id}
            onClick={() => handleClick(genre.id)} >
            <h5>{genre.name}</h5>
          </div>
        ))}
      </div>
    </Container>
  );

}

export default Genres;