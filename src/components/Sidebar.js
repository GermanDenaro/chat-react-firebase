import "./Sidebar.css"
import { useStateValue } from "../Stateprovider";
import {useEffect, useState} from "react"


const Sidebar = () => {

 const [weatherdata, setWeatherdata]= useState()

  useEffect(()=>{
   const successCallback = (position)=>{
       console.log(position.coords.longitude, position.coords.latitude)
       let URL = `https://community-open-weather-map.p.rapidapi.com/forecast?units=metric&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
       fetch(URL, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "be6ca72279msh21901a33332576bp1cf9abjsn47aec49a9b0d",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
})
.then(response => response.json()).then(data => setWeatherdata(data))
   }

   const errorCallback = err => console.log(err)

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }, [])



    const [{ user}, dispatch] = useStateValue();
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h4>{weatherdata?.city.name}</h4>
                <img src={`/icons/${weatherdata?.list[0].weather[0].icon}.png`}/>
                <h1>{Math.round(weatherdata?.list[0].main.temp)} ºC</h1>
            </div>
            <div className="sidebar__bottom">
            <h4>Welcome</h4>
            <h4>{user?.displayName}</h4>
            </div>
            
        </div>
    )
}

export default Sidebar
