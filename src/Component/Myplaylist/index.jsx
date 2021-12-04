import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import {useRef,useState} from "react";
import useApi from "../../Utils/useApi";
import {Skeleton} from "primereact/skeleton";
import {NavLink} from 'react-router-dom';
import {Menu } from 'primereact/menu';

const Myplaylist=()=>{
  const menu = useRef(null);
  const [Target,setTarget] = useState(null);
  const playlist=useApi(`${process.env.REACT_APP_SPOTIFY_URL}me/playlists`,{
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
  const Rem=async(item)=>{
    const Res=await fetch(`${process.env.REACT_APP_SPOTIFY_URL}playlists/${item.id}/followers`,{
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
  return(
    <>
    {playlist.loading?<Skeleton className=" mx-2" width="100%" height="100%" borderRadius="16px"/>:
                playlist.response?<div className="block overflow-scroll w-full">
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
                    <Button className="bg-transparent text-500" icon="pi pi-ellipsis-v" onClick={(e) => {menu.current.toggle(e); setTarget(i)}}/>
                  </div>
                </div>
               )
              })}
            </div>:
              <div>no playlist Saved</div>
                
    }
    </>
    )
}
export default Myplaylist