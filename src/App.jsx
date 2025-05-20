import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import { fetchUsers } from "./api"; 
import { useState, useEffect } from "react";
import Newsfeed from "./components/Newsfeed";
import Article from "./components/Article";


function App() {
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

useEffect (() => {
    fetchUsers()
    .then((res) => {
        setUser(res.data.users[0])
    })
    .catch((err) => {
        setError("User doesn't exist")
})
 }, []) 
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home user={user}/>}/>
        <Route path="/newsfeed" element={<Newsfeed user={user}/>}/>
        <Route path="/articles/:article_id" element={<Article/>}/>
      </Routes>
    </div>
  )
}

export default App;
