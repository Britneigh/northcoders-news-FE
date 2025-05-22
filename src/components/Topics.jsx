import { fetchArticles, fetchArticleById } from "../api";
import ListTopics from "./ListTopics";
import TopicsNavBar from "./TopicsNavBar";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


const Topics = () => {
    const [error, setError] = useState(null);
    const [articleError, setArticleError] = useState(null);
    const [articlesByTopic, setArticlesByTopic] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {topic} = useParams();

useEffect(() => {
    setIsLoading(true)
    fetchArticles({topic})
    .then((res) => {
        setError(null);
        setIsLoading(false);
        setArticlesByTopic(res.data.articles);
    })
    .catch(() => {
        setIsLoading(false);
        setError("Failed to load articles for that topic.");
    });
}, [topic]);

const handleClick = (topic) => {
    navigate(`/topics/${topic}`);
}

const handleNavigate = (article_id) => {
  fetchArticleById(article_id)
      .then(() => {
        navigate("/articles/" + article_id)
      })
      .catch((err) => {
        setArticleError("Failed to retrieve article_id. Try again.")
  })
}
  return (
    <>
    {isLoading ? (<h2>Loading...</h2>) : (<>
        <div>
        <Link to="/newsfeed"><button className="back-btn">Back</button></Link>
        <TopicsNavBar onClick={handleClick}/>
        </div>
        <div className="listArticles-container">
        {error && <p>{error}</p>}
        {articleError && <p>{articleError}</p>}
        <ListTopics articles={articlesByTopic} onClick={handleNavigate}/>
        </div>
        </>)}
    </>
  )
}

export default Topics;