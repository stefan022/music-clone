import SongBar from "./SongBar"

const RelatedSongs = ({ data, isPlaying, activeSong, handlePause, handlePlay, artistId }) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">Related Songs:</h1>

    <div className="mt-6 w-full flex flex-col">
      {
        data?.map((song, index) => (
          <SongBar
          key={`${song.key}` + index}
          song={song}
          index={index}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePause={handlePause}
          handlePlay={handlePlay}
          />
        ))
      }
    </div>
  </div>
)

export default RelatedSongs