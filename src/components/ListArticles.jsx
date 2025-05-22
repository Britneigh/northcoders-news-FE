import { fetchArticleById } from "../api";
import { useState } from "react";
import ArticleCard from "./ArticleCard";
import { useNavigate } from "react-router-dom";


const ListArticles = ({articles}) => {
  const [clickError, setClickError] = useState(null);
  const navigate = useNavigate();


const handleClick = (article_id) => {
  fetchArticleById(article_id)
      .then(() => {
        navigate("/articles/" + article_id)
      })
      .catch((err) => {
        setClickError("Failed to retrieve article_id. Try again.")
  })
}


  return (
    <div className="listArticles-container">
      {clickError && <p>{clickError}</p>}
      <ArticleCard onClick={handleClick} articles={articles}/>
    </div>
  )
}

export default ListArticles;