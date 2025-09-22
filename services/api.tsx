export const TMDB_CONFIG = {
	BASE_URL: 'https://api.themoviedb.org/3',
	API_KEY : process.env.EXPO_PUBLIC_MOVIE_API_KEY,
	headers : {
		accept       : 'application/json',
		Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
	}
}


export const fetchMovies = async ({
									  query
								  }: {
	query: string
}): Promise<Movie[]> => {
	const endpoint = query
		? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
		: `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by_=popularity.desc`;
	
	const response = await fetch(endpoint, {
		method : 'GET',
		headers: TMDB_CONFIG.headers,
	})
	if (!response.ok) {
		// @ts-ignore
		throw new Error('Failed to fetch movies', response.statusText)
	}
	const data = await response.json()
	return data.results
}


export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
	if (!TMDB_CONFIG.API_KEY) {
		throw new Error('TMDB v3 API key is missing');
	}
	
	const url = `${TMDB_CONFIG.BASE_URL}/movie/${encodeURIComponent(movieId)}?api_key=${TMDB_CONFIG.API_KEY}`;
	
	const response = await fetch(url, {
		method : 'GET',
		headers: TMDB_CONFIG.headers,
	});
	
	if (!response.ok) {
		throw new Error(`Failed to fetch movie details (status ${response.status})`);
	}
	
	const data = (await response.json()) as MovieDetails;
	return data;
};