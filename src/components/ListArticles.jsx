import { fetchArticles, fetchArticleById } from "../api";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { useNavigate } from "react-router-dom";

const ListArticles = () => {
  const [error, setError] = useState(null);
  const [clickError, setClickError] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

useEffect (() => {
  setIsLoading(true)
    fetchArticles()
    .then((res) => {
        setArticles(res.data.articles)
        setIsLoading(false)
    })
    .catch((err) => {
      setIsLoading(false)
      setError("Failed to retrieve articles")
      return error
})
 }, []) 

const handleClick = (article_id) => {
  setIsLoading(true)
  fetchArticleById(article_id)
      .then((res) => {
        setIsLoading(false)
        navigate("/articles/" + article_id)
      })
      .catch((err) => {
        setIsLoading(false)
        setClickError("Failed to retrieve article_id. Try again.")
        return clickError
  })
}

if (isLoading) {
  return <h2>Loading...</h2>
}

  return (
    <div className="listArticles-container">
      <ArticleCard onClick={handleClick} articles={articles}/>
    </div>
  )
}

export default ListArticles;