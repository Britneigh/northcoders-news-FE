import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { postComment } from "../api";

const Comment = ({article_id, setComments}) => {
    const {loggedInUser} = useContext(UserContext);
    const [isPosted, setIsPosted] = useState(null);
    const [comment, setComment] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [commentError, setCommentError] = useState(null);

const handleSubmit = (e) => {
    e.preventDefault();

    if (isPosting) {
      return;
    }

    if (!loggedInUser){
    setCommentError("You need to be logged in to comment.")
    setComment("");
    return;
    }

    setIsPosting(true); 
    postComment(article_id, loggedInUser.username, comment)
    .then((res) => {
    setCommentError(null)
    setIsPosted("Comment posted!")
    setIsPosting(false)
    setComment("");
    setComments((prevComments) => [
          res.data.comment,
          ...prevComments,
        ]);
    })
    .catch((err) => {
    setIsPosting(false)
    setCommentError("Failed to post comment. Try again.");
    })
}

  return (
    <>
    <form onSubmit={handleSubmit}>
        <textarea 
            id="comment-body"
            placeholder="Write a comment..."
            className="comment-field"
            rows="4" cols="40"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}></textarea>
        <button type="submit"disabled={isPosting || !comment.trim()}>
          {isPosting ? "Posting..." : "Post"}</button>
    </form>
    {commentError && <p>{commentError}</p>}
    {isPosted && <p>{isPosted}</p>}
    </>
  )
}

export default Comment;