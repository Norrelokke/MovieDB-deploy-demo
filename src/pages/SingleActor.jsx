import React from 'react'
import Container from 'react-bootstrap/Container'
import { getPerson, getMoviesWithPerson } from '../services/API'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { useHistory } from 'react-router';

const Actor = () => {
    // page for displaying single actors information, and movies the person has apeared in
    const { id } = useParams();
    const { data: person, isError, isLoading } = useQuery(['person', id], () => {
        return getPerson(id)
    })

    const { data: movies } = useQuery(['movies', id], () => {
        return getMoviesWithPerson(id)
    })
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
        <Container>

            {isLoading && <h1>Loading...</h1>}
            {isError && <Alert variant="warning" className="my-4"><h1>{error.message}</h1></Alert>}
            {person &&
                <>
                    <Container className="single-actor">
                        {person.profile_path ? <img src={"https://image.tmdb.org/t/p/w200/" + person.profile_path} alt="profileimage" /> : ""}
                        <div className="Actor-details">
                            <h1>{person.name}</h1>
                            {!person.also_known_as ? <h4>Also knows as {person.also_known_as}</h4> : ""}
                            {person.birthday ? <h4>Birthday: {person.birthday}</h4> : ""}
                            {person.homepage ? <h4>Homepage: {person.homepage}</h4> : ""}
                            {person.place_of_birth ? <h4>Place of birth: {person.place_of_birth}</h4> : ""}
                            {person.biography ? <><h4>Biography: </h4> <p>{person.biography}</p> </> : ""}
                        </div>
                    </Container>
                    <Container className="movie-list">  <h1>Appeared in:</h1></Container>
                    <Container className="movie-list">
                        {movies?.results.map(movie => (
                            <div className="movie-preview" key={movie.id} onClick={() => handleClick(movie.id)} >
                                <img src={movie.poster_path ? "https://image.tmdb.org/t/p/w200/" + movie.poster_path : "/assets/noimg.png"} alt="posterimg" />
                                <p>{movie.title}</p>
                            </div>
                        ))}
                    </Container>
                </>
            }
        </Container>
    )
}

export default Actor
