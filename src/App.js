import {useState} from 'react';
import {Routes, Route} from 'react-router-dom';

import NewOrderPage from './pages/NewOrderPage';
import AuthPage from './pages/AuthPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import NavBar from './components/NavBar';

import { getUser } from './utilities/users-service';

import './App.css';

function App() {
  //?this is how we set the state while we were building routing etc.
  // const [user, setUser] = useState(null);
  //?we can set useState to getUser payload now that functions to get that data has been written (step 'update the state')
  const [user, setUser] = useState(getUser());
  console.log(getUser())

  return (
    <main className="App">
      { user ?
        //routes tag goes here because we are doing routing for client-side under condition that user is signed in
        <>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
          {/**legacy note: used to use component property, which doesn't call the component, but references it (i.e. component={NewOrderPage}). It was harder to pass props*/}
          <Route path='/orders/new' element={<NewOrderPage/>}/>
          <Route path='/orders' element={<OrderHistoryPage/>}/>
        </Routes>
        </>
        :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}

export default App;
