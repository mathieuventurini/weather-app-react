import React from 'react';
import { NavLink } from 'react-router-dom';



const Header = ({switchMode}) => {
    return (
        <div className={switchMode ? 'header' : 'dark-mode header'}>
            <div>
                <ul>
                    <NavLink to="/" className={(nav) => (nav.isActive) ? 'nav-active' : ''}>
                    <li>
                        accueil
                    </li>
                    </NavLink>
                    <NavLink to="/favorites" className={(nav) => (nav.isActive) ? 'nav-active' : ''}>
                    <li>
                        favoris 
                    </li>
                    </NavLink>
                </ul>
            </div>

        </div>
    );
};

export default Header;