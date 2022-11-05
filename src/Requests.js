const key = '92105b258d865f8adbc24dedff2c73d8';

const requests = {
  requestNetflixOriginals: `https://api.themoviedb.org/3/discover/tv?api_key=${key}&with_networks=213`,
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  requestTrending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}`,
  requestHorror: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=27`,
  requestAction: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=28`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
};

export const requestVideo = (movieId) =>
  `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}&language=en-US`;

export default requests;
