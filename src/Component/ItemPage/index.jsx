import {useEffect,useState,useContext} from "react";
import {useParams,useHistory} from "react-router-dom"
import useApi from "../../Utils/useApi";
import Listitem from "../../Utils/ListItem";
import {Skeleton} from "primereact/skeleton"
import {Button} from "primereact/button"
import DetailPanel from "../../FuncList/DetailPanel"
import {Context} from "../../App";
import "./item.scss"
const ItemPage=()=>{
  const history=useHistory();
  const {Dispatch} =useContext(Context)
  const [Toggle,setToggle] =useState(false);
  const [Data,setData] =useState(null);
  
  const {type,item,offset}=useParams();
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
  const {loading,response,error}=useApi(`${process.env.REACT_APP_SPOTIFY_URL}${type}/${item.replace(' ','/')}?offset=${offset}&limit=20`,{
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
const Like=async(e)=>{
  try{
    const res=await fetch(`${process.env.REACT_APP_SPOTIFY_URL}me/${e.type}s?ids=${e.id}`,{
    'method':'PUT',
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
    }
  })
   if(res.status===200){
     window.alert('liked');
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
  const Handlepage=(offset)=>{
    if(offset<0 || offset>81){
      return null
    }
    return history.push(`/get/${type}/${item}/${offset}`)
    
  }
  useEffect(()=>{
    if(!loading && !response && error){
      history.push("/login");
    }
    else{
      setData(response)
    }
  },[error,loading,response,history])
  return(
    <>
   {loading?<Skeleton className=" m-auto" width="100%" height="20rem" borderRadius="16px"/>:
    Data?<div className=" grid grid-nogutter">

    <div className="col-12 md:col-6 d-center p-0 my-4 md:py-3">
    <DetailPanel overlay={Toggle} on={setToggle}/>
   {Data.total?
   (Data.total>20)?<>
   <Button className="bg-green-500 text-100 border-round shadow-5 mx-2" label="" icon="pi pi-arrow-left" onClick={()=>Handlepage(Data.offset-Data.limit)}></Button>
    <h2 className={`text-green-500 p-2 my-2 screen-block ${isShrunk?'shrink':''}`}>{item.toUpperCase()}</h2>
   <Button className="bg-green-500 text-100 border-round shadow-5 mx-2" label="" icon="pi pi-arrow-right" onClick={()=>Handlepage(Data.limit+Data.offset)} ></Button>
   </>
   :<h2 className={`text-green-500 p-2 my-2 screen-block ${isShrunk?'shrink':''}`}>{item.toUpperCase()}</h2>:<div></div>}
   {Data.playlists?
   (Data.playlists.total>20)?<>
   <Button className="bg-green-500 text-100 border-round shadow-5 mx-2" label="" icon="pi pi-arrow-left" onClick={()=>Handlepage(Data.playlists.offset-Data.playlists.limit)}></Button>
    <h2 className={`text-green-500 p-2 my-2 screen-block ${isShrunk?'shrink':''}`}>{item.toUpperCase()}</h2>
   <Button className="bg-green-500 text-100 border-round shadow-5 mx-2" label="" icon="pi pi-arrow-right" onClick={()=>Handlepage(Data.playlists.limit+Data.playlists.offset)} ></Button>
   </>
   :<h2 className={`text-green-500 p-2 my-2 screen-block ${isShrunk?'shrink':''}`}>{item.toUpperCase()}</h2>:<div></div>}
   {Data.albums?
   (Data.albums.total>20)?<>
   <Button className="bg-green-500 text-100 border-round shadow-5 mx-2" label="" icon="pi pi-arrow-left" onClick={()=>Handlepage(Data.albums.offset-Data.albums.limit)}></Button>
    <h2 className={`text-green-500 p-2 my-2 screen-block ${isShrunk?'shrink':''}`}>{item.toUpperCase()}</h2>
   <Button className="bg-green-500 text-100 border-round shadow-5 mx-2" label="" icon="pi pi-arrow-right" onClick={()=>Handlepage(Data.albums.limit+Data.albums.offset)} ></Button>
   </>
   :<h2 className={`text-green-500 p-2 my-2 screen-block ${isShrunk?'shrink':''}`}>{item.toUpperCase()}</h2>:<div></div>}
   </div>
<div className="col-12 md:col-6">
<Listitem data={Data.albums?Data.albums:Data.playlists||Data} like={Like} options={HandleToggle}/>
     </div>

     </div>
     :
     <div className="text-700">{`${error?error:"error"}`}</div>}
    </>
    )
}
export default ItemPage;