import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './components/Card';
import HourlyCard from './components/HourlyCard';



const App = () => {
  const [weatherCard, setWeatherCard] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [lon, setLon] = useState(5.37)
  const [lat, setLat] = useState(43.30)
  const [cityName, setCityName] = useState('Marseille')
  const [switchMode, setSwitchMode] = useState(true)
  const [validSearch, setValidSearch] = useState(true)

  

  const getCity = (inputValue) => {

    if(document.getElementById('inputMessage').value === ('')){
      return
    }
    else{
      axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=1&appid=fdd2df8c9a4ae6c73ce25f656832ebf4`, {
        headers: {"Content-type": "application/json"}
      })
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
  
  const getCoordinates = async (lat, long) => {
    await getCity
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=fdd2df8c9a4ae6c73ce25f656832ebf4`, 
    {headers:  {"Content-type": "application/json" 
    }})
    .then((res) => setWeatherCard([res.data]))
  }

  useEffect(() => {
  
    getCity(inputValue)
    getCoordinates(lat, lon)
    document.getElementById('inputMessage').value = ('')


}, [inputValue, lat, lon])

const searchCity = () => {

  if(document.getElementById('inputMessage').value === ""){
    return

  }else {
    setInputValue(document.getElementById('inputMessage').value)
  }
}

  return (
    <div className={switchMode ? 'container' : 'dark-mode container'}>

      <label className="switch">
          <input type="checkbox" onClick={() => switchMode ? setSwitchMode(false) : setSwitchMode(true)}/>
          <span className="slider"></span>
      </label>
          
      <form action="" className='form-container' onSubmit={(e) => {e.preventDefault()}}>
        <div>
          <input type="text" placeholder="Search location" id="inputMessage" className={switchMode ? 'inputMessage' : 'inputMessage dark-mode'}/>
          <button type="submit" value='' id='find-button'
          onClick={() => searchCity()}><i className="fa-solid fa-magnifying-glass"/>
          </button>
        </div>
        <span id='no-result' style={validSearch ? {display: "none"} : {display: "flex"}}>No result, try with another city name</span>
      </form>

      
      <div className="card-container">
        {weatherCard.map((elem) => (
          <Card key={elem.id} elem={elem} cityName={cityName} switchMode={switchMode}/>
        ))}
        <HourlyCard lat={lat} lon={lon}/>
        
      </div>

    </div>
  );
};

export default App;