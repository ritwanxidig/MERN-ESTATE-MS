import React, { useEffect, useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft, FaArrowLeft, FaChevronLeft, FaChevronRight, FaChessRook, FaShare } from 'react-icons/fa';

const ImageSlider = ({ slides, SliderData }) => {
  const [current, setCurrent] = useState(0);
  const [copy, setCopy] = useState(false);
  const length = slides?.length;
  console.log(length);

  const nextSlide = () => {
    if (SliderData?.length > 1 && slides?.length > 1) {
      setCurrent(current === length - 1 ? 0 : current + 1);
      console.log(SliderData?.length);
      return;
    }
    else {
      return;
    }
  };

  const prevSlide = () => {
    if (SliderData?.length > 1 && slides?.length > 1) {
      console.log(SliderData?.length);
      setCurrent(current === 0 ? length - 1 : current - 1);
      return;
    }
    else {
      return;
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [current]);

  if (!Array.isArray(slides) || slides?.length <= 0) {
    return null;
  }

  return (
    <div
      style={{ background: `url(${SliderData[current]}) no-repeat center center/cover` }}
      className={`flex w-full h-[420px] bg-yellow-500 gap-2  transition-all`}>
      {copy && <p className='fixed right-0 mr-24 mt-2 float-left bg-white p-1 rounded transition-all'>Copied</p>}
      <button
        className='flex justify-center items-center  rounded-full p-4 bg-white fixed right-0 m-8 float-left'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setCopy(true);
          setTimeout(() => {
            setCopy(false);
          }, 900);
        }}
      >
        <FaShare className='text-xl' />
      </button>
      <div className='flex w-full justify-between items-center'>
        {SliderData.length !== 1 && (
          <>
            <FaChevronLeft className='text-3xl text-white mx-4 cursor-pointer' onClick={prevSlide} />
            <FaChevronRight className='text-3xl text-white mx-4 cursor-pointer' onClick={nextSlide} />
          </>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;