import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
   
const Home = () => {
  const {loggedInUser, isLoading} = useContext(UserContext);

  return (
    <div className="home-container">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : loggedInUser ? (<>
          <h2>{`Welcome back ${loggedInUser.name}!`}</h2>
          <Link to="/newsfeed"><button className="goTo-newsfeed-btn">Go to Newsfeed</button></Link>
          </>
      ) :
      (<><h2>Welcome to NC News!</h2>
       <Link to="/newsfeed"><button className="goTo-newsfeed-btn">Go to Newsfeed</button></Link>
      </>)}
    </div>
  )
}

export default Home;