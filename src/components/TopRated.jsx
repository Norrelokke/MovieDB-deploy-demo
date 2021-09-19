import React from 'react'
import { useHistory } from 'react-router';
import { useQuery } from 'react-query';
import { getTopRatedMovies } from '../services/API';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'

const TopRated = () => {
	// page displaying first page top rated movies
	const { data: topmovies, isLoading, isError } = useQuery('topmovies', getTopRatedMovies);
	const history = useHistory();
	const handleClick = (movieId) => {
		if (movieId === undefined) {
			history.push(`/PageNotFound`);
		} else {
			history.push(`/movie/${movieId}`);
		}
	};

	return (
		<>
			<Container className="movie-list-text"><h1>Top Rated Movies</h1></Container>
			<Container className="movie-list">
				{isLoading && <h1>Loading...</h1>}
				{isError && <Alert variant="warning" className="my-4"><h1>{error.message}</h1></Alert>}
				{topmovies?.results.map(topmovie => (
					<div className="movie-preview" key={topmovie.id} onClick={() => handleClick(topmovie.id)} >
						<img src={topmovie.poster_path ? "https://image.tmdb.org/t/p/w200/" + topmovie.poster_path : "./assets/noimg.png"} alt="posterimg" />
						<p>{topmovie.title}</p>
					</div>
				))}
			</Container>
		</>
	);
}

export default TopRated;