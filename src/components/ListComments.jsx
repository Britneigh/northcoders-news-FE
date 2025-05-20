import { useEffect, useState } from "react";
import { fetchCommentsById, fetchUsers } from "../api";

const ListComments = ({article_id, user}) => {
    const [commentsError, setCommentsError] = useState(null);
    const [usersError, setUsersError] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);

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
      return commentsError
})
 }, []) 

useEffect (() => {
setIsLoading(true)
    fetchUsers()
    .then((res) => {
    setIsLoading(false)
    setUsers(res.data.users)
    })
    .catch((err) => {
    setIsLoading(false)
    setUsersError("User doesn't exist")
    return usersError
})
}, [comments]) 

if (isLoading){
    <p>Loading...</p>
}

return (
<div>
    {comments.map((comment) => {
        return (
        <div key={comment.comment_id}>
        {users.map((user) => {
            if (comment.author === user.username) {
                return (
                <img key={user.username} src={user.avatar_url} alt={`${user.username}'s avatar`}></img>
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
            <button>Upvote icon</button>
            <button>Downvote icon</button>
            <p>{comment.votes}</p>
        </div>
        )
    })}
</div>
)
}

export default ListComments;