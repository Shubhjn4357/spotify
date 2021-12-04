import {useEffect,useState,useContext} from "react";
import {useParams,useHistory} from "react-router-dom"
import useApi from "../../Utils/useApi";
import ListItem from "../../Utils/ListItem";
import {Skeleton} from "primereact/skeleton"
import {Button} from "primereact/button"
import DetailPanel from "../../FuncList/DetailPanel"
import {Context} from "../../App";
const Playlist=()=>{
  const history=useHistory();
  const {response,Dispatch} =useContext(Context)
  const {id}=useParams();
  const [Toggle,setToggle] =useState(false);

  const [isShrunk, setShrunk] = useState(false);

  
const Like=async(e)=>{
  try{
    const res=await fetch(`${process.env.REACT_APP_SPOTIFY_URL}playlists/${e.id}/followers`,{
    'method':'PUT',
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
    }
  })
   if(res.status===200){
     window.alert('added to Your Library');
     window.location.reload()
   }
  }
  catch(err){
    console.log(err)
  }
}
const TrackLike=async(e)=>{
  try{
    const res=await fetch(`${process.env.REACT_APP_SPOTIFY_URL}me/tracks?ids=${e.track.id}`,{
    'method':'PUT', 
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
    }
  })
   if(res.status===200){
     window.alert('liked');
     window.location.reload()
   }
  }
  catch(err){
    console.log(err)
  }
}
  useEffect(() => {
    const handler = () => {
      setShrunk((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 150 ||
            document.documentElement.scrollTop > 150)
        ) {
          return true;
        }

        if (
          isShrunk &&
          document.body.scrollTop < 150 &&
          document.documentElement.scrollTop < 150
        ) {
          return false;
        }

        return isShrunk;
      });
    };

    // Previous logic.
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  const playlist=useApi(`${process.env.REACT_APP_SPOTIFY_URL}playlists/${id}?limit=20&offset=40`,{
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
  const Saved=useApi(`${process.env.REACT_APP_SPOTIFY_URL}playlists/${id}/followers/contains?ids=${response?response.id:''}`,{
    'method':'GET', 
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  })
  const HandleToggle=(e)=>{
  setToggle(!Toggle)
  return Dispatch({type:'User',payload:e})
}
  useEffect(()=>{
    if(!playlist.loading && !playlist.response && playlist.error){
      history.push("/login");
    }
  },[playlist,history])

  return(
    <>
  {playlist.loading?<Skeleton className="" width="100%" height="100vh" borderRadius="1rem" />:
  playlist.response?
  <div className="grid grid-nogutter">
      <div className="col-12 d-center my-2">
    <DetailPanel overlay={Toggle} on={setToggle}/>
        {playlist.loading?<Skeleton className="" width="9rem" height="9rem" borderRadius="1rem" />
        :
        playlist.response.images?<div className={`screen-block ${isShrunk?'shrink':''}`}>
          <img src={playlist.response.images[0].url} alt={playlist.response.name}/>
        </div>
        :
        <div className={`screen-block ${isShrunk?'shrink':''}`}>
          error
        </div>
        }
      </div>
      <div className="col-12 mt-2">
        {playlist.loading?<Skeleton className="" width="100%" height="4rem" borderRadius="1rem" />
        :
        <div className="head-name text-500">{playlist.response.name}</div>
        }
      </div>
      <div className="col-12 my-2">
        {playlist.loading?<Skeleton className="" width="100%" height="4rem" borderRadius="1rem" />
        :
        playlist.response.artists?
        <div className="artists d-center text-200">
        Artists-by:
          {playlist.response.artists.map((v)=>{
            return <div key={v.id} className="text-500 fs-sm">{v.name},</div>
          })}
        </div>:<div></div>
        }
      </div>
      <div className="col-12 my-2">
        {playlist.loading?<Skeleton className="" width="100%" height="4rem" borderRadius="1rem" />
        :
        playlist.response.copyrights?
        <div className="artists text-200">
        copyright:
        <div className="text-500 text-sm">{playlist.response.copyrights[0].text}</div>
         
        </div>:<div></div>
        }
      </div>
<div className="col-12 my-2">
        {playlist.loading?<Skeleton className="" width="10rem" height="4rem" borderRadius="1rem" />
        :
        <div className="options flex text-200">
          {!Saved.response?<div></div>:<Button className="p-button-danger p-button-text p-2" onClick={()=>Like(playlist.response)}icon={`${Saved.response[0]?"fas":'far'} fa-heart`}/>}
          <Button className="p-button-warning p-button-text p-2" onClick={()=>HandleToggle(playlist.response)} icon="pi pi-ellipsis-v "/>
        </div>
        }
      </div>
<div className="col-12 my">
        {playlist.loading?<Skeleton className="" width="10rem" height="4rem" borderRadius="1rem" />
        :
        playlist.response.tracks?
        <div className="songslist block text-200">
         <ListItem data={playlist.response.tracks} like={TrackLike} options={HandleToggle}/>
        </div>:<div>error</div>
        }
      </div>   
    </div>:<div>error</div>
    }
    
    </>
    )
}
export default Playlist;