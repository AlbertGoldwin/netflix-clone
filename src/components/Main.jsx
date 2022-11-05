import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import requests from '../Requests';

const Main = () => {
  const { data = [] } = useQuery(['Popular Movies'], () =>
    axios.get(requests.requestPopular).then((res) => res.data.results)
  );

  const movie = data[Math.floor(Math.random() * data?.length)];

  const showMovieDesc = () => {
    sessionStorage.setItem(
      'selectedMovie',
      JSON.stringify({
        id: movie?.id,
        title: movie?.title,
        overview: movie?.overview,
        img: movie.backdrop_path,
        posterImg: movie.poster_path || '',
        releaseDate: movie.release_date,
        genreIds: movie.genre_ids,
        isLargeRow: false,
      })
    );
    window.dispatchEvent(new Event('storage'));
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  return (
    <div className="w-full h-[550px] md:h-[640px] text-white /mb-10">
      <div className="w-full h-full relative">
        <div className="absolute w-full h-[550px] md:h-[640px] bg-gradient-to-t from-black"></div>
        {movie?.backdrop_path && (
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt={movie?.title}
          />
        )}
        <div className="absolute w-full top-[21%] p-6 md:p-10">
          <h1 className="text-3xl md:text-5xl">{movie?.title}</h1>
          <div className="my-4">
            <button
              onClick={showMovieDesc}
              className="border bg-gray-300 text-black border-gray-300 py-2 px-5"
            >
              Play
            </button>
            <button className="border border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
