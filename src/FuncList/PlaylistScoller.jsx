
import {Skeleton} from "primereact/skeleton"
import useApi from "../Utils/useApi";
import {NavLink} from "react-router-dom"
import "./index.scss"
const PlaylistScroller=(props)=>{
  const {loading,response,error}=useApi(`${process.env.REACT_APP_SPOTIFY_URL}${props.genere}/${props.section}`,{
    'method':'GET',
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
 
  return(
    <>
  <div className="p-1 text-left">
   {loading?<div className="slide-container">
   <div className="tab-container">
   <Skeleton className=" mx-2" width="9rem" height="9rem" borderRadius="16px"/>
   <Skeleton className=" mx-2" width="9rem" height="9rem" borderRadius="16px"/>
   <Skeleton className=" mx-2" width="9rem" height="9rem" borderRadius="16px"/>
   <Skeleton className=" mx-2" width="9rem" height="9rem" borderRadius="16px"/>
   <Skeleton className=" mx-2" width="9rem" height="9rem" borderRadius="16px"/>
   </div>
   </div>:
  response?<>
  {response.playlists?<>
  <NavLink className="text-none" to={`get/${props.genere}/${props.section}/${response.playlists.offset}`}>
    <h2 className="text-600 p-2 btn-bounce">{props.name}<span className="sm-2 text-green-500">
      More...
      </span>
    </h2>
  </NavLink>
  <div className="slide-container">
  <div className="tab-container">
  {(response.playlists.items?response.playlists.items:response.items).map((item,key)=>{
    return(  <NavLink key={key} to={`/detail/playlist/${item.id}`} className="slideFrame mx-1">
            <img className="slideImage" src={item.images[0].url} alt={item.name}/>
           <div className="elipse">
            <span className="text-700">{item.name}</span>
           </div>
           <span className="text-700">{item.release_date}</span>
           </NavLink>
           
           )
     })}

  </div>
 </div></>
 :
 <div>error</div>}
 </>
 :
 <div className="text-700">{`${error?error.error.message:"error"}`}</div>
   }
 </div>

    </>
    )
}
export default PlaylistScroller;