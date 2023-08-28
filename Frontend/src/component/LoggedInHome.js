import React, {useState, useEffect} from "react";
import spotify_logo from "../assets/images/spotifyLogo.svg";
import IconText from "./shared/IconText";
import { Icon } from "@iconify/react";
import TextWithHover from "./shared/TextWithHover";
import { Howl, Howler } from "howler";
import { Link } from "react-router-dom";
import CloudinaryUpload from "../component/shared/CloudinaryUpload";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";


const LoggedInHome = () => {
  const [Playlist, setPlaylist] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/playlists");
      setPlaylist(response.data);
      console.log(response);
    };
    getData();
  }, []);
  return (
    <LoggedInContainer activeScreen={"home"}>
      <div className="text-white text-lg font-bold p-8">Spotify Playlists</div>
      <div className="p-8 pt-0 gap-4 grid grid-cols-4 overflow-auto">
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
    </LoggedInContainer>
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

export default LoggedInHome;
