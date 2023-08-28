import React, {useState, useEffect} from 'react';
import {makeAuthenticatedGETRequest} from "../../utils/serverHelper"

const AddToPlaylistModel = ({ closeModel, addSongToPlaylist }) => {
  const [myPlaylist, setMyPlaylist] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      console.log(response.data);
      setMyPlaylist(response.data);
    };
    getData();
  }, []);
  return (
    <div>
      <div
        className=" absolute w-screen h-screen bg-black bg-opacity-40 text-white flex justify-center items-center"
        onClick={closeModel}
      >
        <div
          className=" bg-app-black w-1/3 rounded-md p-4"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="text-white mb-5 font-semibold text-lg">
            Select PlayList
          </div>
          <div className="space-y-4 flex flex-col justify-center items-center text-black">
            {myPlaylist.map((item) => {
              return (
                <PlayListComponent
                  info={item}
                  addSongToPlaylist={addSongToPlaylist}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayListComponent = ({ info, addSongToPlaylist}) => {
    return (
        <div className='bg-app-black flex w-full text-white items-center space-x-4 font-semibold text-sm hover:bg-gray-400  hover:bg-opacity-20 cursor-pointer'
            onClick={() => { addSongToPlaylist(info._id); }}>
            <div><img src={info.thumbnail} alt="thumbnail" className='h-12 w-12 rounded' /></div>
            <div>
                {info.name}
            </div>
        </div>
    )
};

export default AddToPlaylistModel;
