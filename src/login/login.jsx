import React,{ useEffect, useState } from 'react';
export function Login() { 
  //Login code will be handled with database 
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  
  useEffect(() => {  
  async function checkLogin() { 
    try {
      const res = await fetch('/api/user', {
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();  
        setUsername(data.username);
        setIsLoggedIn(true); 
      }
    } catch (err) {
      console.error("Login check failed", err);
    }
  }

  checkLogin();
}, []);
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
    
  async function Logout(){
    await fetch('/api/auth/logout', { 
      method: 'DELETE',
      credentials: 'include', 
    });  
    setUsername("");
    setPassword(""); 
    setIsLoggedIn(false);   
  }
  async function createAccount(){
    const response = await fetch('/api/auth/create', {
      method: 'POST',
      credentials: 'include',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });      
    if(response.ok){ 
      const data = await response.json();  
      setUsername(data.username); 
      setIsLoggedIn(true); 
    }else{ 
      alert("User already exists!"); 
    }
  }  
  async function userLogin(){
    const response = await fetch('/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username, password }),
    });   
    if(response.ok){
      const data = await response.json(); 
      window.location.reload(); 
      setUsername(data.username); 
      setPassword(data.password);
      setIsLoggedIn(true);    
    }else{
      alert("Login failed");       
    }
  }

  return (  
      <main className="container-fluid bg-secondary text-center">
      <div id="login"> 
          {isLoggedIn && <h1>Welcome, {username}!</h1>} 
          {!isLoggedIn && <h1>Welcome to Slime!</h1>}      
      <form onSubmit={(e) => e.preventDefault()}>
        {!isLoggedIn && (   
          <>    
        <div> 
          <span style={{fontSize: '20px'}}>@</span>  
          <input type="text" placeholder="Username" className="btn btn-outline-primary" onChange={(e) => setUsername(e.target.value)}value={username}/>    
        </div>
        <br /> 
        <div>
          <span>🔒</span> 
          <input type="password" placeholder="Password" className="btn btn-outline-primary" onChange={(e) => setPassword(e.target.value)}value={password}/>  
        </div>  
        <br /> 
        </>
        )}
        {!isLoggedIn && <button type="button" onClick={userLogin}>Login</button>}          
        {!isLoggedIn && <button type="button" onClick={createAccount}>Create Account</button>} 
        {isLoggedIn && <button type="button" onClick={Logout}>Logout</button>}   
      </form>
      </div> 
    <footer id="navigationList">  
      <span className="text-reset"><a href="mailto:matthewhart800@gmail.com">Contact Matthew Hart</a></span>   
      <br /> 
      <br />  
      <a href="https://github.com/Jumbopushpop112/260-Startup" target="_blank">GitHub</a> 
      <br /> 
      <br />   
       <br />   
      <time>{time}</time>
      <p>{date}</p>    
    </footer> 
    </main>
    );  
} 