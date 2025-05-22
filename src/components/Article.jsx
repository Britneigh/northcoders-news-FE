import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchArticleById, patchArticle, fetchCommentsById, deleteComment } from "../api";
import ListComments from "./ListComments";
import Comment from "./Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown, faComments } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "./UserContext";
   
const Article = () => {
  const upvoteIcon = <FontAwesomeIcon icon={faCaretUp} />;
  const downvoteIcon = <FontAwesomeIcon icon={faCaretDown} />;
  const commentsIcon = <FontAwesomeIcon icon={faComments} />;
    
  const params = useParams();
  const articleId = params.article_id;
  const [article, setArticle] = useState({});
  const [votes, setVotes] = useState(0);
  const [patchError, setPatchError] = useState(null);
  const [userVote, setUserVote] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentsError, setCommentsError] = useState(null);
  const {loggedInUser, isLoading, setIsLoading, error, setError} = useContext(UserContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const scrollPosition = useRef(null);

  useEffect(() => {
  if (scrollPosition.current !== null) {
    window.scrollTo(0, scrollPosition.current);
    scrollPosition.current = null;
  }
}, [comments]);


useEffect(() => {
  setIsLoading(true)
    fetchArticleById(articleId)
    .then((res) => {
        setIsLoading(false)
        setArticle(res.data.article)
        setVotes(res.data.article.votes)
    })
    .catch((err) => {
    setIsLoading(false)
    setError("Failed to retrieve article_id. Try again.")
    });

    fetchCommentsById(articleId)
    .then((res) => {
        setComments(res.data.comments.sort((a, b) => (new Date(b.created_at) - new Date(a.created_at))))
        setIsLoading(false)
    })
    .catch((err) => {
      setIsLoading(false)
      setCommentsError("Failed to retrieve comments")
    });
}, []);

if (isLoading) {
  return <p>Loading...</p>
}

const handleClick = (voteType) => {
  let voteValue = voteType === "upvote" ? 1 : -1;
  if (!loggedInUser){
    setPatchError("You need to be logged in to vote!")
    return;
  }
  if (userVote === voteValue || article.author === loggedInUser.username) {
    return;
  }

  const voteChange = voteValue - userVote;
  setVotes(prevVotes => prevVotes + voteChange);
  patchArticle(articleId, voteChange)
  .then(() => {
    setPatchError(null)
    setUserVote(voteValue)
  })
  .catch((err) => {
    setVotes(prevVotes => prevVotes - voteChange);
    setPatchError("Failed to update votes. Try again.");
  })
}

const handleRemove = (commentId) => {
  if (isDeleting) {
    return;
  }

  setIsDeleting(true)
  scrollPosition.current = window.pageYOffset;
   deleteComment(commentId)
    .then(() => {
        setDeleteError(null)
        setIsDeleting(false)
        setComments(prev => prev.filter(comment => comment.comment_id !== commentId))
    })
    .catch((err) => {
      setIsDeleting(false)
      setDeleteError("Failed to delete comment. Try again.")
    });
}

  return (
    <div>
        <div className="article-container">
            <Link to="/newsfeed"><button className="back-btn">Back to Newsfeed</button></Link>
            {error && <p>{error}</p>}
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
        <div className="article-column">
            <img src={article.article_img_url} alt="article image" className="article-image"></img>
            <div className="article-btn-row">
                <button onClick={() => handleClick("upvote")} className="vote-btn upvote-btn" disabled={userVote === 1}>{upvoteIcon}</button>
                <button onClick={() => handleClick("downvote")} className="vote-btn downvote-btn" disabled={userVote === -1}>{downvoteIcon}</button>
                <p>{votes}</p>
                <button className="comments-btn">{commentsIcon}</button>
                <p>{article.comment_count}</p>
            </div>
            {patchError && <p>{patchError}</p>}
            <Comment article_id={articleId} setComments={setComments}/>
        </div>
          {commentsError && <p>{commentsError}</p>}
          <ListComments comments={comments} handleRemove={handleRemove} isDeleting={isDeleting} deleteError={deleteError}/>
        </div>
    </div>
  )
}

export default Article;