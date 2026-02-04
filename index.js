 function updateTime(){
   const date = new Date();
   const time = date.toLocaleTimeString(); 
   document.getElementById("liveClock").textContent = time;
 }

 function displayDate(){
   const date = new Date();
   const formattedDate = date.toLocaleDateString();
   document.getElementById("date").textContent = formattedDate; 
 }
 setInterval(updateTime,1000);
 updateTime();
 displayDate();
