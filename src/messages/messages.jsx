import React from 'react'; 
export function Messages(){
    return( 
        <main>
    <footer id="navigationList">   
      <input type="text" placeholder="Websocket Data" />
      <br />   
      <textarea class="messages"> 
      </textarea>   
      <br /> 
      <button type="button">Send Message</button>   
    </footer> 
    </main>
    );
}