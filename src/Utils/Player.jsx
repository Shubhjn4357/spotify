import SpotifyPlayer from 'react-spotify-web-playback';
import {useContext} from "react";
import {Context} from "../App";
const Player=(props)=>{
const {Play} =useContext(Context)
const Style={
  position:'fixed',
  left:'0',
  bottom:'5rem',
  width:'100%'
}

return(
  <>
  {Play?<div style={Style}>
  <SpotifyPlayer
    token={localStorage.getItem("access_token")}
    uris={[Play.uri]}
    autoplay={true}
    initialVolume={1}
    locale={Play.name}
    magnifySliderOnHover={true}
    name={'webplayer'}
    offset={10}
    persistDeviceSelection={true}
    play={Play?true:false}
    showSaveIcon={true}
    updateSavedStatus={()=>console.log("setSave")}
    styles={{
    activeColor: '#3a0707',
    bgColor: '#000000',
    color: '#ad3e53',
    loaderColor: '#ffb600',
    sliderColor: '#ff8900',
    trackArtistColor: '#ccc',
    trackNameColor: '#fff',
  }}/>
  </div>:<div></div>}
  </>
  )
}
export default Player;