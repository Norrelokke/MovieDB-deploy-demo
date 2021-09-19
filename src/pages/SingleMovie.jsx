import React from 'react'
import { useHistory } from 'react-router';
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import { getMovie, getMovieCredits } from '../services/API'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'

const SingleMovie = () => {
	// Page to display a single movie with details 
	const { id } = useParams();
	const { data, error, isError, isLoading } = useQuery(['movies', id], () => {
		return getMovie(id)
	})
	//get movie with id using params 
	const { data: credits, isError: Error, isLoading: Loading } = useQuery(['credits', id], () => {
		return getMovieCredits(id)
	})
	// get actors who apeared in the movie using credits from api
	const history = useHistory();
	const handleClick = (actorId) => {
		if (actorId === undefined) {
			history.push(`/PageNotFound`);
		} else {
			history.push(`/actor/${actorId}`);
		}
	};
	// Handle click on single acors name, and send user to the actors single page 
	return (
		<Container>
			{isLoading && <h1>Loading...</h1>}
			{isError && <Alert variant="warning" className="my-4"><h1>{error.message}</h1></Alert>}
			{data &&
				<>
					<Container className="Movie-details">
						<img src={data.poster_path ? "https://image.tmdb.org/t/p/w200/" + data.poster_path : "/assets/noimg.png"} alt="posterimg" />
						<div className="Movie-details-text">	<h1>{data.title}</h1>
							<p>{data.tagline}</p>
							<p>{data.overview}</p> </div>

					</Container>
				</>}

			{Loading && <h1>Loading...</h1>}
			{Error && <Alert variant="warning" className="my-4"><h1>{error.message}</h1></Alert>}
			<Container className="Actors-list-details">	<h2>Actors:</h2></Container>
			<Container className="Actors-list-details">

				{credits &&
					credits.cast.map(actor => (
						<div className="movie-preview" key={actor.id} onClick={() => handleClick(actor.id)} >
							<p>{actor.name}</p>
						</div>
					))
				}
			</Container>
		</Container>
	)
}

export default SingleMovie
