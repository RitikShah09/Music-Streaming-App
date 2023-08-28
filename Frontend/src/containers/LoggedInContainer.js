import React, { useState, useContext, useLayoutEffect, useRef } from "react";
import spotify_logo from "../assets/images/spotifyLogo.svg";
import IconText from "../component/shared/IconText";
import { Icon } from "@iconify/react";
import TextWithHover from "../component/shared/TextWithHover";
import { Howl } from "howler";
import songContext from "../contexts/songContext";
import { Link } from "react-router-dom";
import CreatePlaylistModel from "../component/models/CreatePlaylistModel";
import AddToPlaylistModel from "../component/models/AddToPlaylistModel";
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../utils/serverHelper";

const LoggedInContainer = ({ children, activeScreen }) => {
  const [createPlaylistModelOpen, setCreatePlaylistModelOpen] = useState(false);
  const [addToPlaylistModelOpen, setAddToPlaylistModelOpen] = useState(false);

  const {
    currentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused
  } = useContext(songContext);

  const firstUpdate = useRef(true);
 
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (currentSong) {
      changeSong(currentSong.track);
    };
  }, [currentSong && currentSong.track]);

  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };
  const togglePlayPause = () => {
    if (isPaused) {
      playSound(
        currentSong.track
      );
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };


 const addSongToPlaylist = async (playlistId) => {
   const songId = currentSong._id;
   const payload = { playlistId, songId };
   const response = await makeAuthenticatedPOSTRequest(
     "/playlist/add/song",
     payload
   );
   if (response._id) {
     setAddToPlaylistModelOpen(false);
   }
 };

  const likeSong = async () => {
   const songId = currentSong._id;
    const response = await makeAuthenticatedGETRequest(`/song/like/${songId}`);
    console.log(response);
  }
  
  return (
    <div className="h-full w-full bg-app-black">
      {createPlaylistModelOpen && (
        <CreatePlaylistModel
          closeModel={() => {
            setCreatePlaylistModelOpen(false);
          }}
        />
      )}
      {addToPlaylistModelOpen && (
        <AddToPlaylistModel closeModel={() => {
          setAddToPlaylistModelOpen(false);
        }} 
          addSongToPlaylist = {addSongToPlaylist}
        />
      )}
      <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>
        <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-16">
          <div>
            <div className="p-6">
              <img src={spotify_logo} alt="SpotifyLogo" width={125} />
            </div>
            <div className="py-3">
              <IconText
                iconName={"material-symbols:home"}
                displayText={"Home"}
                targetLink={"/home"}
                active={activeScreen === "home"}
              />

              <IconText
                iconName={"material-symbols:search-rounded"}
                displayText={"Search"}
                targetLink={"/search"}
                active={activeScreen === "search"}
              />
              <IconText
                iconName={"icomoon-free:books"}
                displayText={"Library"}
                active={activeScreen === "library"}
                targetLink={"/library"}
              />

              <IconText
                iconName={"material-symbols:library-music-sharp"}
                displayText={"My Music"}
                targetLink={"/mymusic"}
                active={activeScreen === "mymusic"}
              />
            </div>
            <div className="pt-5">
              <IconText
                iconName={"material-symbols:add-box"}
                displayText={"Create PlayList"}
                onClick={() => {
                  setCreatePlaylistModelOpen(true);
                }}
              />
              <IconText
                iconName={"mdi:cards-heart"}
                displayText={"Liked Song"}
              />
            </div>
          </div>
          <div className="px-3 cursor-pointer">
            <div className=" flex items-center justify-center w-2/4 border border-gray-300 rounded-full hover:border-white text-white py-1 text-center">
              <Icon icon={"icon-park-outline:earth"} />
              <div className="ml-2 text-sm font-semibold">English</div>
            </div>
          </div>
        </div>
        <div className="h-full w-4/5 bg-app-black overflow-auto">
          <div className="flex w-full h-1/10 bg-opacity-30 bg-black items-center justify-end">
            <div className="w-1/2 flex h-full">
              <div className="w-3/5 flex justify-around items-center">
                <TextWithHover displayText={"Premium"} />
                <TextWithHover displayText={"Support"} />
                <TextWithHover displayText={"Download"} />
                <div className="h-1/2 border-r border-gray "></div>
              </div>
              <div className="w-2/5 flex justify-around h-full items-center">
                <Link to={"/uploadsong"}>
                  <TextWithHover displayText={"Upload Song"} />
                </Link>
                {/* <CloudinaryUpload/> */}
                <div className="bg-white h-1/2 px-4 flex  items-center rounded-full font-semibold cursor-pointer">
                  Ritik
                </div>
              </div>
            </div>
          </div>
          {/* Different in every content */}
          <div className="p-8 pt-0 overflow-auto">{children}</div>
        </div>
      </div>
      {currentSong && (
        <div className="h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4 w-full">
          <div className="w-1/4 flex items-center">
            <img
              className="h-14 w-14  rounded-sm object-cover object-center"
              src={currentSong.thumbnail}
              alt="current song"
            />
            <div className="pl-4">
              <div className="text-sm hover:underline cursor-pointer">
                {currentSong.name}
              </div>
              <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex-col h-full items-center flex justify-center">
            <div className="flex w-1/2 justify-between ">
              <Icon
                fontSize={30}
                icon={"ph:shuffle"}
                className=" cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                fontSize={30}
                icon={"mi:previous"}
                className=" cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                onClick={togglePlayPause}
                fontSize={40}
                icon={isPaused ? "octicon:play-16" : "zondicons:pause-solid"}
                className=" cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                fontSize={30}
                icon={"mi:next"}
                className=" cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                fontSize={30}
                icon={"ion:repeat"}
                className=" cursor-pointer text-gray-500 hover:text-white"
              />
            </div>
            {/* <div>progress</div> */}
          </div>
          <div className="w-1/4 flex justify-end pr-5 space-x-4 items-center">
            <Icon
              onClick={() => { setAddToPlaylistModelOpen(true); }}
              className=" cursor-pointer text-gray-500 hover:text-white"
              fontSize={30}
              icon={"ic:round-playlist-add"}

            />
            <Icon
              className=" cursor-pointer text-gray-500 hover:text-white"
              fontSize={25}
              icon={"ph:heart-bold"}
              onClick={()=>{likeSong()}}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedInContainer;
