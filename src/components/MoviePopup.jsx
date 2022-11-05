import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { genres } from '../genres';
import { requestVideo } from '../Requests';

const MoviePopup = () => {
  const [movie, setMovie] = useState(
    JSON.parse(sessionStorage.getItem('selectedMovie'))
  );
  const [isOpen, setIsOpen] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const { user } = UserAuth();
  const { data } = useQuery(['video', movie?.id], () =>
    movie.isLargeRow
      ? movie.img
      : axios
          .get(requestVideo(movie?.id))
          .then((res) => res.data.results[0]?.key || '')
  );

  const movieRef = doc(db, 'users', `${user?.email}`);
  const likedMovie = savedMovies?.find((item) => item?.id === movie?.id);

  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  const saveMovie = async (e) => {
    if (user?.email) {
      if (e.target.textContent === 'Save to account') {
        await updateDoc(movieRef, {
          savedMovies: arrayUnion({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            img: movie.img,
            posterImg: movie.posterImg,
            releaseDate: movie.releaseDate,
            genreIds: movie.genreIds,
            isLargeRow: movie.isLargeRow,
          }),
        });
      } else {
        try {
          const result = savedMovies.filter((item) => item.id !== movie.id);
          await updateDoc(movieRef, {
            savedMovies: result,
          });
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      alert('Please log in to save a movie!');
    }
  };

  const showGenre = (genreIds) => {
    let genreNames = '';
    genreIds?.forEach((genreId, i) => {
      if (i === 0) {
        genreNames += genres[genreId] || '';
      } else {
        genreNames += ', ' + genres[genreId] || '';
      }
    });
    return genreNames;
  };

  const setMoviePopupState = () => {
    setMovie(() => JSON.parse(sessionStorage.getItem('selectedMovie')));
    setIsOpen(true);
  };

  useEffect(() => {
    window.addEventListener('storage', setMoviePopupState);
    onSnapshot(movieRef, (doc) => {
      setSavedMovies(doc.data()?.savedMovies);
    });

    return () => {
      window.removeEventListener('storage', setMoviePopupState);
    };
  }, [user?.email]);

  return (
    <>
      {isOpen ? (
        <>
          <div className="px-2 sm:px-4 w-full h-full overflow-x-hidden overflow-y-auto fixed inset-0 z-[100] backdrop-brightness-50 outline-none focus:outline-none text-white">
            <div className="relative min-h-full w-auto mx-auto max-w-3xl flex items-center">
              {/*content*/}
              <div className="my-4 border-0 shadow-lg relative flex flex-col w-full bg-[#171616] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between px-6 py-8 border-b border-solid border-[#403f3f] rounded-t">
                  <h3 className="text-2xl md:text-3xl font-semibold">
                    {movie?.title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-white opacity-80 text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <span className="flex items-center justify-center bg-transparent text-white opacity-80 h-6 w-6 text-3xl outline-none focus:outline-none hover:scale-125">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="flex justify-center mx-auto px-8 pt-6 w-full aspect-[5/3] md:w-[600px] md:h-[360px]">
                  {movie.isLargeRow || data === '' ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.img}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  ) : data ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${data}`}
                      title={movie?.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : null}
                </div>
                <div className="relative p-6 md:p8 flex-auto">
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-1">
                    Released: {movie?.releaseDate}
                  </p>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-3">
                    Genre(s): {showGenre(movie?.genreIds)}
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-justify">
                    Overview: <br /> {movie?.overview}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-[#403f3f] rounded-b">
                  <button
                    className="text-sm md:text-base text-red-500 background-transparent font-bold uppercase px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="text-sm md:text-base bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={saveMovie}
                  >
                    {likedMovie ? 'Remove from' : 'Save to'} account
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default MoviePopup;
