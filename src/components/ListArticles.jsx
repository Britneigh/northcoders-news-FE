import { fetchArticles, fetchArticleById } from "../api";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const ListArticles = () => {
  const [clickError, setClickError] = useState(null);
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  const {isLoading, setIsLoading, error, setError} = useContext(UserContext);

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
})
 }, []) 

const handleClick = (article_id) => {
  fetchArticleById(article_id)
      .then(() => {
        navigate("/articles/" + article_id)
      })
      .catch((err) => {
        setClickError("Failed to retrieve article_id. Try again.")
  })
}

if (isLoading) {
  return <h2>Loading...</h2>
}

  return (
    <div className="listArticles-container">
      {error && <p>{error}</p>}
      {clickError && <p>{clickError}</p>}
      <ArticleCard onClick={handleClick} articles={articles}/>
    </div>
  )
}

export default ListArticles;