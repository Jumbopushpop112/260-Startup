import React from 'react'; 
import { useEffect, useState } from 'react'; 
export function Messages(){
    //Websocket will be used to send messages over the server
    const [message, setMessage] = useState('');
    const [toUsername, setToUsername] = useState(''); 
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [username, setUsername] = useState(''); 
    const[ws, setWs] = useState(null);

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

    useEffect(() =>{
      if(!username){
        return;
      }
      const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
      const socket = new WebSocket(`${protocol}://${window.location.host}/ws`); 
      setWs(socket); 
      socket.onopen = () =>{
        console.log("Connected to the websocket");
      };
      socket.onmessage = async (event) => {
      try {
          let data = event.data;
          if (data instanceof Blob) {
            data = await data.text();
          }
          const newMessage = JSON.parse(data);
    if (newMessage.to === username) {
      setReceivedMessages((prev) => [...prev, newMessage]);
    } 
  } catch (err) {
    console.error('Invalid WS message', err);
  }
};
      socket.onclose = () => {
          console.log('WebSocket disconnected');
      };  
      return () => socket.close();
    }, [username]); 
  
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
      if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            from: username,
            to: toUsername,
            text: message,
            timestamp: new Date()
          }));
        } 
      setMessage('');
      setToUsername('');
    } catch (err) { 
      console.error(err);  
      alert(err.message);  
    }
  }
const messagesToShow = receivedMessages
  .filter(msg => msg.to === username)
  .map(msg => {
    const time = new Date(msg.timestamp).toLocaleTimeString();
    return `[${time}] ${msg.from}: ${msg.text}`;
  });    
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
      <input type="text" placeholder="Enter Username To Send" onChange={(e) => setToUsername(e.target.value)} value={toUsername}/>    
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