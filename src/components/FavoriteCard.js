import axios from 'axios';
import { useEffect, useState } from 'react';
import HourlyCard from './HourlyCard';

const FavoriteCard = ({lat, lon, cityName, switchMode, celsiusToFahrenheit, setCelsiusToFahrenheit}) => {
    const [weatherCard, setWeatherCard] = useState([])
    const [hourlyWeather, setHourlyWeather] = useState([])
    const [cardActive, setCardActive] = useState(false)
    

    const deleteStorage = () => {

        let latStored = window.localStorage.lat ? window.localStorage.lat.split(",") : []
        let lonStored = window.localStorage.lon ? window.localStorage.lon.split(",") : []
        let cityNameStored = window.localStorage.cityNameStored ? window.localStorage.cityNameStored.split(',') : []

        let newLatStored = latStored.filter((item) => item != lat)
        let newLonStored = lonStored.filter((item) => item != lon)    
        let newCityNameStored = cityNameStored.filter((item) => item != cityName)

        window.localStorage.lat = newLatStored
        window.localStorage.lon = newLonStored
        window.localStorage.cityNameStored = newCityNameStored

        window.location.reload();
    };

    const getCoordinates = (lat, lon) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fdd2df8c9a4ae6c73ce25f656832ebf4`, 
        {headers:  {"Content-type": "application/json" 
        }})
        .then((res) => setWeatherCard([res.data]))
    }

    const getHourlyWeather = (lat, lon) => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=fdd2df8c9a4ae6c73ce25f656832ebf4`)
        .then((res) => setHourlyWeather([res.data]))
    }

    useEffect(() => {
        getCoordinates(lat, lon)
        getHourlyWeather(lat, lon)

    }, [])

    const getHour = (timezone) => {
        let date = Date.now() 
        return new Date(date + (timezone * 1000))
        .toUTCString()
        .slice(0, 22)
        .split("2023" || "2024" || "2025" || "2026" || "2027" || "2028")
        .slice(1)

    }

    // const getToday = (timezone) => {
    //     let date = Date.now() 
    //     return new Date(date + (timezone * 1000))
    //     .toUTCString()
    //     .slice(0, 16)
    //     .split("2023" || "2024" || "2025" || "2026" || "2027" || "2028")

    // }

    const activateCard = () => {
        cardActive ?  setCardActive(false) : setCardActive(true)

    }

    const celToFahr = () => {
        setCelsiusToFahrenheit(celsiusToFahrenheit ? false : true)
      }


return (
    <div className="card-favorite" onClick={() => activateCard()}>

        <div className={cardActive ? "accordion-top active" : "accordion-top"}>
                <div className="weather-info-title">
                    <h2>{cityName}</h2>
                </div>

            {weatherCard.map((elem) => {
                return <div className="weather-info-fav" key={elem.id}>
                    <button id='delete-btn' 
                    onClick={() => deleteStorage(elem.id)}
                    style={cardActive ? {display: "block"} : {display: "none"}}>&#10006;</button>
                    <div className={switchMode ? 'today-hour-fav' : 'dark-mode today-hour-fav'}>
                        <span>{getHour(elem.timezone)}</span>
                    </div>
                    
                    <div className='weather-main-fav'>
                        <span id='weather-logo-fav'>
                            <img src={`/icons/${elem.weather[0].icon}.png`} alt="Weather"/>
                        </span>
                    </div>

                    <div className="weather-main-temp-fav">
                        <span id='weather-temp-fav' onClick={() => celToFahr
                        ()}>{celsiusToFahrenheit ? Math.round((elem.main.temp) - 273.15) + "°C" : Math.round(((elem.main.temp) - 273.15) * (9/5) + 32) + "°F"}
                        </span>
                    </div>
                    {/* <div className="today-date-fav" style={cardActive ? {display: "block"} : {display: "none"}}>
                        <span>{getToday(elem.timezone)}</span>
                    </div> */}
            </div>
        })}
        </div>

        <div className='accordion-collapse' style={cardActive ? {maxHeight: "200px"} : {maxHeight: "0"}}>
            <HourlyCard hourlyWeather={hourlyWeather}/>
        </div>

    </div>
    );
};

export default FavoriteCard;


