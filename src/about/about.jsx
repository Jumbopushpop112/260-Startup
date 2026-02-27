import React,{ useEffect, useState } from 'react'; 
export function About() {   
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [joinDate, setJoinDate] = useState("");
  const [username, getUsername] = useState(""); 

  useEffect(() => {
    const currentUsername = localStorage.getItem("currentUser");
    setIsLoggedIn(!!currentUsername);

    if (currentUsername) {
      const users = JSON.parse(localStorage.getItem("Users")) || []; 
      const currentUser = users.find(user => user.username === currentUsername);
      if (currentUser) {  
        setJoinDate(currentUser.joinDate);  
        getUsername(currentUser.username);  
      } 
    } 
  }, []); // run once on mount

  return ( 
     <main>  
    <footer id="description">
      <br /> 
      <p>Slime was first developed in January of 2026 by Matthew Hart, a CS student at BYU. It's a startup project, aimed to help people have a fun and free time communicating with their friends
        I'm so grateful for all the support that I have been given with this project. This is my first attempt at a nice website for users, and I know that with patience and hard work, I can succeed. 
      </p>
       <input type="text" placeholder="User Statistics" disabled/>   
       <br />    
       <input type="text" placeholder="Username:" value ={isLoggedIn ? `Username: ${username}` : "Login To See Username"}disabled/>   
       <br />
       <input type="text" placeholder="User Join Date:" value={isLoggedIn ? `User Join Date: ${joinDate}` : "Login To See Join Date"} disabled/>      
       <br />                     
      <a href="https://github.com/Jumbopushpop112/260-Startup">GitHub Repository Link</a>    
    </footer> 
    </main> 
    );  
} 