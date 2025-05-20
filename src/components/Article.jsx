import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchArticleById } from "../api";
   
const Article = () => {
    
const params = useParams();
const articleId = params.article_id;
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [article, setArticle] = useState({});

useEffect(() => {
  setIsLoading(true)
    fetchArticleById(articleId)
    .then((res) => {
        setIsLoading(false)
        setArticle(res.data.article)
    })
    .catch((err) => {
    setIsLoading(false)
    setError("Failed to retrieve article_id. Try again.")
    return error
  })
}, []);

useEffect(() => {
 console.log(article)
}, [article])
  return (
    <div>
        <Link to="/newsfeed"><button className="back-btn">Back to Newsfeed</button></Link>
        <div className="article-container">
            <div className="topic-date-row">
            <h1>{article.topic}</h1>
            <p>Date posted: {new Date(article.created_at).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            })}</p>
        </div>
        <h3>@{article.author}</h3>
        <h2>{article.title}</h2>
        <p>{article.body}</p>
        <div className="article-image">
            <img src={article.article_img_url} alt="article image"></img>
            <div class="article-btn-row">
                <button>Upvote icon</button>
                <button>Downvote icon</button>
                <p>{article.votes}</p>
                <button>Comment count icon</button>
                <p>{article.comment_count}</p>
            </div>
        </div>

        </div>
    </div>
  )
}

export default Article;