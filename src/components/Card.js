import { useState } from "react";

const Card = ({elem, cityName, switchMode, celsiusToFahrenheit, setCelsiusToFahrenheit}) => {
    

    const dateFormater = (date, timezone) => {
        return new Date((date + timezone) * 1000)
        .toUTCString("fr-FR")
        .split(' ')
        .slice(4, 5)
        .join(':')
        .slice(0, 5)

    }

    const getToday = (timezone) => {
        let date = Date.now() 
        return new Date(date + (timezone * 1000))
        .toUTCString()
        .slice(0, 22)
        .split("2023" || "2024" || "2025" || "2026" || "2027" || "2028")

    }

    const celToFahr = () => {
        setCelsiusToFahrenheit(celsiusToFahrenheit ? false : true)
      }


    return (
        <div className='card'> 
          
            <div className={switchMode ? "weather-info" : "weather-info dark-mode"}>
                <h2>{cityName}, {elem.sys.country}</h2>
            </div>

            <div className='weather-main'>

                <div className="weather-main-temp">
                    <span id='weather-temp' onClick={() => celToFahr()}>{celsiusToFahrenheit ? Math.round((elem.main.temp) - 273.15) + "°C" : Math.round(((elem.main.temp) - 273.15) * (9/5) + 32) + "°F"}</span>
                    <p>{elem.weather[0].description}</p>
                </div>
                <span id='weather-logo'>
                    <img src={`/icons/${elem.weather[0].icon}.png`} alt="Weather" />
                </span>

            </div>
            

            <div className="today-date">
                <span>{getToday(elem.timezone)}</span>
            </div>


            <div className="weather-information">
                <div className="weather-information-content">
                    <p>feels like</p>
                    <span>{Math.round((elem.main.feels_like) - 273.15)}°c</span>
                </div>
                <div className="weather-information-content">
                    <p>sunrise</p>
                    <span>{dateFormater(elem.sys.sunrise, elem.timezone)}</span>
                </div>
                <div className="weather-information-content">
                    <p>sunset</p>
                    <span>{dateFormater(elem.sys.sunset, elem.timezone)}</span>
                </div>
                
            </div>
        
        </div>
    );
};

export default Card;
