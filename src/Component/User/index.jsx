import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import {useContext,useRef,useState} from "react";
import useApi from "../../Utils/useApi";
import {Context} from "../../App";
import {Skeleton} from "primereact/skeleton";
import {NavLink} from 'react-router-dom';
import {Menu } from 'primereact/menu';

import "./user.scss";
const User=()=>{
  const menu = useRef(null);
  const [Target,setTarget]= useState(null);
  const {response,loading} =useContext(Context);
  const artist=useApi(`${process.env.REACT_APP_SPOTIFY_URL}me/following?type=artist`,{
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
  const Rem=async(item)=>{
    const Res=await fetch(`${process.env.REACT_APP_SPOTIFY_URL}playlists/${item}/followers`,{
    'method':'DELETE',
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
    }
    })
   
   if(Res.status===200){
     window.alert('Item Removed')
     window.location.reload()
     
   }
  }
  const playlist=useApi(`${process.env.REACT_APP_SPOTIFY_URL}me/playlists`,{
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
  const Items=[
    {
      id:1,
      label:'Playlist',
      data:playlist.response?playlist.response.total:'',
      icon:'pi pi-book',
      link:'/me/playlist'
    },
    {
      id:2,
      label:'followers',
      data:response?response.followers.total:'',
      icon:'pi pi-users',
      link:'#'
    },
    {
      id:3,
      label:'following',
      data:artist.response?artist.response.artists.total:'',
      icon:'pi pi-user-plus',
      link:'/me/following'
    },
    
    ]
   const playlistItem=[
         {
           label:'Options',
           icon:'pi pi-setting',
           items:[
             {
               label:'Unfollow',
               icon:'pi pi-book',
               command:()=>{
                  Rem(Target)
                  }
             }
             ]
         },
     ]
     
  return (
    <>
      {loading?<Skeleton className=" mx-2" width="100%" height="100%" borderRadius="16px"/>:
      !response?<div className="text-300">error</div>:
      <div className="container">
        <div className="p-3 grid">
          <div className="col-12 md:col-6 d-center">
            {response.images?<Avatar image={response.images[0]?response.images[0].url:'https://picsum.photos/200/200'} 
                                     imageAlt={response.display_name[0].toUpperCase()} 
                                     shape="circle"
                                     style={{width:"12rem",height:'12rem'}}/>:
              <div></div>
            }
          </div>
          <div className="col-12 md:col-6 d-center flex-column">
            <div className="name text-600 p-2">{response.display_name[0].toUpperCase()+response.display_name.slice(1)}</div>
            <div className="flex justify-content-around align-items-center border-bottom-2 border-white">
              {Items.map((i)=>{
                return <Button className="bg-transparent flex-column" key={i.id}>
                <NavLink className="text-500" style={{textDecoration:'none'}} to={i.link}>
                <div className="d-center">
                  <i className={`${i.icon} mx-1`}/>
                  <div className="">{i.label}</div>
                </div>
                <span className="p-1">{i.data}</span>
                </NavLink>
                </Button>
              })}
            </div>
            
            {playlist.response?<div className="block overflow-scroll w-full">
             <Menu model={playlistItem} popup ref={menu} id="popup_menu" />
              {playlist.response.items.map((i)=>{
                return(
               
                <div className="text-500 bg-transparent flex-column p-2 w-full" key={i.id}>
                  <div className="flex justify-content-around align-items-center w-full">
                    <NavLink to={`/detail/playlist/${i.id}`}><Avatar image={i.images[0].url} imageAlt={i.name[0].toUpperCase()} size='large' shape="circle"/></NavLink>
                    <span className="block">
                      <div className="text-500 p-1">{i.name}</div>
                      <div className="ellipse text-100 mx-1">{i.description}</div>
                      <div className="text-secondary mx-2">Total Tracks {i.tracks.total}</div>
                    </span>
                    
                    <Button className="bg-transparent text-500" icon="pi pi-ellipsis-v" onClick={(event) => {menu.current.toggle(event); setTarget(i.id)}}/>
                  </div>
                </div>
               )
              })}
            </div>:
              <div>no playlist Saved</div>
            }
          </div>
        </div>
      </div>
      }
    </>
    )
}
export default User;