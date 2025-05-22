import { Link } from "react-router";
import ListArticles from "./ListArticles";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Newsfeed = () => {
  const {loggedInUser} = useContext(UserContext);
  const guestImg = "https://aptimuscapital.com/wp-content/uploads/Team-placeholder.jpg";
  return (
    <div className="newsfeed-container">
        <nav className="nav-bar">
        <img src={loggedInUser ? loggedInUser.avatar_url : guestImg} alt="user avatar" className="avatar-img"></img>
        <h2>{loggedInUser ? loggedInUser.username : "guest"}</h2>
        <div className="navBar-btn-wrapper">
                <button className="navBar-btn">Newsfeed</button>
          <Link to="/topics"><button className="navBar-btn">Topics</button></Link>
        </div>
        </nav>
        <ListArticles/>
    </div>
  )
}

export default Newsfeed;