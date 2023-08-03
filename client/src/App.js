import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/Landing';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { Provider } from 'react-redux';
import store from "./store"
import Alert from './components/layout/Alert';
import { useEffect } from 'react';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(()=>{
    store.dispatch(loadUser())
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route exact path='/' Component={(() => { return <Landing /> })} />
          {/* <Route path='/:id' Component={() => { console.log(window.location.pathname); return <Landing /> }} /> */}
        </Routes>
        <section className="container">
          <Alert />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
