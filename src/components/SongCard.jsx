import { Link } from "react-router-dom"

// react-redux
import { useDispatch } from "react-redux"

import PlayPause from './PlayPause'
import { playPause, setActiveSong } from "../redux-store/features/playerSlice"

// activeSong?.title <= activeSong / activeSong?.t / activeSong?.ok
// song.images?.coverart <= song.images.coverart !!

// dispatch => radi nešto sa našom tortom, menja je, dodaje nešto novo,
// a onda kasnije možemo da uzmemo te nove promene koje su izvršene
const SongCard = ({ song, index, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();

  const handlePause = () => {
    dispatch(playPause(false));
  }

  const handlePlay = () => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  }

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
    <div className="relative w-full h-56 group">
      <div 
      className={`
      absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex 
      ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}
      `}>
        <PlayPause 
        song={song}
        handlePause={handlePause}
        handlePlay={handlePlay}
        isPlaying={isPlaying}
        activeSong={activeSong}
        />
      </div>
      <img src={song.images?.coverart} alt="song_img" /> 
    </div>

    <div className="mt-4 flex-col">
      <p className="font-semibold text-lg text-white truncate">
        <Link to={`/songs/${song?.key}`}>{song.title}</Link>
      </p>
      <p className="text-sm truncate text-gray-300 mt-1">
        {song.subtitle}
      </p>
    </div>
  </div>
  )
}

export default SongCard