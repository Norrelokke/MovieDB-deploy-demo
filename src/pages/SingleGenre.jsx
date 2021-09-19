import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { getGenresById } from '../services/API'
import { useQuery } from 'react-query'
import { useUrlSearchParams } from 'use-url-search-params'
import { useHistory } from 'react-router'
import { useParams } from "react-router-dom";

const SingleGenre = () => {
	// Page for single genre, displaying all movies in specific genre, with urlSearchParams for pagination
	const { id } = useParams();
	const [searchParams, setSearchParams] = useUrlSearchParams({ page: 1 }, { page: Number })
	const [page, setPage] = useState(searchParams.page);
	const { data, error, isError, isLoading, isPreviousData } = useQuery(['movies', id, page], () =>
		getGenresById(id, page),
		{
			staleTime: 1000 * 60 * 5, // 5 mins
			cacheTime: 1000 * 60 * 30, // 30 mins
			keepPreviousData: true, // keep previous data
		}
	)

	useEffect(() => {
		setSearchParams({ ...searchParams, page })
	}, [page])

	const history = useHistory();
	const handleClick = (movieId) => {
		if (movieId === undefined) {
			history.push(`/PageNotFound`);
		} else {
			history.push(`/movie/${movieId}`);
		}
	};
	// Handle Click on movie, to send user to single movie page 
	return (
		<>
			<Container className="movie-list">
				{isLoading && <h1>Loading...</h1>}
				{isError && <Alert variant="warning" className="my-4"><h1>{error.message}</h1></Alert>}
				{data?.results.map((movie, index) => (
					<div className="movie-preview" key={movie.id} onClick={() => handleClick(movie.id)}>
						<img src={movie.poster_path ? "https://image.tmdb.org/t/p/w200/" + movie.poster_path : "/assets/noimg.png"} alt="posterimg" />
						<p>{movie.original_title}</p>
					</div>
				))}
				<Container className={"pagination-buttons"}>
					<Button className="btn btn-light" onClick={() => setPage(old => Math.max(old - 1, 0))}
						disabled={page === 1}>Previous</Button>
					<Button className="btn btn-light" onClick={() => {
						if (!isPreviousData || !hasMore) {
							setPage(old => old + 1)
						}
					}}>Next</Button>
				</Container>
			</Container>


		</>
	)
}

export default SingleGenre
