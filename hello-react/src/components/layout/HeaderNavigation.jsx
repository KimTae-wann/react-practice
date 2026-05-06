import { Link, NavLink } from 'react-router-dom';
import Login from '../user/login';

export const HeaderNavigation = () => {
  return (
    <header>
      <Login />
      <nav className="menu-navigation">
        <ul>
          <li>
            {/* <Link to="todo">TODO</Link> */}
            <NavLink to="todo">TODO</NavLink>
          </li>
          <li>
            {/* <Link to="article">ARTICLE</Link> */}
            <NavLink to="article">ARTICLE</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
