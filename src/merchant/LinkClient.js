import React, { useState } from 'react';



function LinkClient(props) {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);

    //toggles style of "Receiving on/off" button when clicked
    const toggleBtn = () => {
        const btn = document.getElementsByClassName("button")[0];
        if(btn.innerHTML === "Receiving on") {
            //change text
            btn.innerHTML = "Receiving off";
            //change color
            btn.style.setProperty("--r", 171);
            btn.style.setProperty("--g", 171);
            btn.style.setProperty("--b", 171);
        }
        else {
            //change text
            btn.innerHTML = "Receiving on";
            //change color
            btn.style.setProperty("--r", 235);
            btn.style.setProperty("--g", 133);
            btn.style.setProperty("--b", 35);
        }
    }
  
    const getLocation = () => {
      toggleBtn();
      if (!navigator.geolocation) {
        setStatus('Geolocation is not supported by your browser');
      } else {
        setStatus('Locating...');
        navigator.geolocation.getCurrentPosition((position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          var oldVal = localStorage.getItem("merchants");
          if(oldVal === undefined || oldVal === null) {
              localStorage.setItem("merchants", JSON.stringify([{id : localStorage.getItem("userEmail"), lon : position.coords.longitude, lat : position.coords.latitude, full : false, value: ""}]) );
          }
          else {
              var item = JSON.parse(oldVal);
              item.push({id : localStorage.getItem("userEmail"), lon : lng, lat : lat, full : false, value : ""});
              localStorage.setItem("merchants", JSON.stringify(item));
          }
        }, () => {
          setStatus('Unable to retrieve your location');
        });
      }
    }
    

    return (
        <div>
            <span className="button receiving" onClick={getLocation}>Receiving on</span>
            <p>{status}</p>
            {lat && <p>Latitude: {lat}</p>}
            {lng && <p>Longitude: {lng}</p>}

        </div>
      );
}

export default LinkClient;

