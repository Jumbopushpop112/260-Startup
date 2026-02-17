import React,{ useEffect, useState } from 'react';
export function Login() { 
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

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
  return ( 
      <main className="container-fluid bg-secondary text-center">
      <div id="login"> 
          <h1>Welcome to Slime!</h1>  
      <form method="get" action="play.html">
        <div>
          <span style={{fontSize: '20px'}}>@</span>  
          <input type="text" placeholder="Username" className="btn btn-outline-primary"/>  
        </div>
        <br /> 
        <div>
          <span>🔒</span>
          <input type="password" placeholder="Password" className="btn btn-outline-primary" /> 
        </div> 
        <br /> 
        <button type="submit">Login</button>  
        <button type="submit">Create Account</button>
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