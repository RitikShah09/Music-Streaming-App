import React, {useState, useEffect} from "react";
import spotify_logo from "../assets/images/spotifyLogo.svg";
import IconText from "./shared/IconText";
import { Icon } from "@iconify/react";
import TextWithHover from "./shared/TextWithHover";
import { Link } from "react-router-dom";
import { Howl, Howler } from "howler";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";


const Home = () => {
  const [isPaused,setPaused ] = useState(true);
    const [soundPlayed, setsoundPlayed] = useState(null);
 const [Playlist, setPlaylist] = useState([]);
 useEffect(() => {
   const getData = async () => {
     const response = await makeAuthenticatedGETRequest ("/playlist/playlists");
     setPlaylist(response.data);
     console.log(response);
   };
   getData();
 }, []);
 const playSound = (songSrc) => {
   if (soundPlayed) {
     soundPlayed.stop();
   }
   let sound = new Howl({
     src: [songSrc],
     html5: true,
   });
   setsoundPlayed(sound);
   sound.play();
  //  console.log(sound);
  };   
  
  const pauseSound = () => {
    soundPlayed.pause();
  }
  const toggle = () => {
    if (isPaused) {
      playSound();
      setPaused(false);
    } else {
      pauseSound();
      setPaused(true);
    }
  };

  return (
    <div className="h-full w-full bg-app-black flex">
      {/* <div className="h-9/10 w-full flex"> */}
      <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-16">
        <div>
          <div className="p-6">
            <img src={spotify_logo} alt="SpotifyLogo" width={125} />
          </div>
          <div className="py-3">
            <IconText
              iconName={"material-symbols:home"}
              active
              displayText={"Home"}
            />
            <IconText
              iconName={"material-symbols:search-rounded"}
              displayText={"Search"}
            />
            <IconText iconName={"icomoon-free:books"} displayText={"Library"} />
          </div>
          <div className="pt-5">
            <IconText
              iconName={"material-symbols:add-box"}
              displayText={"Create PlayList"}
            />
            <IconText iconName={"mdi:cards-heart"} displayText={"Liked Song"} />
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
              <Link to="/signup">
                <TextWithHover displayText={"SignUp"} />
              </Link>
              <Link to="/login">
                <div className="bg-white h-1/2 px-4 py-1 flex  items-center rounded-full font-semibold cursor-pointer">
                  LogIn
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="text-white text-lg font-bold p-8">Spotify Playlists</div>
        <div className="p-8 pt-0 overflow-auto gap-4 grid grid-cols-4">
          {Playlist.map((item) => {
            return (
              <Card
                key={JSON.stringify(item)}
                tittle={item.name}
                description={""}
                imgUrl={item.thumbnail}
                playlistId={item._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
const Card = ({ tittle, description, imgUrl, playlistId }) => {
  return (
    <Link to={"/playlist/" + playlistId}>
      <div className="bg-black bg-opacity-40 w-full px-2 py-2 rounded-lg cursor-pointer">
        <div>
          <img className="w-full rounded-md" src={imgUrl} alt="" />
        </div>
        <div className="text-white font-semibold py-2 px-2">{tittle}</div>
        <div className="text-gray-400 text-sm">{description}</div>
      </div>
    </Link>
  );
};

export default Home;
