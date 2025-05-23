import { Link } from "react-router";
import ListArticles from "./ListArticles";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useSearchParams } from "react-router-dom";
import { fetchArticles } from "../api";

const Newsfeed = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");
  const [articles, setArticles] = useState([]);

  const {isLoading, setIsLoading, error, setError} = useContext(UserContext);

  const setSortOrder = (direction) => {
    const newParams = new URLSearchParams(searchParams);
    
    newParams.set("order", direction);
    setSearchParams(newParams);
  };
  const setSortBy = (query) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set("sort_by", query);
    setSearchParams(newParams);
  };

  useEffect (() => {
    setError(null);
    const validSortBy = ["votes", "created_at", "comment_count"];
    const validOrder = ["asc", "desc"];
    if (sortByQuery && !validSortBy.includes(sortByQuery)) {
      setError("Invalid sort_by value");
      return;
    }

    if (orderQuery && !validOrder.includes(orderQuery)) {
      setError("Invalid order value");
      return;
    }
  
    setIsLoading(true)
      fetchArticles({sort_by: sortByQuery, order: orderQuery })
      .then((res) => {
          setArticles(res.data.articles)
          setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        setError("Failed to retrieve articles")
  })
   }, [sortByQuery, orderQuery]) 


if (isLoading) {
  return <h2>Loading...</h2>
}

  const {loggedInUser} = useContext(UserContext);
  const guestImg = "https://aptimuscapital.com/wp-content/uploads/Team-placeholder.jpg";
  return (
    <div className="newsfeed-container">
        <nav className="nav-bar">
        <img src={loggedInUser ? loggedInUser.avatar_url : guestImg} alt="user avatar" className="avatar-img"></img>
        <h2>{loggedInUser ? loggedInUser.username : "guest"}</h2>
        <div className="navBar-btn-wrapper">
          <Link to="/newsfeed"><button className="navBar-btn">Newsfeed</button></Link>
          <Link to="/topics"><button className="navBar-btn">Topics</button></Link>
        </div>
        </nav>
        <div className="newsfeed-column">
        <div className="sortBy-wrapper">
        <button className="sortBy-btn">Sort by</button>
          <ul className="dropDown-list">
            <li onClick={() => setSortBy("created_at")}>Date</li>
            <li onClick={() => setSortBy("comment_count")}>Comment Count</li>
            <li onClick={() => setSortBy("votes")}>Votes</li>
            <li onClick={() => setSortOrder("asc")}>Order: Ascending</li>
            <li onClick={() => setSortOrder("desc")}>Order: Descending</li>
          </ul>
        </div>
        {error && <p>{error}</p>}
        <ListArticles articles={articles}/>
      </div>
        </div>

  )
}

export default Newsfeed;