import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleById, fetchUsers, patchArticle } from "../api";
import ListComments from "./ListComments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown, faComments } from "@fortawesome/free-solid-svg-icons";
   
const Article = () => {
const upvoteIcon = <FontAwesomeIcon icon={faCaretUp} />;
const downvoteIcon = <FontAwesomeIcon icon={faCaretDown} />;
const commentsIcon = <FontAwesomeIcon icon={faComments} />;
    
const params = useParams();
const articleId = params.article_id;
const [error, setError] = useState(null);
const [usersError, setUsersError] = useState(null);
const [users, setUsers] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [article, setArticle] = useState({});
const [loggedInUser, setLoggedInUser] = useState(null);
const [votes, setVotes] = useState(0);
const [patchError, setPatchError] = useState(null);
const [userVote, setUserVote] = useState(0);

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
    })
}, []);

useEffect (() => {
setIsLoading(true)
    fetchUsers()
    .then((res) => {
    setIsLoading(false)
    setUsers(res.data.users)
    setLoggedInUser(res.data.users[0].username);
    })
    .catch((err) => {
    setIsLoading(false)
    setUsersError("User doesn't exist")
})
}, []) 

if (isLoading) {
  return <p>Loading...</p>
}

const handleClick = (voteType) => {
  let voteValue = voteType === "upvote" ? 1 : -1;
  const usernames = users.map(user => user.username);
  
  if (!usernames.includes(loggedInUser)){
    setPatchError("You need to be logged in to vote!")
    return;
  }
  if (userVote === voteValue) {
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

  return (
    <div>
        <div className="article-container">
            <Link to="/newsfeed"><button className="back-btn">Back to Newsfeed</button></Link>
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
            <div className="article-btn-row">
                <button onClick={() => handleClick("upvote")} className="vote-btn upvote-btn" disabled={userVote === 1}>{upvoteIcon}</button>
                <button onClick={() => handleClick("downvote")} className="vote-btn downvote-btn" disabled={userVote === -1}>{downvoteIcon}</button>
                <p>{votes}</p>
                <button className="comments-btn">{commentsIcon}</button>
                <p>{article.comment_count}</p>
                {patchError && <p>{patchError}</p>}
            </div>
        </div>
            <ListComments article_id={articleId} users={users}/>
        </div>
    </div>
  )
}

export default Article;