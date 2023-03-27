import React, { useEffect, useState } from 'react';

import FavoriteCard from './FavoriteCard';
import Header from './Header';

const Favorites = ({switchMode, celsiusToFahrenheit, setCelsiusToFahrenheit}) => {
    const [cityName, setCityName] = useState([])
    const [lon, setLon] = useState()
    const [lat, setLat] = useState()

    useEffect(() => {
        const latStored = window.localStorage.lat ? localStorage.getItem('lat').split(',') : []
        const lonStored = window.localStorage.lon ? localStorage.getItem('lon').split(',') : []
        const cityNameStored = window.localStorage.cityNameStored ? localStorage.getItem('cityNameStored').split(',') : []

        setLat(latStored)
        setLon(lonStored)
        setCityName(cityNameStored)

    }, [])

    
    return (
        <div className={switchMode ? 'container' : 'dark-mode container'}>
            <Header switchMode={switchMode}/>
           <h1>my cities</h1> 

           <div className="card-container-fav">
                {cityName.length > 0 ? (
                    cityName
                    .map((city, index) => (
                        <FavoriteCard key={city} cityName={cityName[index]} celsiusToFahrenheit={celsiusToFahrenheit} setCelsiusToFahrenheit={setCelsiusToFahrenheit} lat={lat[index]} lon={lon[index]} switchMode={switchMode} />
                    )))
                :
                (<h2>Aucun favoris</h2>)
                }
           </div>

        </div>
    );
};

export default Favorites;

