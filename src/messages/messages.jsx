import React from 'react'; 
import { useEffect, useState } from 'react'; 
export function Messages(){
    //Websocket will be used to send messages over the server
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState("");
    const [receivedMessages, setReceivedMessages] = useState([]);
    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("Users") || "[]");
        const currentUser = users.find(user => user.isLoggedIn);
        if (currentUser && currentUser.receivedMessages) {
            setReceivedMessages(currentUser.receivedMessages);
        }
    }, []); 
    function sendMessage(event){ 
        if(username === ""){
            alert("Enter a username!");
            return; 
        } 
        const users = JSON.parse(localStorage.getItem("Users") || "[]"); 
        const userExists = users.some(user => user.username === username); 
        if(!userExists){
            alert("User does not exist. Please type a valid username"); 
            return; 
        }  
        // Always update receivedMessages for logged-in user 
        const recepientIndex = users.findIndex(user => user.username === username);  
        if(recepientIndex === -1){
            alert("Can't find user. Retry please!");
            return;  
        }    
         
        users[recepientIndex].receivedMessages.push(message); 
        localStorage.setItem("Users", JSON.stringify(users));
        const currentUser = users.find(user => user.isLoggedIn);
        if (currentUser.username === username) {
            setReceivedMessages(currentUser.receivedMessages);   
        }
        setMessage("");
    } 
    return( 
        <main>
    <footer id="navigationList">   
      <input type="text" placeholder="Websocket Data" />
      <br />   
      <textarea
          className="messages"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />    
      <br /> 
      <input type="text" placeholder="Enter Username To Send" onChange={(e) => setUsername(e.target.value)}/>    
      <br />   
      <button type="button" onClick={sendMessage}>Send Message</button>
      <br />
      <br /> 
      <input type="text" placeholder="Receieved Messages" disabled></input> 
      <br /> 
      <textarea className="messages" readOnly value={receivedMessages.join("\n")}/>     
    </footer>  
    </main>
    );
}