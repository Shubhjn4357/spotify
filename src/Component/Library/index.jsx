import useApi from "../../Utils/useApi";
import Loader from "../../Utils/Loader";
import {Card} from "primereact/card"
import {AlbumList,ArtistList,TrackList,PlayList} from "../../Utils/ListItem";
import {useState,useContext} from "react";
import {NavLink} from "react-router-dom";
import { DataView } from 'primereact/dataview';
import {TabView,TabPanel } from 'primereact/tabview';
import DetailPanel from "../../FuncList/DetailPanel"
import {Context} from "../../App";

const Library=()=>{
  
    const [active,setActive]=useState(0);
  const [activeIndex,setActiveIndex]=useState(0);
  const [Toggle,setToggle] =useState(false);
  const {response,Dispatch} =useContext(Context)
const HandleToggle=(e)=>{
  setToggle(!Toggle)
  return Dispatch({type:'User',payload:e})
}  
const Like=async(e,type)=>{
try{
    const res=await fetch(`${process.env.REACT_APP_SPOTIFY_URL}me/${type}?ids=${e.id}`,{
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
  const tracks=useApi(`${process.env.REACT_APP_SPOTIFY_URL}me/tracks`,{
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
  const albums=useApi(`${process.env.REACT_APP_SPOTIFY_URL}me/albums`,{
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
const following=useApi(`${process.env.REACT_APP_SPOTIFY_URL}me/following?type=artist`,{
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
const playlist=useApi(`${process.env.REACT_APP_SPOTIFY_URL}me/playlists`,{
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
const genres=useApi(`${process.env.REACT_APP_SPOTIFY_URL}browse/categories?country=${response?response.country:''}`,{
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
 
const Items=[
  {
    id:1,
    label:'Album',
    data:albums.response?albums.response.items:null,
  },
  {
    id:2,
    label:'Playlist',
    data:playlist.response?playlist.response.items:null,
  },
  {
    id:3,
    label:'Followings',
    data:following.response?following.response.artists.items:null,
  },
  {
    id:4,
    label:'Tracks',
    data:tracks.response?tracks.response.items:null,
  },
  {
    id:5,
    label:'Categories',
    data:genres.response?genres.response.categories.items:null,
  },
  ]
const Template=(item)=>{
  if(!item){
       return <div className="text-700">no data available</div>
   }
  if(item.type==='artist'){
    return  <ArtistList data={item} like={Like} options={HandleToggle}/>
  }
  else if(item.album){
    return <AlbumList data={item.album} like={Like} options={HandleToggle}/>
  }
  else if(item.track){
     return  <TrackList data={item.track} like={Like} options={HandleToggle}/>
   }
 else if(item.type==="playlist"){
   return <PlayList data={item} like={Like} options={HandleToggle}/>
 }
 else{
   return <NavLink className="no-underline btn-bounce m-2" to={`/category/${item.id}`}>
   <Card style={{background:`url(${item.icons[0].url})`}}>
    <div className="d-center">
      <div>{item.name}</div>
    </div>
   </Card>
   </NavLink>
 }
 }
  return(
    <>
      <div className="container">
      <DetailPanel overlay={Toggle} on={setToggle}/>
        <div className="w-full overflow-scroll">
        {(albums.loading || playlist.loading|| following.loading || tracks.loading)?
        <Loader height={window.screen.height} size={80}/>:
        <TabView activeIndex={active} onTabChange={(e) => setActive(e.index)} renderActiveOnly>
          {Items.map((v)=>{
             if(v.data==='error'){
               return <TabPanel header={'no data available'}/>
             }
               return (
            <TabPanel key={v.id} header={v.label}>
            {v.data?
             <DataView value={v.data}
                       itemTemplate={Template} 
                       paginator 
                       first={activeIndex}
                       onPage={(e)=>setActiveIndex(e.first)} 
                       rows={10}/>:<div className="text-white">no data</div>}
             </TabPanel>
 )
   
   })}
</TabView>}
        </div>
      </div>
    </>
    )
}
export default Library;