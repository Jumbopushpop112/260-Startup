import React from 'react'; 
import { useEffect, useState } from 'react'; 
export function Messages(){
    //Websocket will be used to send messages over the server
    const [message, setMessage] = useState('');
    const [toUsername, setToUsername] = useState(''); 
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/user', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username); // store the current logged-in username
        }
      } catch (err) {
        console.error("Failed to get user:", err);
      }
    }
      fetchUser();
    }, []);
    useEffect(() => {  
    async function fetchMessages() {
      try {
        const res = await fetch('/api/messages', {
          credentials: 'include',
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text); 
        }
        const messages = await res.json();
        setReceivedMessages(messages);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMessages();
  }, []);

  async function sendMessage() {
    if (!message.trim() || !toUsername.trim()) {
      alert('Enter both recipient username and message!');
      return;
    }
    try {
      const res = await fetch('/api/message', {
        method: 'POST', 
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, toUsername }),
      }); 
      if (!res.ok) {
        const errMsg = await res.json();
        throw new Error(errMsg.msg || 'Failed to send message');
      } 
      const updated = await fetch('/api/messages', { credentials: 'include' });
      const updatedMessages = await updated.json();
      setReceivedMessages(updatedMessages);
      setMessage('');
      setToUsername('');
    } catch (err) {
      console.error(err);  
      alert(err.message);
    }
  }
  const messagesToShow = receivedMessages.filter(msg => !msg.startsWith('To') && !msg.startsWith(username));   
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
      <input type="text" placeholder="Enter Username To Send" onChange={(e) => setToUsername(e.target.value)}/>    
      <br />   
      <button type="button" onClick={sendMessage}>Send Message</button>
      <br />
      <br /> 
      <input type="text" placeholder="Receieved Messages" disabled></input> 
      <br />   
      <textarea className="messages" readOnly value={messagesToShow.join("\n")}/>      
    </footer>  
    </main>
    );
}