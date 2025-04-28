import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { use, useEffect } from 'react';
import { login, logout } from './redux/slices/AuthSlice';
import { supabase } from './SupabaseClient.js';
import Landing from './components/Landing';
import Home from './components/Home';
import { useDispatch } from 'react-redux';
import Signup from './components/Signup';
import Login from './components/Login.js';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        dispatch(login());
        console.log('User already logged in from previous session');
      } else {
        dispatch(logout());
        console.log('No active session');
      }
    }

    checkSession();

    // Optional: Subscribe to future auth changes (advanced)
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        dispatch(login());
      } else {
        dispatch(logout());
      }
    });

    // Cleanup subscription when component unmounts
    return () => {
      listener?.subscription.unsubscribe();
    };

  }, [dispatch]);

  const appRouter = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={ <Landing />}/>
      <Route path='/home' element={ <Home /> }/>
      <Route path='/signup' element={ <Signup /> }/>
      <Route path='/login' element={ <Login /> }/>
      <Route path='/home' element={ <Home /> }/>
    </>
  ));
  // console.log(isLoggedIn);

  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
