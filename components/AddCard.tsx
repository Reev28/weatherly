import React, { useState } from 'react'




const AddCard = ({updateLocations}:{updateLocations:()=>void}) => {
const [addIsClicked, setAddIsClicked] = useState(false);
const [location, setLocation] = useState('')
const handleInputChange = (e:any) => {
  setLocation(e.target.value);
}
const handleKeyDown = (e:any) => {
  console.log("handleKeyDown");
  
  if (e.key === 'Enter'||e.key === 'Tab') {
  console.log("Inside handleKeyDown");

    addAction();
  }
}

const addAction = () => {
  if (location.trim() !== '') {
  let localLocationsNew ;
  if (typeof window !== 'undefined') {
    localLocationsNew = localStorage.getItem('WEATHERLY_LOCATIONS');
  }
  let locationData = localLocationsNew?JSON.parse(localLocationsNew):[];

  const totalProps = JSON.stringify(locationData.length+Math.floor(Math.random() * 10000));
  console.log(totalProps);
  const newObj={
    "index":totalProps,
    "name":location
  }
  locationData = [...locationData,newObj];
  console.log("final",locationData);
  console.log("length",locationData.length);
  if (typeof window !== 'undefined') {
    localStorage.setItem('WEATHERLY_LOCATIONS',JSON.stringify(locationData));
  }
  setLocation('');
  updateLocations();
}
}

  return (
    <div className='container'>
      <div className="weather-app" id='add-card'>
      <div id="add-search-bar" className="search-bar">
          <input type="text" tabIndex={-1} name="location-input" placeholder="Enter location" value={location} onChange={handleInputChange} onKeyDown={handleKeyDown} />
        </div>
        <div className="button-container" onClick={addAction}>
          <div className="add-button">+</div> 
        </div>
        {addIsClicked&&(<div>Clicked</div>)}
      </div>
    </div>
  )
}

export default AddCard