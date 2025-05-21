import { useEffect, useState } from "react";
import { fetchCommentsById } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

const ListComments = ({article_id, users}) => {
    const [commentsError, setCommentsError] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const upvoteIcon = <FontAwesomeIcon icon={faCaretUp} />;

useEffect (() => {
  setIsLoading(true)
    fetchCommentsById(article_id)
    .then((res) => {
        setComments(res.data.comments)
        setIsLoading(false)
    })
    .catch((err) => {
      setIsLoading(false)
      setCommentsError("Failed to retrieve comments")
})
 }, []) 


if (isLoading){
    return <p>Loading...</p>
}

return (
<div>
{commentsError && <p>{commentsError}</p>}
    {comments.map((comment) => {
        return (
        <div key={comment.comment_id}>
        {users.map((user) => {
            if (comment.author === user.username) {
                return (
                <img className="comments-avatar" key={user.username} src={user.avatar_url} alt={`${user.username}'s avatar`}></img>
                )
            }
            return null;
        })}
        <div>
            <h3>{comment.author}</h3>
            <p>{comment.body}</p>
        </div>
            <p>Date posted: {new Date(comment.created_at).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            })}</p>
            <p>{comment.votes}</p>
            <button className="article-vote-btn">{upvoteIcon}</button>
        </div>
        )
    })}
</div>
)
}

export default ListComments;