
import {Skeleton} from "primereact/skeleton"
import useApi from "../Utils/useApi";
import {NavLink} from "react-router-dom"
import "./index.scss"
const TopItem=(props)=>{
  const {loading,response,error}=useApi(`${process.env.REACT_APP_SPOTIFY_URL}${props.genere}/${props.section.replace(' ','/')}`,{
    'method':'GET',
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
  return(
    <>
  <div className="p-1 text-left">
   {loading? <div className="slide-container">
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
  {response.items?<>
  <NavLink className="text-none" to={`get/${props.genere}/${props.section}/${response.offset}`}>
    <h2 className="text-600 p-2 btn-bounce">{props.name}<span className="sm-2 text-green-500">
      More...
      </span>
    </h2>
  </NavLink>
  <div className="slide-container">
  <div className="tab-container">
  {(response.items).map((item,key)=>{
    return(  <NavLink key={key} to={`/detail/${item.type}/${item.id}`} className="slideFrame mx-1">
            <img className="slideImage" src={item.album?item.album.images[0].url:item.images[0].url} alt={item.name}/>
           <div className="elipse">
            <span className="text-700">{item.name}</span>
           </div>
           <span className="text-700">{item.album?`Realease Date:${item.album.release_date}`:`Followers:${item.followers.total}`}</span>
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
export default TopItem;