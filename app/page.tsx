'use client'
import WeatherCard from "@/components/WeatherCard";
import { type } from "os";
import { useEffect, useState } from "react";


export default function Home() {

  const [savedLocations, setSavedLocations] = useState<any>({})

  useEffect(() => {

    // window.localStorage.setItem('WEATHERLY_LOCATIONS',JSON.stringify({1:'Goa',2:'Ireland'}));
    const localLocations:any = window.localStorage.getItem('WEATHERLY_LOCATIONS');
    const obj = JSON.parse(localLocations);
    console.log("obj",obj);
    console.log(typeof obj);
    
    
    setSavedLocations(obj);
    console.log("hi",localLocations);
    console.log("savedLocations",savedLocations);


   
  }, [])
  

  return (
  <main>
    <div className="weathercard">

    <WeatherCard key='1'/>
    <WeatherCard key='2'/>
    
    <WeatherCard key='3'/>
    <WeatherCard key='4'/>
    
    </div>
  </main>
  );
}
