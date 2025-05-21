import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import { fetchUsers } from "./api"; 
import { useState, useEffect } from "react";
import Newsfeed from "./components/Newsfeed";
import Article from "./components/Article";
import { UserContext } from "./components/UserContext";

function App() {
    const [users, setUsers] = useState(0);
    const [loggedInUser, setLoggedInUser] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

useEffect (() => {
  setIsLoading(true)
    fetchUsers()
    .then((res) => {
      setIsLoading(false)
      setUsers(res.data.users)
      setLoggedInUser(res.data.users[100])
    })
    .catch((err) => {
      setIsLoading(false)
      setError("User doesn't exist")
})
 }, []) 

  return (
  <UserContext.Provider value={{users, loggedInUser, isLoading, setIsLoading, error, setError}}>
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/newsfeed" element={<Newsfeed />}/>
        <Route path="/articles/:article_id" element={<Article/>}/>
      </Routes>
    </>
  </UserContext.Provider>
  )
}

export default App;
