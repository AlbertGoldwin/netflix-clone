import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useRef } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Movie from './Movie';

const Row = ({ title, fetchURL, isLargeRow = false }) => {
  const { data } = useQuery([title], () =>
    axios.get(fetchURL).then((res) => res.data.results)
  );

  const slider = useRef();

  const slideLeft = () => {
    slider.current.scrollLeft -= slider.current.offsetWidth > 768 ? 500 : 400;
  };
  const slideRight = () => {
    slider.current.scrollLeft += slider.current.offsetWidth > 768 ? 500 : 400;
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group min-h-[100px] sm:min-h-[126px] md:min-h-[148px] lg:min-h-[170px]">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          ref={slider}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative px-2"
        >
          {data?.map((item, id) => (
            <Movie key={id} item={item} isLargeRow={isLargeRow} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};

export default Row;
