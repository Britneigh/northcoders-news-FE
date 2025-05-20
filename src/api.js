import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://northcoders-news-vjlm.onrender.com/api",
});

export const fetchUsers = () => {
  return ncNewsApi.get("/users")
}

export const fetchArticles = () => {
  return ncNewsApi.get("/articles")
}