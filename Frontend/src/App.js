import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './component/Home';
import { useCookies } from 'react-cookie';
import LoggedInHome from './component/LoggedInHome';
import UploadSong from './component/UploadSong';
import MyMusic from "./component/MyMusic";
import songContext from './contexts/songContext';
import { useState } from 'react';
import SearchPage from './component/SearchPage';
import Library from './component/Library';
import SinglePlaylist from './component/SinglePlaylist';

function App() {
  const [cookie, setCookie] = useCookies(['token']);
  const [currentSong, setCurrentSong] = useState(null);
   const [soundPlayed, setSoundPlayed] = useState(null);
   const [isPaused, setIsPaused] = useState(true);
  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (        
          <songContext.Provider value={{currentSong, setCurrentSong, setIsPaused, isPaused,soundPlayed, setSoundPlayed }}>
            <Routes> 
              <Route path='/playlist/:playlistId' element={ <SinglePlaylist/>} />
              <Route path='/library' element={<Library/>}/>
              <Route path="/home" element={<LoggedInHome />} />
              <Route path='/search' element={ <SearchPage/>} />
              <Route path="*" element={<Navigate to="/home" />} />
              <Route path="/uploadSong" element={<UploadSong />} />
              <Route path="/myMusic" element={<MyMusic />} />
           </Routes>  
          </songContext.Provider>         
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
