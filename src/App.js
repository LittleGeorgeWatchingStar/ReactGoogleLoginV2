import './App.css';
//import GoogleLogin from 'react-google-login';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import { useState } from 'react';

function App() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );

  const handleFailure = (result) => {
    console.log(result);
    alert(result);
  };

  const handleLogin = (credentialResponse) => {
    // const res = await fetch('/api/google-login', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     token: googleData.tokenId,
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    console.log(credentialResponse);

    const data = credentialResponse;
    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
  };

  
  const handleLogout = () => {
    localStorage.removeItem('loginData');
    googleLogout();
    setLoginData(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Google Login App</h1>
        <div>
          {loginData ? (
            <div>
              <h3>You logged in as {loginData.email}</h3>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            // <GoogleLogin
            //   clientId="1050403164416-ki8svm29la83si7f00nccjb9jdtv4f1q.apps.googleusercontent.com"
            //   buttonText="Log in with Google"
            //   onSuccess={handleLogin}
            //   onFailure={handleFailure}
            //   cookiePolicy={'single_host_origin'}
            // ></GoogleLogin>
            <GoogleLogin
            onSuccess={handleLogin}
            onError={handleFailure}
            />    
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
