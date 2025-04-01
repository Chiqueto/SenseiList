import axios from "axios";

const api = axios.create({
  baseURL: "https://api.allorigins.win/raw?url=https://api.jikan.moe/v4",
});
export default api;
