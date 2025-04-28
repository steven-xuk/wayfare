import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login.js';

function App() {
  // i think this is the correct way to use redux
  // const isLoggedIn = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(login());
  // }, []);

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
