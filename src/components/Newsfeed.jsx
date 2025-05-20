import { Link } from "react-router";
import ListArticles from "./ListArticles";

const Newsfeed = ({user}) => {
  return (
    <div className="newsfeed-container">
        <nav className="nav-bar">
        <img src={user.avatar_url} alt="user avatar" className="avatar-img"></img>
        <h2>{user.username}</h2>
        <div className="navBar-btn-wrapper">
                <button className="navBar-btn">Newsfeed</button>
          <Link><button className="navBar-btn">Topics</button></Link>
        </div>
        </nav>
        <ListArticles/>
    </div>
  )
}

export default Newsfeed;