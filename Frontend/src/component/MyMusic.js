import React, { useState, useEffect } from "react";
import SingleSongCard from "./shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import LoggedInContainer from "../containers/LoggedInContainer";

const MyMusic = () => {
  const [songData, setSongData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
      setSongData(response.data);
    };
    getData();
  }, []);
  return (
    <LoggedInContainer activeScreen={"mymusic"}>
      <div className="text-white text-xl font-semibold pl-2 py-4">My Songs</div>
      <div className=" space-y-3 overflow-auto">
        {songData.map((items, i) => {
          return <SingleSongCard key={i} info={items} playSound={() => {}} />;
        })}
      </div>
    </LoggedInContainer>
  );
};
export default MyMusic;
