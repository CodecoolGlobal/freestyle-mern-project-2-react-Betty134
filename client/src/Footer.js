import React, {useState} from "react";

function Footer() {
 
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  
  const updateTime = () => {
    let currentDate = new Date().toLocaleString();
    setCurrentTime(currentDate);
  }
//Refresh the footer every sec, it looks like it counting
  setInterval(updateTime, 1000)

  return (
    <div className="footer">
       © Freestyle MERN TWT Inc.<br></br>
      {currentTime}
    </div>
  )}

export default Footer