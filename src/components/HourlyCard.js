const HourlyCard = ({hourlyWeather, celsiusToFahrenheit}) => {

    const dateFormater = (date, timezone) => {
        return new Date((date + timezone) * 1000)
        .toUTCString("fr-FR")
        .split(' ')
        .slice(4, 5)
        .join(':')
        .slice(0, 2)
    }

     return (

        <div className='weather-next-hours'>
            {hourlyWeather.map((item) => {
            return item.list
            .slice(0, 9)
            .map((listItem) => {
                return <li 
                key={listItem.dt}>
                    <span id='hours-hours'>{dateFormater(listItem.dt, item.city.timezone)}h</span>
                    <img id='img-hours' src={`/icons/${listItem.weather[0].icon}.png`} alt="Weather" />
                    <span className='future-temp' >{celsiusToFahrenheit ? Math.round((listItem.main.temp) - 273.15) + "°C" : Math.round(((listItem.main.temp) - 273.15) * (9/5) + 32) + "°F"}</span>
                </li>
            })
            })}
        </div>
    );
};

export default HourlyCard;



