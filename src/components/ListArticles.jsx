import { fetchArticles } from "../api";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

const ListArticles = () => {
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

useEffect (() => {
    fetchArticles()
    .then((res) => {
        setArticles(res.data.articles)
    })
    .catch((err) => {
        setError("Failed to retrieve articles")
})
 }, []) 

  return (
    <>
      <ArticleCard articles={articles}/>
    </>
  )
}

export default ListArticles;