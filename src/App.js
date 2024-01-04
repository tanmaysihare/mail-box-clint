import LoginSignup from './Component/auth/login-signup';
import './App.css';
import { useSelector } from 'react-redux';
import Notification from './Component/UI/Notification';

function App() {
  const notification = useSelector((state) => state.ui.notification);
  return (
    <div className="App">
       {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
     <LoginSignup/>
    </div>
  );
}

export default App;
