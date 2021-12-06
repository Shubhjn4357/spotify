import {BrowserRouter} from "react-router-dom";

import App from "./App";
const Main=()=>{
  return <BrowserRouter basename="spotify/index.html/">
  <App/>
  </BrowserRouter>
}
export default Main;