import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { BsSun, BsMoonFill } from 'react-icons/bs';
import { useDarkModeContext } from 'context/DarkModeContext';

export default function Footer() {
  const { darkMode, toggleDarkMode } = useDarkModeContext();

  return (
    <footer className={styles.footer}>
      <div className={styles.menu}>
        <Link to="/posts/new">Write</Link>
        <Link to="/posts">Post</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <div className={styles.themeBtn} onClick={() => toggleDarkMode()}>
        {darkMode ? <BsMoonFill /> : <BsSun />}
      </div>
    </footer>
  );
}
