//import {Skeleton} from "primereact/skeleton"
import AlbumScroller from "../../FuncList/AlbumScroller"
import PlaylistScroller from "../../FuncList/PlaylistScoller"
import TopItem from "../../FuncList/TopItem"
import SavedItems from "../../FuncList/SavedItems"
import "./home.css";
const Home=()=>{
  return(
    <>
<div className="p-fluid">
<TopItem  name="Top Tracks" genere="me" section="top tracks"/>
<TopItem  name="Top Artists" genere="me" section="top artists"/>
<AlbumScroller  name="Latest Release" genere="browse" section="new-releases"/>
<PlaylistScroller  name="Featured Playlist" genere="browse" section="featured-playlists"/>
<SavedItems  name="Saved Albums" genere="me" section="albums"/>
</div>
    </>
    )
}
export default Home;