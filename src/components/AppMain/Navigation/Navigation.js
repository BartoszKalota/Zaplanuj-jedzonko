import React from 'react';
import {
  NavLink
} from 'react-router-dom';

const Navigation = () => (
  <>
    <NavLink to='/app' className='nav-item' activeClassName='nav-item-active'>Pulpit</NavLink>
    <NavLink to='/app/test' className='nav-item' activeClassName='nav-item-active'>Przepisy</NavLink>
  </>
);

// const MENU_URL = 'http://localhost:3005/menu';

// const Navigation = () => {
//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     fetch(MENU_URL)
//       .then(res => {
//         if (res.ok) {
//           return res.json();
//         }
//         throw new Error('Błąd');
//       })
//       .then(menuItems => setMenuItems(menuItems));
//   }, []);

//   return (
//     <ul>
//       {menuItems.map(({id, name, link}) => (
//         <li key={id}>
//           <NavLink to={link} activeClassName='active'>{name}</NavLink>
//         </li>
//       ))}
//     </ul>
//   );
// }

export default Navigation;