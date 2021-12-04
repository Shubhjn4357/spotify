import {useContext} from "react";
import {Button} from "primereact/button"
import {Context} from "../App";
import {NavLink} from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import List from "./List";
import useApi from "./useApi";
import "./utils.scss";

const Listitem=(props)=>{
  return (<div className="card">
  {props.data?
    props.data.items.map((i,key)=>{
    return <List  key={key} i={i} like={()=>props.like(i)} options={()=>{props.options(i)}}/>
    })
    :
    <div>error</div>
  }
  </div>)
}
const TrackList=(props)=>{
  const {setPlay} =useContext(Context)

  const player=(e)=>{
    setPlay({type:'play',play:e})
  }
  
  const Saved=useApi(`${process.env.REACT_APP_SPOTIFY_URL}me/tracks/contains?ids=${props.data.album.id}`,{
    'method':'GET', 
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
  
  const TrackLike=async(e,s)=>{
  try{
    const res=await fetch(`${process.env.REACT_APP_SPOTIFY_URL}me/tracks?ids=${e.id}`,{
    'method':'DELETE', 
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
    }
  })
  if(res.ok){
    window.alert('Removed from library');
    window.location.reload();
  }
  }
  catch(err){
    console.log(err)
  }
}
  return (<>
  {props.data?<div className="card-container flex shadow-10">
      <div className="card-image">
        {props.data.album.images[0]?<img src={props.data.album.images[0].url} alt={props.data.name}/>:<div></div>}
        <Button onClick={()=>player(props.data)} className="p-button-success p-2 p-button-rounded p-button-outlined  play-pause" icon="pi pi-play"/>
      </div>
      <div className="card-header">
        <div className="elipse mx-1 name text-green-700">{props.data.name?props.data.name:props.data.track.name}</div>
        <div className="card-detail d-center">
          {props.data.album.artists?props.data.album.artists.map((v,i)=>{
          
            return <span className="text-500" key={i}>{v.name}</span>
          }):<div></div>}
        </div>
        {props.data.album.release_date?<div className="text-300">Released on: {props.data.album.release_date}</div>
         :<div></div>}
  
        
      </div>
   
      {Saved.response?
      <div>{Saved.response[0]?
      <Button className="p-button-danger p-button-text p-2" onClick={()=>TrackLike(props.data,Saved.response[0])} icon="fas fa-heart"/>:''}
      </div>
      :''}
      <Button className="p-button-warning p-button-text p-2" onClick={()=>props.options(props.data)} icon="pi pi-ellipsis-v "/>
    </div>
    :
    <div>error</div>
  }
  </>)
}
const ArtistList=(props)=>{
  const {setPlay} =useContext(Context)

  const player=(e)=>{
    setPlay({type:'play',play:e})
  }
  return (<>
  {props.data?<div className="card-container flex shadow-10">
      <div className="card-image">
        {props.data.images[0]?<img src={props.data.images[0].url} alt={props.data.name}/>:<div></div>}
        <Button onClick={()=>player(props.data)} className="p-button-success p-2 p-button-rounded p-button-outlined  play-pause" icon="pi pi-play"/>
      </div>
      <div className="card-header">
        <div className="elipse mx-1 name text-green-700">{props.data.name?props.data.name:props.data.track.name}</div>
        <div className="card-detail d-center">
          {props.data.genres.map((v,i)=>{
            return <span className="text-500" key={i}>{v}/</span>
          })}
          <div className="text-500">followers {props.data.followers.total}</div>
        </div>
        
      </div>
   
      
      <Button className="p-button-warning p-button-text p-2" onClick={()=>props.options(props.data)} icon="pi pi-ellipsis-v "/>
    </div>
    :
    <div>error</div>
  }
  </>)
}
const AlbumList=(props)=>{
  const {setPlay} =useContext(Context)
const Saved=useApi(`${process.env.REACT_APP_SPOTIFY_URL}me/albums/contains?ids=${props.data.id}`,{
    'method':'GET', 
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
const AlbumLike=async(e)=>{
 
  try{
    const res=await fetch(`${process.env.REACT_APP_SPOTIFY_URL}me/albums?ids=${e.id}`,{
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
  const player=(e)=>{
    setPlay({type:'play',play:e})
  }
  return (<>
  {props.data?<div className="card-container flex shadow-10">
      <div className="card-image">
        {props.data.images[0]?<img src={props.data.images[0].url} alt={props.data.name}/>:<div></div>}
        <Button onClick={()=>player(props.data)} className="p-button-success p-2 p-button-rounded p-button-outlined  play-pause" icon="pi pi-play"/>
      </div>
      <div className="card-header">
        <div className="elipse mx-1 name text-green-700">{props.data.name?props.data.name:props.data.name}</div>
        <div className="card-detail d-center">
          {props.data.artists?props.data.artists.map((v,i)=>{
          
            return <span className="text-500" key={i}>{v.name}/</span>
          }):<div></div>}
        </div>
        {props.data.release_date?<div className="text-300">Released on: {props.data.release_date}</div>
         :<div></div>}
  
        
      </div>
   
      {Saved.response?<Button className="p-button-danger p-button-text p-2" onClick={()=>AlbumLike(props.data)} icon={`${Saved.response[0]?"fas":'far'} fa-heart`}/>:''}
      <Button className="p-button-warning p-button-text p-2" onClick={()=>props.options(props.data)} icon="pi pi-ellipsis-v "/>
    </div>
    :
    <div>error</div>
  }
  </>)
}
const PlayList=(i)=>{
  const {setPlay} =useContext(Context)

  const player=(e)=>{
    setPlay({type:'play',play:e})
  }
  return (<>
             <div className="text-500 bg-transparent flex-column p-2 w-full" key={i.id}>
                  {i.data?<div className="flex justify-content-between align-items-center w-full">
                    <NavLink to={`/detail/playlist/${i.data.id}`}>
                      <Avatar className="ripple" onClick={()=>{player(i.data)}} image={i.data.images[0].url} imageAlt={i.data.owner.display_name[0].toUpperCase()} size='large' shape="circle"/>
                    </NavLink>
                    <span className="block mx-1">
                      <div className="text-500 p-1">{i.data.owner.display_name}</div>
                      <div className=" elipse" style={{width:'15rem'}}><div className=" text-100 mx-1">{i.data.description}</div></div>
                      <div className="text-secondary mx-2">Total Tracks {i.data.tracks.total}</div>
                    </span>
                  </div>:<div></div>}
                </div>
  </>)
  }
export {ArtistList,TrackList,AlbumList,PlayList};
export default Listitem;
