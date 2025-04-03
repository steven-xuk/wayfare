import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Landing from './Landing';
import Home from './Home';

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Landing/> }></Route>,
  <Route path='/home' element={ <Home/> }></Route>
));

function App() {
  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
