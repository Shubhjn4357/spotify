import useApi from "../../Utils/useApi";


import { Avatar } from 'primereact/avatar';
import { Card } from 'primereact/card';

import {useParams,NavLink} from "react-router-dom";
import {Skeleton} from "primereact/skeleton";
const Category=()=>{
  const {gen}=useParams();

  const Cat=useApi(`${process.env.REACT_APP_SPOTIFY_URL}browse/categories/${gen}`,{
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
  const playlist=useApi(`${process.env.REACT_APP_SPOTIFY_URL}browse/categories/${gen}/playlists`,{
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
  return (
    <>
    {Cat.loading?<Skeleton className=" mx-2" width="100%" height="100%" borderRadius="16px"/>:
    Cat.response?<div className="container p-2">
      <div className="d-center flex-column">
        <Avatar style={{width:"10rem",height:"10rem"}} image={Cat.response.icons[0].url} imageAlt={Cat.response.name.toUpperCase()} size='large' shape="circle"/>
        <div className="t p-2 my-4 color-frame">{Cat.response.name.toUpperCase()}</div>
      </div>
     {playlist.response?
     <div className="py-2 grid gird-nogutter">
        {playlist.response.playlists.items.map((i)=>{
        return <NavLink to={`/detail/playlist/${i.id}`} key={i.id} className="col-6 md:col-4 no-underline">
          <Card className="p-2 d-center flex-column">
            <Avatar style={{width:"100%",height:"100%"}} image={i.images[0].url} imageAlt={i.name.toUpperCase()} size='large' shape="square"/>
            <div className="my-2 ">{i.name}</div>
          </Card>
        </NavLink>
        })}
      </div>:<div className="text-white p-5">no data available</div>}
    </div>:<div className="text-white p-5">error</div>}
    </>
    )
}
export default Category;