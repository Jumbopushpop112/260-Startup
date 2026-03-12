import React,{ useEffect, useState } from 'react'; 
export function About() {   
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [joinDate, setJoinDate] = useState("");
  const [username, setUsername] = useState("");  

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const res = await fetch('/api/user', {
          credentials: 'include'
        });

        if (!res.ok) {
          setIsLoggedIn(false);
          return;
        }
        const data = await res.json();
        setUsername(data.username);
        setJoinDate(data.joinDate);
        setIsLoggedIn(true);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserInfo(); 
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