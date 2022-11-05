import React from 'react';
import { UserAuth } from '../context/AuthContext';

const Movie = ({ item, isLargeRow = false }) => {
  const { user } = UserAuth();

  const showMovieDesc = () => {
    sessionStorage.setItem(
      'selectedMovie',
      JSON.stringify({
        id: item?.id,
        title: isLargeRow ? item.name : item.title,
        overview: item?.overview,
        img: item.backdrop_path,
        posterImg: item.poster_path || '',
        releaseDate: isLargeRow ? item.first_air_date : item.release_date,
        genreIds: item.genre_ids,
        isLargeRow,
      })
    );
    window.dispatchEvent(new Event('storage'));
    // Swal.fire({
    //   title: `<strong>${isLargeRow ? item?.name : item?.title}</strong>`,
    //   html:
    //     `<iframe width="450" height="315" src="https://www.youtube.com/embed/${trailerId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` +
    //     `<p class="py-4">${item?.overview}</p>`,
    //   showCloseButton: true,
    //   showCancelButton: true,
    //   focusConfirm: false,
    //   allowOutsideClick: false,
    //   customClass: "w-[90%] md:w-[50%]",
    //   confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
    //   confirmButtonAriaLabel: "Thumbs up, great!",
    //   cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
    //   cancelButtonAriaLabel: "Thumbs down",
    // });
  };

  return (
    <>
      {(isLargeRow ? item?.poster_path : item?.backdrop_path) ? (
        <div
          onClick={showMovieDesc}
          className={`w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 ${
            isLargeRow ? 'aspect-[2/3]' : 'aspect-[7/4]'
          } ${
            isLargeRow && 'w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px]'
          }`}
        >
          <img
            className={`w-full h-auto block ${isLargeRow && 'aspect-[2/3]'}`}
            src={`https://image.tmdb.org/t/p/w500/${
              isLargeRow ? item.poster_path : item.backdrop_path
            }`}
            alt={item?.title}
            loading="lazy"
          />

          <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
            <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full flex-wrap text-center px-2">
              {isLargeRow ? item?.name : item?.title}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Movie;
