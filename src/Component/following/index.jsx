import {useRef,useState} from "react";
import useApi from "../../Utils/useApi";
import {Skeleton} from "primereact/skeleton";
import {NavLink} from 'react-router-dom';
import {Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';


const Following=()=>{
const menu = useRef(null);
const [Target,setTarget] = useState(null);
  const artist=useApi(`${process.env.REACT_APP_SPOTIFY_URL}me/following?type=artist`,{
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
  const Rem=async(i)=>{
    const res=await fetch(`${process.env.REACT_APP_SPOTIFY_URL}me/following?ids=${i.id}&type=artist`,{
    'method':'DELETE',
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }})
   console.log(res)
   if(res.ok){
     window.alert('Item Removed')
     window.location.reload()
     
   }
  }
const ArtistItem=[
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
        {artist.loading?<Skeleton className=" mx-2" width="100%" height="100%" borderRadius="16px"/>:
                artist.response?<div className="block overflow-scroll w-full">
                 {artist.response.artists.items.map((i)=>{
                return(
               
                <div className="text-500 bg-transparent flex-column p-2 w-full" key={i.id}>
                  <div className="flex justify-content-around align-items-center w-full">
                    <NavLink to={`/detail/artist/${i.id}`}><Avatar image={i.images[0].url} imageAlt={i.name[0].toUpperCase()} size='large' shape="circle"/></NavLink>
                    <span className="block">
                      <div className="text-500 p-1">{i.name}</div>
                      <div className="ellipse text-100 mx-1">Total followers {i.followers.total}</div>
                    </span>
                     <Menu model={ArtistItem} popup ref={menu} id="popup_menu" />
                    <Button className="bg-transparent text-500" icon="pi pi-ellipsis-v" onClick={(event) => {menu.current.toggle(event); setTarget(i)}}/>
                  </div>
                </div>
               )
              })}
            </div>:
              <div>No followings</div>
                
    }
    </>
    )
}
export default Following;