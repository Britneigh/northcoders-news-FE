import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const ListComments = ({comments}) => {
    const upvoteIcon = <FontAwesomeIcon icon={faCaretUp} />;
    const {users} = useContext(UserContext);

return (
<>
    {comments.map((comment) => {
        return (
        <div key={comment.comment_id} className="comments-row-wrapper">
        {users.map((user) => {
            if (comment.author === user.username) {
                return (
                <img className="comments-avatar" key={user.username} src={user.avatar_url} alt={`${user.username}'s avatar`}></img>
                )
            }
            return null;
        })}
        <div className="comments-column">
            <div className="comments-row">
                <h3>{comment.author}</h3>
                <p>Date posted: {new Date(comment.created_at).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}</p>
            </div>
            <div className="comments-row">
                <p className="comments-size">{comment.body}</p>
            <div className="comments-column">
                <div className="comments-votes-row">
                <p className="votes-count">{comment.votes}</p>
                <button className="article-vote-btn" style={{color: "grey"}}>{upvoteIcon}</button>
            </div>
            </div>
            </div>

        </div>
        </div>
        )
    })}
</>
)
}

export default ListComments;