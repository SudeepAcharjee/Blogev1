import { useAuthContext } from 'context/AuthContext';
import { AuthorizedView, GuestView } from 'components/Router';

function App() {
  const { init, user } = useAuthContext();

  if (init && user) {
    return <AuthorizedView />;
  }

  if (init && !user) {
    return <GuestView />;
  }

  return <></>;
}

export default App;
