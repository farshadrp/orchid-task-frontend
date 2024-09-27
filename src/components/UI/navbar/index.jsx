import { Link } from 'react-router-dom';

import classes from './Navbar.module.scss';

const Navabr = () => (
  <nav className={classes.navbar}>
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  </nav>
);

export default Navabr;
