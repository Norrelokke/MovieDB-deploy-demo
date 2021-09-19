import React from 'react'
import Container from 'react-bootstrap/Container'
import { getpopularMovies } from '../services/API'
import { useQuery } from 'react-query'
import Popular from '../components/Popular'

const HomePage = () => {

	const { data: popmovies, status } = useQuery('popmovies', getpopularMovies);

	return (
		<Container>
			{popmovies &&
				<Popular popmovies={popmovies} />
			}
		</Container>
	)
}

export default HomePage