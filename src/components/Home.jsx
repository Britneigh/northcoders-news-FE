import { Link } from "react-router";
   
const Home = ({user}) => {
  return (
    <div className="home-container">
        <h2>{`Welcome back ${user.name}!`}</h2>
        <Link to="/newsfeed"><button className="goTo-newsfeed-btn">Go to Newsfeed</button></Link>
    </div>
  )
}

export default Home;