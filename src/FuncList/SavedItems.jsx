
import {Skeleton} from "primereact/skeleton"
import useApi from "../Utils/useApi";
import {NavLink} from "react-router-dom"
import "./index.scss"
const SavedItems=(props)=>{
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
  {response.total?<>
  <NavLink className="text-none" to={`get/${props.genere}/${props.section}/${response.offset}`}>
    <h2 className="text-600 p-2 btn-bounce">{props.name}<span className="sm-2 text-green-500">
      More...
      </span>
    </h2>
  </NavLink>
  <div className="slide-container">
  <div className="tab-container">
  {(response.items?response.items:response.album?response.album.items:response.track.ite).map((item,key)=>{

    return(  <NavLink key={key} to={`/detail/${item.type?item.type:item.album?item.album.type:item.track.type}/${item.id?item.id:item.album?item.album.id:item.track.id}`} className="slideFrame mx-1">
               {item.images?<img className="slideImage" src={item.images[0].url} alt={item.name}/>:<div></div>}
               {item.album?<img className="slideImage" src={item.album.images[0].url} alt={item.album.name}/>:<div></div>}
               {item.track?<img className="slideImage" src={item.track.album.images[0].url} alt={item.track.album.name}/>:<div></div>}
           <div className="elipse">
            <span className="text-700">{item.name?item.name:item.album?item.album.name:item.track.name}</span>
           </div>
           <span className="text-700">{item.release_date?item.release_date:item.album?item.album.release_date:item.track?item.track.release_date:""}</span>
           </NavLink>
           
           )
     })}

  </div>
 </div>
 </>
 :<div className="text-600">No {props.section} Saved</div>}
 </>
 :
 <div className="text-700">{`${error?error.error.message:"error"}`}</div>
 }
 </div>
    </>
    )
}
export default SavedItems;