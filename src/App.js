import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { login, logout } from './redux/slices/AuthSlice';
import { supabase } from './SupabaseClient.js';
import Landing from './components/Landing';
import Home from './components/Home';
import { useDispatch } from 'react-redux';
import Signup from './components/Signup';
import Login from './components/Login.js';
import CreatePost from './components/CreatePost.jsx';
import CreateWalk from './components/CreateWalk.jsx';
import Policies from './components/Policies.jsx';
import NotFound from './components/NotFound.jsx';
import Friends from './components/Friends.jsx';
import Explore from './components/Explore.jsx';
import Download from './components/Download.jsx';

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
      <Route path='/download' element={ <Download /> }/>
      <Route path='/login' element={ <Login /> }/>
      <Route path='/home' element={ <Home /> }/>
      <Route path='/create-post' element={ <CreatePost /> }/>
      <Route path='/create-walk' element={ <CreateWalk /> }/>
      <Route path='/policies' element={ <Policies /> }/>
      <Route path='/friends' element={ <Friends /> }/>
      <Route path='/explore' element={ <Explore /> }/>
      <Route path="*" element={ <NotFound/> }/> {/* leave this at the end of the routes */}
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
