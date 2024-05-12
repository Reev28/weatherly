'use client'
import WeatherCard from "@/components/WeatherCard";

export default function Home() {

  // const localLocationsNew = localStorage.getItem('WEATHERLY_LOCATIONS');
  let localLocationsNew;
  if (typeof window !== 'undefined') {
    localLocationsNew = localStorage.getItem('WEATHERLY_LOCATIONS');
}
  const locationData = localLocationsNew?JSON.parse(localLocationsNew):[];
  

  //Temporary Condition
  if(locationData.length<1){
    locationData.push({"index":"1","name":"goa"},{"index":"2","name":"Ireland"},{"index":"3","name":"america"},{"index":"4","name":"japan"});
  if (typeof window !== 'undefined') {
    localStorage.setItem('WEATHERLY_LOCATIONS',JSON.stringify(locationData));

  }
  }

  return (    
  <main>
    <div className="weathercard">
      {
        locationData.length<1?
        (
        <WeatherCard savedLocation={'qatar'} id={1} key={1}/>
        )
        :
        (
          locationData.map((location:any)=>{
            return(
          <WeatherCard savedLocation={location.name} id={location.index} key={location.index}/>
            )
          })
        )
      }
    </div>
  </main>
  );
}
