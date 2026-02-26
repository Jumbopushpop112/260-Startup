import React from 'react'; 
import { useEffect, useState } from 'react'; 
export function Messages(){
    const [message, setMessage] = useState('');
    function sendMessage(event){ 
        alert(message); 
    }
    return( 
        <main>
    <footer id="navigationList">   
      <input type="text" placeholder="Websocket Data" />
      <br />   
      <textarea class="messages" onChange={(e) => setMessage(e.target.value)}>  
      </textarea>   
      <br /> 
      <input type="text" placeholder="Enter Username To Send" />  
      <br /> 
      <button type="button" onClick={sendMessage}>Send Message</button>    
    </footer> 
    </main>
    );
}