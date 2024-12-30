import { Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from 'context/AuthContext';
import Footer from './Footer';
import Navbar from './Navbar';

const FOOTERLESS_URL = ['/posts/new', '/posts/edit/:id', '/login', '/signup'];

export default function Layout() {
  const { user } = useAuthContext();
  const location = useLocation();
  const shouldHideFooter = FOOTERLESS_URL.some((url) => {
    const pattern = new RegExp(`^${url.replace(/\/:id/g, '/[^/]+')}$`);
    return pattern.test(location.pathname);
  });

  return (
    <>
      <Navbar isLoggedIn={!!user} />
      <Outlet />
      {user && !shouldHideFooter && <Footer />}
    </>
  );
}
