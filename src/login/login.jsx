import React,{ useEffect, useState } from 'react';
export function Login() { 
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      setTime(now.toLocaleTimeString());
      setDate(now.toLocaleDateString());
    } 

    updateTime(); // run immediately
    const interval = setInterval(updateTime, 1000);
   
    return () => clearInterval(interval); // cleanup
  }, []); 
   function Login(event){ 
      event.preventDefault();
      accountExists = true; 
      if(localStorage.getItem(username) === null){
        console.log("Username does not exist. Try again.");  
      }
      console.log("Username:", username);
      console.log("Password:", password);   
      setIsLoggedIn(true);   
    }
    function createAccount(event){
      const users = JSON.parse(localStorage.getItem("Users")) || [];  
      const isIncluded = users.some(
        (user) => user.username === username
      );  
      if(isIncluded){ 
        console.log("Oops! Username is taken"); 
        alert("Username is taken!"); 
      }else{
        users.push({username, password});  
      localStorage.setItem("Users",JSON.stringify(users));
      }
       
    }
  return ( 
      <main className="container-fluid bg-secondary text-center">
      <div id="login"> 
          {isLoggedIn && <h1>Welcome, {username}!</h1>}
          {!isLoggedIn && <h1>Welcome to Slime!</h1>}     
      <form onSubmit={Login}> 
        <div>
          <span style={{fontSize: '20px'}}>@</span>  
          <input type="text" placeholder="Username" className="btn btn-outline-primary" onChange={(e) => setUsername(e.target.value)}/>   
        </div>
        <br /> 
        <div>
          <span>🔒</span>
          <input type="password" placeholder="Password" className="btn btn-outline-primary" onChange={(e) => setPassword(e.target.value)} /> 
        </div> 
        <br /> 
        <button type="button" onClick={(event) => Login(event)}>Login</button>       
        <button type="button" onClick={(event) => createAccount(event)}>Create Account</button>
      </form>
      </div> 
    <footer id="navigationList"> 
      <hr />
      <span className="text-reset"><a href="mailto:matthewhart800@gmail.com">Contact Matthew Hart</a></span>   
      <br /> 
      <br /> 
      <a href="https://github.com/Jumbopushpop112/260-Startup" target="_blank">GitHub</a> 
      <br /> 
      <br /> 
       <input type="text" placeholder="3rd Party API will show suggested friends here" /> 
       <br />   
      <time>{time}</time>
      <p>{date}</p>    
    </footer> 
    </main>
    );  
} 