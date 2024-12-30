import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

interface NavbarProps {
  isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">
        Blog
      </Link>
      {isLoggedIn && (
        <nav>
          <Link to="/posts/new">Write</Link>
          <Link to="/posts">Post</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      )}
    </header>
  );
}
