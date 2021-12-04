import {useEffect,useState,useContext} from "react";
import {useParams,useHistory} from "react-router-dom"
import useApi from "../../Utils/useApi";
import ListItem from "../../Utils/ListItem";
import {Skeleton} from "primereact/skeleton"
import {Button} from "primereact/button"
import DetailPanel from "../../FuncList/DetailPanel"
import {Context} from "../../App";
const Track=()=>{
  const history=useHistory();
  const {Dispatch} =useContext(Context)
  const {id}=useParams();
  const [Toggle,setToggle] =useState(false);

  const [isShrunk, setShrunk] = useState(false);



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
  const {loading,response,error}=useApi(`${process.env.REACT_APP_SPOTIFY_URL}tracks/${id}`,{
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
  const Saved=useApi(`${process.env.REACT_APP_SPOTIFY_URL}me/tracks/contains?ids=${id}`,{
    'method':'GET', 
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  })
  const Like=async(e)=>{
 
  try{
    const res=await fetch(`${process.env.REACT_APP_SPOTIFY_URL}me/tracks?ids=${e.id}`,{
    'method':Saved.response[0]?"DELETE":'PUT',
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
    }
  })
   if(res.status===200){
     window.alert(`${Saved.response[0]?"Removed from Yor Library":'Added to Library'}`);
     window.location.reload()
   }
  }
  catch(err){
    console.log(err)
  }
}
  const HandleToggle=(e)=>{
  setToggle(!Toggle)
  return Dispatch({type:'User',payload:e})
}
  useEffect(()=>{
    if(!loading && !response && error){
      history.push("/login");
    }
  },[error,loading,response,history])

  return(
    <>
  {response?
  <div className="grid grid-nogutter">
      <div className="col-12 d-center my-2">
    <DetailPanel overlay={Toggle} on={setToggle}/>
        {loading?<Skeleton className="" width="9rem" height="9rem" borderRadius="1rem" />
        :
        response.album.images?<div className={`screen-block ${isShrunk?'shrink':''}`}>
          <img src={response.album.images[0].url} alt={response.album.name}/>
        </div>
        :
        <div className={`screen-block ${isShrunk?'shrink':''}`}>
          error
        </div>
        }
      </div>
      <div className="col-12 my-2">
        {loading?<Skeleton className="" width="100%" height="4rem" borderRadius="1rem" />
        :
        <div className="head-name text-500">{response.album.name}</div>
        }
      </div>
      <div className="col-12 my-2">
        {loading?<Skeleton className="" width="100%" height="4rem" borderRadius="1rem" />
        :
        response.album.artists?
        <div className="artists d-center text-200">
        Artists-by:
          {response.album.artists.map((v)=>{
            return <div key={v.id} className="text-500 fs-sm">{v.name},</div>
          })}
        </div>:<div></div>
        }
      </div>
      <div className="col-12 my-2">
        {loading?<Skeleton className="" width="100%" height="4rem" borderRadius="1rem" />
        :
        response.album.copyrights?
        <div className="artists text-200">
        copyright:
        <div className="text-500 text-sm">{response.album.copyrights[0].text}</div>
         
        </div>:<div></div>
        }
      </div>
<div className="col-12 my-2">
        {loading?<Skeleton className="" width="10rem" height="4rem" borderRadius="1rem" />
        :
        <div className="options flex text-200">
          {!Saved.response?<div></div>:<Button className="p-button-danger p-button-text p-2" onClick={()=>Like(response)}icon={`${Saved.response[0]?"fas":'far'} fa-heart`}/>}
          <Button className="p-button-warning p-button-text p-2" onClick={()=>HandleToggle(response)} icon="pi pi-ellipsis-v "/>
        </div>
        }
      </div>
<div className="col-12 my">
        {loading?<Skeleton className="" width="10rem" height="4rem" borderRadius="1rem" />
        :
        response.album.tracks?
        <div className="songslist block text-200">
         <ListItem data={response.album.tracks} like={Like} options={HandleToggle}/>
        </div>:<div>error</div>
        }
      </div>   
   
   
   
    </div>
      :
      <div>error</div>
    }
    
    </>
    )
}
export default Track;