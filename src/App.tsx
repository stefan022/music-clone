// react-redux
import { useSelector } from "react-redux";

// react-router
import { Routes, Route } from 'react-router-dom'

// components
import { Sidebar, MusicPlayer, TopPlay } from "./components";

// pages
import { TopArtists, AroundYou, Discover, SongDetails } from "./pages";

const App = () => {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <div className="px-6 h-screen overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={ <Discover/> }/>
              <Route path="/top-artists" element={ <TopArtists/> }/>
              <Route path="/around-you" element={ <AroundYou/> }/>
              <Route path="/songs/:songId" element={ <SongDetails/> }/>
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;