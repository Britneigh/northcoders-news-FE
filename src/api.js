import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://northcoders-news-vjlm.onrender.com/api",
});

export const fetchUsers = () => {
  return ncNewsApi.get("/users")
}

export const fetchArticles = (params) => {
  return ncNewsApi.get("/articles", {params: params})
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

export const postComment = (article_id, username, body) => {
  return ncNewsApi.post(`articles/${article_id}/comments`, {
    username: username,
    body: body
  })
}

export const deleteComment = (comment_id) => {
  return ncNewsApi.delete(`/comments/${comment_id}`)
}

export const fetchTopics = () => {
  return ncNewsApi.get("/topics")
}