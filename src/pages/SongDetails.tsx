import { useParams } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux-store/features/playerSlice";

import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux-store/services/shazamCore";

const SongDetails = () => {
  const { songId } = useParams();

  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player)

  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songId });
  const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery({ songId })

  const handlePause = () => {
    dispatch(playPause(false));
  }

  const handlePlay = (song, index) => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  }

  if (isFetchingSongDetails || isFetchingRelatedSongs) {
    return (
      <Loader title='Searching song details'/>
    )
  }

  if (error) return <Error/>

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData}/>

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

        <div className="mt-5">
          {
            songData?.sections[1].type === 'LYRICS' ? (
              songData?.sections[1].text.map((line, index) => (
                <p key={index} className="text-gray-400 text-base my-1">
                  {line}
                </p>
              ))
            ) : (
              <p className="text-gray-400 text-base my-1">
                Sorry, no lyrics found!
              </p>
            )
          }
        </div>
      </div>

      <RelatedSongs
      data={data}
      isPlaying={isPlaying}
      activeSong={activeSong}
      handlePause={handlePause}
      handlePlay={handlePlay}
      />

    </div>
  )
}

export default SongDetails