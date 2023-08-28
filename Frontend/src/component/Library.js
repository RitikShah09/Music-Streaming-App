import React, { useEffect, useState } from 'react'
import LoggedInContainer from '../containers/LoggedInContainer';
import { makeAuthenticatedGETRequest } from '../utils/serverHelper';
import { Link } from 'react-router-dom';
const Library = () => {
    const [myPlaylist, setMyPlaylist] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest('/playlist/get/me');
            setMyPlaylist(response.data);
        };
        getData();
    },[])
  return (
    <LoggedInContainer activeScreen={"library"}>
      <div className="text-white text-lg font-bold mt-8">My Playlists</div>
      <div className="py-5 bg-pink-300 grid gap-4 grid-cols-5 ">
              {myPlaylist.map(item => {
           return <Card key={JSON.stringify(item)} tittle={item.name} description={''} imgUrl={item.thumbnail} playlistId={item._id}/>
       } )}
      </div>
    </LoggedInContainer>
  );
}

const Card = ({ tittle, description, imgUrl, playlistId }) => {
  return (
    <Link to={"/playlist/" + playlistId}>
      <div
        className="bg-black bg-opacity-40 w-full px-4 py-2 rounded-lg cursor-pointer"
      >
        <div className="pb-4 pt-1 ">
          <img className="w-full rounded-md" src={imgUrl} alt="" />
        </div>
        <div className="text-white font-semibold py-3">{tittle}</div>
        <div className="text-gray-400 text-sm">{description}</div>
      </div>
    </Link>
  );
};

export default Library;
