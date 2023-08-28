import React, { useState } from 'react';
import TextInput from "../shared/TextInput";
import {makeAuthenticatedPOSTRequest} from '../../utils/serverHelper'
const CreatePlaylistModel = ({ closeModel }) => {
  
  const [playListName, setPlayListName] = useState('');
  const [playListThumbnail, setPlayListThumbnail] = useState("");

  const createPlayList = async () => {
    const response = await makeAuthenticatedPOSTRequest('/playlist/create', { name: playListName, thumbnail: playListThumbnail, songs: [] });
    // console.log(response);
    if (response._id) {
      closeModel();
    }
  };
  return (
    <div
      className=" absolute w-screen h-screen bg-black bg-opacity-40 text-white flex justify-center items-center"
      onClick={closeModel}
    >
      <div className=" bg-app-black w-1/3 rounded-md p-4" onClick={(e)=>{e.stopPropagation()}}>
        <div className='text-white mb-5 font-semibold text-lg'>Create PlayList</div>
        <div className="space-y-4 flex flex-col justify-center items-center text-black">
          <TextInput
            label={"Name"}
            labelClassName={"text-white"}
            placeholder={"PlayList Name"}
            value={playListName}
            setValue={setPlayListName}
          />
          <TextInput
            label={"Thumbnail"}
            labelClassName={"text-white"}
            placeholder={"Thumbnail"}
            value={playListThumbnail}
            setValue={setPlayListThumbnail}
          />
          <div className='bg-white w-1/3 text-center rounded font-semibold p-y-3 mt-4 text-black' onClick={createPlayList}>
            Create
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModel;
