'use client'
import AddCard from "@/components/AddCard";
import WeatherCard from "@/components/WeatherCard";
import { useEffect, useState } from "react";

export default function Home() {

  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    updateLocations();
  }, [])

  const updateLocations = () =>{

  // const localLocationsNew = localStorage.getItem('WEATHERLY_LOCATIONS');
  let localLocationsNew;
  if (typeof window !== 'undefined') {
    localLocationsNew = localStorage.getItem('WEATHERLY_LOCATIONS');
  }
  const locationData = localLocationsNew?JSON.parse(localLocationsNew):[];
  setAllLocations(locationData);


  //Temporary Condition
  if(locationData.length<1){
    locationData.push({"index":"1","name":"Ireland"});
  if (typeof window !== 'undefined') {
    localStorage.setItem('WEATHERLY_LOCATIONS',JSON.stringify(locationData));
    setAllLocations(locationData);

  }
  }
  }

  return (    
  <main>
    <div className="weathercard">
      {
        allLocations.length<1?
        (
        <WeatherCard savedLocation={'qatar'} id={1} key={1} updateLocations={updateLocations} locationCount={1}/>
        )
        :
        (
          allLocations.map((location:any)=>{
            return(
          <WeatherCard savedLocation={location.name} id={location.index} key={location.index} updateLocations={updateLocations} locationCount={allLocations.length}/>
            )
          })
        )
      }
      {allLocations.length>5?<></>:<AddCard updateLocations={updateLocations}/>}
    </div>
  </main>
  );
}
