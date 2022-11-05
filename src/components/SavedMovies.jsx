import React, { useEffect, useRef, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';

const SavedMovies = ({ title, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  const movieData = movies?.filter((movie) =>
    isLargeRow ? movie.isLargeRow : !movie.isLargeRow
  );

  const slider = useRef();
  const slideLeft = () => {
    slider.current.scrollLeft -= slider.current.offsetWidth > 768 ? 500 : 400;
  };
  const slideRight = () => {
    slider.current.scrollLeft += slider.current.offsetWidth > 768 ? 500 : 400;
  };

  const movieRef = doc(db, 'users', `${user?.email}`);
  const deleteMovie = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedMovies: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const showMovieDesc = (movie) => {
    sessionStorage.setItem(
      'selectedMovie',
      JSON.stringify({
        id: movie?.id,
        title: movie?.title,
        overview: movie?.overview,
        img: movie?.img,
        posterImg: movie?.posterImg,
        releaseDate: movie?.releaseDate,
        genreIds: movie?.genreIds,
        isLargeRow,
      })
    );
    window.dispatchEvent(new Event('storage'));
  };

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [user?.email]);

  return (
    <>
      {movieData?.length > 0 && (
        <>
          <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
          <div className="relative flex items-center group">
            <MdChevronLeft
              onClick={slideLeft}
              className="bg-white left-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
              size={40}
            />
            <div
              ref={slider}
              className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative px-2"
            >
              {movieData?.map((item, id) => (
                <div
                  key={id}
                  className={`w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 ${
                    isLargeRow &&
                    'w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px]'
                  }`}
                  onClick={() => showMovieDesc(item)}
                >
                  <img
                    className={`w-full h-auto block ${
                      item?.isLargeRow && 'aspect-[2/3]'
                    }`}
                    src={`https://image.tmdb.org/t/p/w500/${
                      isLargeRow ? item.posterImg : item.img
                    }`}
                    alt={item?.title}
                  />
                  <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                    <p className="whitespace-normal text-xs md:text:sm font-bold flex justify-center items-center h-full flex-wrap text-center px-2">
                      {item?.title}
                    </p>
                    <p
                      className="absolute text-gray-300 top-4 right-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMovie(item.id);
                      }}
                    >
                      <AiOutlineClose />
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <MdChevronRight
              onClick={slideRight}
              className="bg-white right-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
              size={40}
            />
          </div>
        </>
      )}
    </>
  );
};

export default SavedMovies;
