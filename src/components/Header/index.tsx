import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
   return (
      <nav className="p-1 bg-gray-800 text-white">
         <ul className="flex justify-around">
            <li className="py-1 px-4 hover:bg-gray-900 hover:underline rounded">
               <Link to="/">Home</Link>
            </li>
            <li className="py-1 px-4 hover:bg-gray-900 hover:underline rounded">
               <Link to="/map">Map</Link>
            </li>
         </ul>
      </nav>
   );
};

export default Header;
