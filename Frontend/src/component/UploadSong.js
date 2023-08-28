import React, {useState} from "react";
import spotify_logo from "../assets/images/spotifyLogo.svg";
import IconText from "./shared/IconText";
import { Icon } from "@iconify/react";
import TextWithHover from "./shared/TextWithHover";
import TextInput from "./shared/TextInput";
import CloudinaryUpload from "./shared/CloudinaryUpload";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";
import { useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer"
const UploadSong = () => {
  const [name, setName] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [PlayListUrl, setPlayListUrl] = useState('');
  const [UploadedFileName, setUploadedFileName] = useState();
  const navigate = useNavigate();
  const submitSong = async () => {
    const data = { name, thumbnail, track: PlayListUrl };
    const response = await makeAuthenticatedPOSTRequest('/song/create', data
    );
    console.log(response);
    if (response.err) {
      alert('Could Not create song');
      return
    }
    navigate('/home');
  }

  return (
    <LoggedInContainer>
      <div className="text-2xl font-semibold mb-5 text-white mt-8">
        Upload Your Music
      </div>
      <div className="w-2/3 flex justify-between space-x-3">
        <div className="w-1/2">
          <TextInput
            label={"Name"}
            labelClassName={"text-white"}
            placeholder={"Name"}
            value={name}
            setValue={setName}
          />
        </div>
        <div className="w-1/2">
          <TextInput
            label={"Thumbnail"}
            labelClassName={"text-white"}
            placeholder={"Thumbnail"}
            value={thumbnail}
            setValue={setThumbnail}
          />
        </div>
      </div>
      <div className="mt-4">
        {UploadedFileName ? (
          <div className="bg-white rounded-full p-3 w-1/3">
            {UploadedFileName.substring(0, 30)}...
          </div>
        ) : (
          <CloudinaryUpload
            setUrl={setPlayListUrl}
            setName={setUploadedFileName}
          />
        )}
      </div>
      <div
        className="bg-white px-3 font-semibold mt-3 py-2 w-40 text-center rounded-full "
        onClick={submitSong}
      >
        Submit Song
      </div>
    </LoggedInContainer>
  );
};


export default UploadSong;
