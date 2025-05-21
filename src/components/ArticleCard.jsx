import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faComments } from "@fortawesome/free-solid-svg-icons";
   

const ArticleCard = ({articles, onClick}) => {
const upvoteIcon = <FontAwesomeIcon icon={faCaretUp} />;
const commentsIcon = <FontAwesomeIcon icon={faComments} />;

  return (
    <div>
        {articles.map((article) => (
        <div onClick={() => onClick(article.article_id)} key={article.article_id} className="article-card">
        <h3>{article.topic}</h3>
        <p>Date posted: {new Date(article.created_at).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        })}</p>
        <p>{article.author}</p>
        <h2>{article.title}</h2>
        <p>{article.votes}</p>
        <button className="article-vote-btn">{upvoteIcon}</button>
        <p>{article.comment_count}</p>
        <button className="comments-btn">{commentsIcon}</button>
        </div>
        ))}
    </div>
  )
}

export default ArticleCard;