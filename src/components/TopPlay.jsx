import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from "swiper"

import PlayPause from './PlayPause'
import { playPause, setActiveSong } from '../redux-store/features/playerSlice'

import { useGetTopChartsQuery } from '../redux-store/services/shazamCore'

import 'swiper/css'
import 'swiper/css/free-mode'

const TopChartCard = ({ song, index, isPlaying, activeSong, handlePause, handlePlay }) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">{index + 1}.</h3>
    
    <div className="flex-1 flex flex-row justify-between items-center">
      <img 
      className="w-20 h-20 rounded-lg" 
      src={song?.images?.coverart} 
      alt={song?.title} />

      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.key}`}>
          <p className="text-xl font-bold text-white">
            {song?.title}
          </p>
        </Link>
        <p className="text-base text-gray-300 mt-1">
          {song?.subtitle}
        </p>
      </div>
    </div>

    <PlayPause
    isPlaying={isPlaying}
    activeSong={activeSong}
    song={song}
    handlePause={handlePause}
    handlePlay={handlePlay}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data } = useGetTopChartsQuery();
  // useRef() služi za vraćanje stranice na početak, a ne da
  // bude skrolovano skroz dole, svaki put kad se učita !!!
  const divRef = useRef(null); 

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' })
  });

  const topPlays = data?.slice(0, 5);  // data.slice(0, 5) ERROR

  const handlePause = () => {
    dispatch(playPause(false));
  }

  const handlePlay = (song, index) => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  }

  return (
    <div ref={divRef} className='xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex-col'>
      
      {/* Top Charts */}
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to='/top-charts'>
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {
            topPlays?.map((song, index) => (
              <TopChartCard
              key={song.key}
              song={song}
              index={index}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePause={handlePause}
              handlePlay={() => handlePlay(song, index)}
              />
            ))
          }
        </div>
      </div>

      {/* Top Artists */}
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to='/top-artists'>
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
        slidesPerView='auto'
        spaceBetween={15}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        className='mt-4'
        >
          {
            topPlays?.map((song, index) => (
              <SwiperSlide
              key={song?.key}
              style={{ width: '25%', height: 'auto' }}
              className='shadow-lg rounded-full animate-slideright'
              >
                <img 
                src={song?.images.background} 
                alt="name" 
                className="rounded-full w-full object-cover"
                />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>

      
    </div>
  )
}

export default TopPlay