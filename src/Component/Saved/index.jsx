import SavedItems from "../../FuncList/SavedItems"
const Saved=()=>{
  return (<>
  <div className="container">
    <h2 className=" text-green-500 r p-2 mx-1 my-2">
      Saved
    </h2>
   <div className="p-fluid">
    <SavedItems  name="Saved Albums" genere="me" section="albums"/>
    <SavedItems  name="Saved Playlists" genere="me" section="tracks"/>
    <SavedItems  name="Saved Tracks" genere="me" section="playlists"/>
  </div>
  </div>
  </>)
}
export default Saved;