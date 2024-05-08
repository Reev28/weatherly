'use client'
import Image from 'next/image';
import sunny from '../public/images/sunny.png'
import cloudy from '../public/images/cloudy.png'
import rainy from '../public/images/rainy.png'
import snowy from '../public/images/snowy.png'
import loadingGif from '../public/images/loading.gif'
import { useEffect, useState } from 'react';
import Clock from './Clock';

type WeatherData = {
  coord: {
      lon: number;
      lat: number;
  };
  weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
  }[];
  base: string;
  main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level: number;
      grnd_level: number;
  };
  visibility: number;
  wind: {
      speed: number;
      deg: number;
      gust: number;
  };
  clouds: {
      all: number;
  };
  dt: number;
  sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

type WeatherType = 'Clear' | 'Clouds' | 'Rain' | 'Snow' | 'Haze' | 'Mist';

export default function WeatherCard() {
  const [data, setData] = useState<WeatherData|any>({});
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const API_key = process.env.NEXT_PUBLIC_API_KEY;



  const handleInputChange = (e:any) => {
    setLocation(e.target.value);
  }

  const handleKeyDown = (e:any) => {
    // alert(`key pressed: ${e.key}`);
    if (e.key === 'Enter'||e.key === 'Tab') {
      search();
    }
  }

  const weatherImages:any = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  }

  const weatherImage = data.weather ? weatherImages[data.weather[0].main] : loadingGif;

  const backgroundImages:any = {
    Clear: 'linear-gradient(to right, #f3b07c, #fcd283)',
    Clouds: 'linear-gradient(to right, #57d6d4, #71eeec)',
    Rain: 'linear-gradient(to right, #5bc8fb, #80eaff)',
    Snow: 'linear-gradient(to right, #aff2ff, #fff)',
    Haze: 'linear-gradient(to right, #57d6d4, #71eeec)',
    Mist: 'linear-gradient(to right, #57d6d4, #71eeec)',
  }

  const backgroundImage = data.weather
    ? backgroundImages[data.weather[0].main]
    : 'linear-gradient(to right, #f3b07c, #fcd283)'


  const search = async () => {
    if (location.trim() !== '') {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_key}`
      const result = await fetch(url);
      const searchData = await result.json();
      if (searchData.cod !== 200) {
        setData({ notFound: true });
      } else {
        setData(searchData);
        setLocation('');
      }
      setLoading(false);

    }
  }

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      setLoading(true);
      const defaultLocation = 'Ireland';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=metric&appid=${API_key}`
      const result = await fetch(url);
      const searchData = await result.json();
      setData(searchData);
      setLoading(false);
    }

    fetchDefaultWeather();
  }, [])


  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

  // const latitude = 40.7128;
  // const longitude = -74.006;

  return (
    <div className="container" style={{}}>
      <div className="weather-app" style={{
        backgroundImage:
          backgroundImage && backgroundImage.replace
            ? backgroundImage.replace('to right', 'to top')
            : null,
      }}>
        <div className="search">
          <div className="search-top">
            <i className="location-icon fa-solid fa-location-dot"></i>
            <div className="location">{data.name}</div>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Enter location" value={location} onChange={handleInputChange} onKeyDown={handleKeyDown} onKeyPress={handleKeyDown}/>
            <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
          </div>
        </div>
        {loading ? (<Image src={loadingGif} className='loader' alt='loading' height={500} width={500}></Image>) : data.notFound ? (<div className="not-found">Not Found 😥</div>) : (
          <>
            <div className="weather">
            <div className="temp">{data.main ? `${data.main.temp}°` : null}</div>
              <div className="image-container">
                <Image className='weather-image' src={weatherImage} alt='sunny' />
              </div>
              <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
              <div className="location-time">
              <Clock timeZoneOffset={data.timezone?data.timezone:0} suppressHydrationWarning={true}/>
            </div>
            </div>
            <div className="weather-date">
              <p>{date}</p>
            </div>
            <div className="weather-data">
              <div className="humidity">
                <div className="data-name">Humidity</div>
                <i className="fa-solid fa-droplet"></i>
                <div className="data">{data.main ? data.main.humidity : null}%</div>
              </div>
              <div className="wind">
                <div className="data-name">wind</div>
                <i className="fa-solid fa-wind"></i>
                <div className="data">{data.wind ? data.wind.speed : null} km/h</div>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
