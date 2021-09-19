
const baseURL = 'https://api.themoviedb.org'
const APIKEY = '?api_key=89ff8f49db669e76da191e37de9c197b'
const Genre = '&sort_by=&with_genres='
const Cast = '&sort_by=&with_cast='
const PageStr = '&page='
const query = '&query='
/**
 * @returns Promise
 */
const get = async (endpoint) => {
    const res = await fetch(baseURL + endpoint + APIKEY)
    if (!res.ok) {
        throw new Error("Something is wrong with the request!")
    }
    return res.json()
}
/**
 * @returns Promise
 */
//get genre with id, to display movies in a specific genre and pagenumber for pagination
const getGenre = async (endpoint, Id, page) => {
    const res = await fetch(baseURL + endpoint + APIKEY + Genre + Id + PageStr + page)
    if (!res.ok) {
        throw new Error("Something is wrong with the request!")
    }
    return res.json()
}
//get cast with id, to display all movies a person has apeared in 
const getCast = async (endpoint, Id) => {
    const res = await fetch(baseURL + endpoint + APIKEY + Cast + Id)
    if (!res.ok) {
        throw new Error("Something is wrong with the request!")
    }
    return res.json()
}
//get a searchresult with the keyword of searchform in homepage (not included in this version)
const getSearchResult = async (endpoint, keyword) => {
    const res = await fetch(baseURL + endpoint + APIKEY + query + keyword)
    if (!res.ok) {
        throw new Error("Something is wrong with the request!")
    }
    return res.json()
}
//Get all popular movies
export const getpopularMovies = async () => {
    return get('/3/movie/popular');
}
//Get all upcoming movies
export const getupcomingMovie = async () => {
    return get('/3/movie/upcoming');
}
//Get all Toprated movies
export const getTopRatedMovies = async () => {
    return get('/3/movie/top_rated');
}
//Get all genres
export const getGenres = async () => {
    return get('/3/genre/movie/list');
}
//Get genre by id
export const getGenresById = async (Id, page) => {
    return getGenre('/3/discover/movie', Id, page);
}
//Get a single movie by id
export const getMovie = async (Id) => {
    return await get(`/3/movie/${Id}`);
}
//Get movie credits for castmembers
export const getMovieCredits = async (Id) => {
    return await get(`/3/movie/${Id}/credits`);
}
//Get person for actor information
export const getPerson = async (Id) => {
    return await get(`/3/person/${Id}`);
}
//Get all movies a person has apeared in 
export const getMoviesWithPerson = async (Id) => {
    return await getCast('/3/discover/movie', Id);
}
//Get movies with keyword of search
export const getSearch = async (keyword) => {
    return await getSearchResult(`/3/search/multi`, keyword);
}

export default {
    getpopularMovies,
    getupcomingMovie,
    getTopRatedMovies,
    getGenres,
    getGenresById,
    getMovie,
    getMovieCredits,
    getPerson,
    getSearch,
}