import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Favorites from './components/Favorites';
import Home from './components/Home';


const App = () => {
  const [switchMode, setSwitchMode] = useState(true)
  const [celsiusToFahrenheit, setCelsiusToFahrenheit] = useState(true)

  return (
    <div>
        <label className="switch">
          <input type="checkbox" onClick={() => switchMode ? setSwitchMode(false) : setSwitchMode(true)}/>
          <span className="slider"></span>
      </label>
      <BrowserRouter>
       <Routes>
        <Route path='/*' element={<Home switchMode={switchMode} celsiusToFahrenheit={celsiusToFahrenheit} setCelsiusToFahrenheit={setCelsiusToFahrenheit}/>}></Route>
       </Routes>
       <Routes>
        <Route path='/favorites' element={<Favorites switchMode={switchMode} celsiusToFahrenheit={celsiusToFahrenheit} setCelsiusToFahrenheit={setCelsiusToFahrenheit}/>}></Route>
       </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;