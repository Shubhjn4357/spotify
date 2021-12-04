 const Reducer=(state,action)=>{
  if(action.type==="User"){
    return action.payload;
  }
  return state
}
const Shrinker=(state,action)=>{
  if(action.type==='shrink'){
    return action.shrink;
  }
  return state
}
const PlayState=(state,action)=>{
  if(action.type==='play'){
    return action.play;
  }
  return state
}
export {Reducer,Shrinker,PlayState}