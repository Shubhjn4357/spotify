import Home from "../Home/index";
import Error from "../Error/index";
import User from "../User/index";
import About from "../About/index";
import Saved from "../Saved/index";
import Following from "../following/index";
import Myplaylist from "../Myplaylist/index";
import Setting from "../Setting/index";
import Artist from "../Artist/index";
import Library from "../Library/index";
import Search from "../Search/index";
import Login from "../Login/index";
import Album from "../Album/index";
import Track from "../Track/index";
import Playlist from "../Playlist/index";
import ItemPage from "../ItemPage/index";
import Category from "../Category/index";
import {Route,Switch} from "react-router-dom";
const Routes=()=>{
  return(
    <>
   <div className="" style={{marginBottom:'5rem',paddingBottom:'5rem'}}>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/setting" component={Setting}/>
    <Route exact path="/library" component={Library}/>
    <Route exact path="/search" component={Search}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/me" component={User}/>
    <Route exact path="/about" component={About}/>
    <Route exact path="/saved" component={Saved}/>
    <Route exact path="/category/:gen" component={Category}/>
    <Route exact path="/me/playlist" component={Myplaylist}/>
    <Route exact path="/me/following" component={Following}/>
    <Route exact path="/detail/album/:id" component={Album}/>
    <Route exact path="/detail/track/:id" component={Track}/>
    <Route exact path="/detail/artist/:id" component={Artist}/>
    <Route exact path="/detail/playlist/:id" component={Playlist}/>
    <Route exact path="/get/:type/:item/:offset" component={ItemPage}/>
    <Route component={Error}/>
    </Switch>
  </div>
    </>
    )
}
export default Routes;