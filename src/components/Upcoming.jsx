import React from 'react'
import { useHistory } from 'react-router';
import { useQuery } from 'react-query';
import { getupcomingMovie } from '../services/API';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'

const Upcoming = () => {
	// page displaying first page upcoming movies
	const { data: upcomingmovie, isLoading, isError } = useQuery('upcomingmovie', getupcomingMovie);
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
			<Container className="movie-list-text"><h1>Upcoming Movies</h1></Container>
			<Container className="movie-list">
				{isLoading && <h1>Loading...</h1>}
				{isError && <Alert variant="warning" className="my-4"><h1>{error.message}</h1></Alert>}
				{upcomingmovie?.results.map(upcomingmovie => (
					<div className="movie-preview" key={upcomingmovie.id} onClick={() => handleClick(upcomingmovie.id)} >
						<img src={upcomingmovie.poster_path ? "https://image.tmdb.org/t/p/w200/" + upcomingmovie.poster_path : "./assets/noimg.png"} alt="posterimg" />
						<p>{upcomingmovie.title}</p>
					</div>
				))}
			</Container>
		</>
	);
}

export default Upcoming;