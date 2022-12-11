import { useState } from "react"

import { useSelector } from "react-redux"
import { Error, Loader, SongCard } from "../components"
import { useGetTopArtistsQuery } from "../redux-store/services/shazamCore"

const AroundYou = () => {
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const { data, isFetching, error } = useGetTopArtistsQuery();

    if (isFetching) return <Loader title='Loading top artists'/>
    if (error) return <Error/>

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
              Top Artists
            </h2>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
            {
                data?.map((song, index) => (
                    <SongCard
                    key={song.key}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={data}
                    index={index}
                    />
                ))
            }
            </div>
        </div>
    )
}

export default AroundYou