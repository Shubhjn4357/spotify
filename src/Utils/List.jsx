import {useContext} from "react";
import {Button} from "primereact/button"
import {Context} from "../App";
import useApi from "./useApi";

const List=(props)=>{
  const {i} = props;
  const {setPlay} =useContext(Context)
  const player=(e)=>{
   
    if(e.type==='track'){
      setPlay({type:'play',play:e})
    }
    else if(e.track){
      setPlay({type:'play',play:e.track})
    }
    else if(e.album.track){
      setPlay({type:'play',play:e.album.track})
    }
    
  }
  const Saved=useApi(`${process.env.REACT_APP_SPOTIFY_URL}me/tracks/contains?ids=${i.id?i.id:i.track?i.track.id:i.album.id}`,{
    'method':'GET', 
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
  
  const TrackLike=async(e)=>{
 
  try{
    const res=await fetch(`${process.env.REACT_APP_SPOTIFY_URL}me/tracks?ids=${e.id||e.track.id||e.album.id||e.playlist.id}`,{
    'method':Saved.response[0]?'DELETE':'PUT', 
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
    }
  })
  if(res.status===200){
    window.alert(Saved.response[0]?'Removed from library':'saved to Your library');
    window.location.reload();
  }
  }
  catch(err){
    console.log(err)
  }
}
   return <div  className="card-container flex shadow-10">
      <div className="card-image">
        {i.images?<img src={i.images[0].url} alt={i.name}/>:<div></div>}
        {i.album?<img src={i.album.images[0].url} alt={i.album.name}/>:<div></div>}
        {i.track?<img src={i.track.album.images[0].url} alt={i.track.album.name}/>:<div></div>}
        <Button onClick={()=>player(i)} className="p-button-success p-2 p-button-rounded p-button-outlined  play-pause" icon="pi pi-play"/>
      </div>
      <div className="card-header overflow-wrap">
        {i.name?<div className="elipse mx-1 name text-green-700">{i.name}</div>:<div></div>}
        {i.album?<div className="elipse mx-1 name text-green-700">{i.album.name}</div>:<div></div>}
        {i.track?<div className="elipse mx-1 name text-green-700">{i.track.name}</div>:<div></div>}
        <div className="card-detail d-center">
        {props.data?
       <div className="d-center artists">Artists-
        {i.artists?<div className="d-center">
           { i.artists.map((v,k)=>{
            return <div key={k} className="text-200 elipse">{v.name}/</div>
          })}
        </div>:<div></div>
        }
        {i.track?<div className="d-center">
           { i.track.album.artists.map((v,k)=>{
            return <div key={k} className="text-200 elipse">{v.name}/</div>
          })}
        </div>:<div></div>
        }
        {i.album?<div className="d-center">
           { i.album.artists.map((v,k)=>{
            return <div key={k} className="text-200 elipse">{v.name}/</div>
          })}
        </div>:<div></div>
        }
         </div>:''}
         
         {i.duration_ms?<div className="text-300">Duration: {parseFloat((i.duration_ms/1000)/60).toFixed(2)} minutes</div>
         :<div></div>}
         {i.track?<div className="text-300">Duration: {parseFloat((i.track.duration_ms/1000)/60).toFixed(2)} minutes</div>
         :<div></div>}
         {i.album?<div className="text-300">Total: {i.album.total_tracks} Tracks</div>
         :<div></div>}
         
        
        </div>
        
      </div>
   
     {!Saved.response?<div></div>:Saved.response[0]?<Button className="p-button-danger p-button-text p-2" onClick={()=>TrackLike(i)} icon="fas fa-heart"/>:<div></div>}
      <Button className="p-button-warning p-button-text p-2" onClick={props.options} icon="pi pi-ellipsis-v "/>
    </div>
  
}
export default List;