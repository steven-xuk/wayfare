import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import { useSelector } from 'react-redux';
import Signup from './components/Signup';

function App() {

  const isLoggedIn = useSelector((state) => state.auth);

  const appRouter = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={ <Landing />}/>
      <Route path='/home' element={ <Home /> }/>
      <Route path='/signup' element={ <Signup /> }/>
    </>
  ));
  console.log(isLoggedIn);

  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
