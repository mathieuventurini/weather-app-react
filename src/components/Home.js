import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Header from './Header';
import HourlyCard from './HourlyCard';



const Home = ({switchMode, celsiusToFahrenheit, setCelsiusToFahrenheit}) => {
  const [weatherCard, setWeatherCard] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [lon, setLon] = useState(5.37)
  const [lat, setLat] = useState(43.30)
  const [hourlyWeather, setHourlyWeather] = useState([])
  const [cityName, setCityName] = useState('Marseille')
  const [validSearch, setValidSearch] = useState(true)


  const searchCity = () => {

    if(document.getElementById('inputMessage').value === ""){
      return
  
    }else {
      setInputValue(document.getElementById('inputMessage').value)
    }
  }

  const getCity = (inputValue) => {

    if(document.getElementById('inputMessage').value === ('')){
      return
    }
    else{
      axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=1&appid=fdd2df8c9a4ae6c73ce25f656832ebf4`, {
        headers: {"Content-type": "application/json"}})
      .then((res) => {
        if(!res.data[0]){
          setValidSearch(false)
          return
        }
        setLon((res.data[0].lon).toFixed(2))
        setLat((res.data[0].lat).toFixed(2))
        setCityName(() => {
          if(!res.data[0].local_names){
            setValidSearch(false)
            setCityName('Marseille')
            return 
          }
          else if(res.data[0].local_names.fr){
            setValidSearch(true)
            setCityName(res.data[0].local_names.fr)
          }
          else {
            setValidSearch(true)
            setCityName(res.data[0].local_names.en)
          }
      })
      })
    }

  }
  
  const getCoordinates = async (lat, lon) => {
    await getCity
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
    getCity(inputValue)
    getCoordinates(lat, lon)
    getHourlyWeather(lat, lon)
    document.getElementById('inputMessage').value = ('')

}, [inputValue, lat, lon])


const addStorage = () => {
  let latStored = window.localStorage.lat ? window.localStorage.lat.split(',')
  : [];
  let lonStored = window.localStorage.lon ? window.localStorage.lon.split(',')
  : [];
  let cityNameStored = window.localStorage.cityNameStored ? window.localStorage.cityNameStored.split(',') : []

  if(!latStored.includes(lat.toString())){

    latStored.push(lat)
    lonStored.push(lon)
    cityNameStored.push(cityName)

    window.localStorage.lat = latStored
    window.localStorage.lon = lonStored
    window.localStorage.cityNameStored = cityNameStored

    document.querySelector('.add-btn').childNodes[0].nodeValue = 'Added !'
    document.querySelector('.add-btn').style.fontSize = '1rem'
    setTimeout(() => {
      document.querySelector('.add-btn').childNodes[0].nodeValue = '❤'
      document.querySelector('.add-btn').style.fontSize = '1.2rem'
    }, 1000);
    

    
  } 
}

  return (
    <div className={switchMode ? 'container' : 'dark-mode container'}>

    <Header switchMode={switchMode} />
    <button className="add-btn" onClick={() => addStorage()}>❤</button>

          
      <form action="" className='form-container' onSubmit={(e) => {e.preventDefault()}}>
        <div>
          <input type="text" placeholder="Search location" id="inputMessage" className={switchMode ? 'inputMessage' : 'inputMessage dark-mode'}/>
          <button type="submit" value='' id='find-button'
          onClick={() => searchCity()}><i className="fa-solid fa-magnifying-glass"/>
          </button>
        </div>
        <span id='no-result' style={validSearch ? {display: "none"} : {display: "flex"}}>No result, try with another city name</span>
      </form>

      <div className='content'>
      <div className="card-container">
        {weatherCard.map((elem) => (
          <Card key={elem.id} elem={elem} cityName={cityName} switchMode={switchMode} lat={lat} lon={lon} celsiusToFahrenheit={celsiusToFahrenheit} setCelsiusToFahrenheit={setCelsiusToFahrenheit}/>
        ))}
      </div>

        <HourlyCard hourlyWeather={hourlyWeather} celsiusToFahrenheit={celsiusToFahrenheit}/>
        </div>
    </div>
  );
};

export default Home;