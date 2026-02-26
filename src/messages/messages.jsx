import React from 'react'; 
import { useEffect, useState } from 'react'; 
export function Messages(){
    const [message, setMessage] = useState('');
    const [username, getUsername] = useState("");
    function sendMessage(event){ 
        if(username === ""){
            alert("Enter a username!");
            return; 
        } 
        const users = JSON.parse(localStorage.getItem("Users") || []);
        const userExists = users.some(user => user.username === username); 
        if(!userExists){
            alert("User does not exist. Please type a valid username"); 
            return; 
        } 
    }
    function pushMessage(event){
         
    }
    return( 
        <main>
    <footer id="navigationList">   
      <input type="text" placeholder="Websocket Data" />
      <br />   
      <textarea class="messages" onChange={(e) => setMessage(e.target.value)}>  
      </textarea>   
      <br /> 
      <input type="text" placeholder="Enter Username To Send" onChange={(e) => getUsername(e.target.value)}/>   
      <br /> 
      <button type="button" onClick={sendMessage}>Send Message</button>    
    </footer>  
    </main>
    );
}