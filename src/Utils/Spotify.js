
const authEndpoint = process.env.REACT_APP_SPOTIFY_AUTH; //"https://accounts.spotify.com/authorize";
const getUrl=window.location.href.split('login');
//const redirectUri =encodeURIComponent(getUrl[0]);
const clientId = process.env.REACT_APP_CLIENT_ID ;//"********************";
const scopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-library-read",
  "user-library-modify",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-top-read",
  "app-remote-control",
  "user-follow-read",
  "user-follow-modify"
];
export const loginUrl = `${authEndpoint}?response_type=token&client_id=${clientId}&redirect_uri=${window.location.href}&scope=${scopes.join("%20")}&show_dialog=true&state=1234`;