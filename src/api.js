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

export const fetchArticleById = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}`)
}

export const fetchCommentsById = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}/comments`)
}

export const patchArticle = (article_id, voteValue) => {
  return ncNewsApi.patch(`/articles/${article_id}`, {
    inc_votes: voteValue
  })
}