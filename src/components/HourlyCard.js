import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HourlyCard = ({lat, lon}) => {
    const [hourlyWeather, setHourlyWeather] = useState([])

    const dateFormater = (date, timezone) => {
        return new Date((date + timezone) * 1000)
        .toUTCString("fr-FR")
        .split(' ')
        .slice(4, 5)
        .join(':')
        .slice(0, 5)

    }

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=fdd2df8c9a4ae6c73ce25f656832ebf4`)
        .then((res) => setHourlyWeather([res.data]))
    }, [lat, lon])
    

    return (
            
            <div className='weather-next-hours'>
                {hourlyWeather.map((item) => {
                return item.list
                .slice(0, 9)
                .map((listItem) => {
                    
                    return <li 
                    key={listItem.dt}>
                        <span>{dateFormater(listItem.dt, item.city.timezone)}</span>
                        <img id='img-hours' src={`/icons/${listItem.weather[0].icon}.png`} alt="Weather" />
                        <span className='future-temp' >{Math.round((listItem.main.temp) - 273.15)}°C</span>
                    </li>
                })
                    })}
            </div>
    );
};

export default HourlyCard;