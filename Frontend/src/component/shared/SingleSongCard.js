import { useContext } from "react";
import songContext from "../../contexts/songContext";
const SingleSongCard = ({ info, playSound }) => {
  const { currentSong, setCurrentSong } = useContext(songContext);
  
  return (
    <div className="flex hover:bg-gray-300 hover:bg-opacity-20 p-2 rounded-sm" onClick={() => {
      setCurrentSong(info);
    }}>
      <div
        className="w-12 h-12 bg-white bg-cover bg-center"
        style={{
          backgroundImage: `url("${info.thumbnail}")`,
        }}
      >
      </div>
      <div className="flex w-full">
        <div className="text-white flex flex-col items-right justify-center pl-2 w-5/6">
          <div className="cursor-pointer hover:underline">{info.name}</div>
          <div className="cursor-pointer hover:underline text-xs text-gray-400">
            {info.artist.firstName + " " + info.artist.lastName}
          </div>
        </div>
        <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
          <div>3:55</div>
          {/* <div>...</div> */}
        </div>
      </div>
    </div>
  );
};

export default SingleSongCard;