import { fetchTopics } from "../api"
import { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";

const TopicsNavBar = ({onClick}) => {
    const [topics, setTopics] = useState([]);
    const {isLoading, setIsLoading, error, setError} = useContext(UserContext);

 useEffect (() => {
   setIsLoading(true)
     fetchTopics()
     .then((res) => {
       setIsLoading(false)
       setTopics(res.data.topics)
     })
     .catch((err) => {
       setIsLoading(false)
       setError("Failed to retrieve topics")
 })
  }, [])   
  
if (isLoading){
    <h2>Loading...</h2>
}
  return (
    <div className="topics-row">
        {topics.map((topic) => {
            return (
                <div key={topic.slug} onClick={() => onClick(topic.slug)}>
                <button className="topics-navBar-btn">{topic.slug}</button>
                </div>
            )
        })}
    {error && <p>{error}</p>}
    </div>
  )
}

export default TopicsNavBar;