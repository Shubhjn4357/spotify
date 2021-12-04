
import {Skeleton} from "primereact/skeleton"
import useApi from "../Utils/useApi";
import {NavLink} from "react-router-dom"
import "./index.scss"
const AlbumScroller=(props)=>{
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
   </div>
   
   :
  response?<>
  {response.albums?<>
  <NavLink className="text-none" to={`get/${props.genere}/${props.section.split('%20%').join('/')}/${response.albums.offset}`}>
    <h2 className="text-600 p-2 btn-bounce">{props.name}<span className="sm-2 text-green-500">
      More...
      </span>
    </h2>
  </NavLink>
  <div className="slide-container">
  <div className="tab-container">
  {(response.albums.items).map((item,key)=>{
    return(  <NavLink key={key} to={`/detail/album/${item.id}`} className="slideFrame mx-1">
            <img className="slideImage" src={item.images[0].url} alt={item.name}/>
           <div className="elipse">
            <span className="text-700">{item.name}</span>
           </div>
           <span className="text-700">{item.release_date}</span>
           </NavLink>
           
           )
     })}

  </div>
 </div>
 </>
 :
 <div>error</div>
 }
  </>
 :
 <div className="text-700">{`${error?'error':"error"}`}</div>
     
   }
 </div>
 </>
 )
}
export default AlbumScroller;