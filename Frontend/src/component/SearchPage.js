import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import SingleSongCard from '../component/shared/SingleSongCard';
import LoggedInContainer from '../containers/LoggedInContainer';
import { makeAuthenticatedGETRequest } from '../utils/serverHelper';
const SearchPage = () => {
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [songData, setSongData] = useState([]);

  const searchSong = async () => {
    const response = await makeAuthenticatedGETRequest('/song/get/songname/' + searchText);
    setSongData(response.data);
    // setSearchText('');
  };

  return (
    <LoggedInContainer activeScreen={"search"}>
      <div className="w-full py-6">
        <div
          className={`w-1/3 p-3 px-5 text-sm rounded-full bg-gray-600 flex text-white space-x-3 items-center ${
            isInputFocus ? "border border-white" : "border-none"
          }`}
        >
          <Icon icon="ic:twotone-search" className="text-lg" />
          <input
            className="bg-gray-600 outline-none border-none w-full"
            type="text"
            placeholder="What do you want to listen to?"
            onFocus={() => {
              setIsInputFocus(true);
            }}
            onBlur={() => {
              setIsInputFocus(false);
            }}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchSong();
              }
            }}
          />
        </div>
        {songData.length>0?(
          <div className="pt-5 space-y-3">
            <div className="text-white">
              Search Result <span className="font-bold">{searchText}</span>
            </div>
            {songData.map((item) => {
              return (
                <SingleSongCard
                  info={item}
                  key={JSON.stringify(item)}
                  playSound={() => {}}
                />
              );
            })}
          </div> ): <h1 className='text-white pt-5'>Nothing To Show Here..!</h1>
        }
      </div>
    </LoggedInContainer>
  );
}

export default SearchPage;
