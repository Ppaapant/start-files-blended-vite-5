import { lazy, Suspense, useEffect } from 'react';
import Header from './components/Header/Header'
import { Navigate, Route, Routes } from 'react-router-dom';
import { getUserInfo } from './service/opencagedataApi';
import { fetchBaseCurrency } from './ReduxState/currency/currOperations';
import { useDispatch } from 'react-redux';
import { setBaseCurrency } from './ReduxState/currency/currencySlice';

const Home = lazy(() => import('./pages/Home'));
const Rates = lazy(() => import('./pages/Rates'));

export const App = () => {
  const dispatch = useDispatch();


  useEffect(() => {

    const options = {
     enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
     };

    const success = ({coords})=> {
      dispatch(fetchBaseCurrency(coords))
    }
  
    const error = () => {
      dispatch(setBaseCurrency("USD"))
    }

 navigator.geolocation.getCurrentPosition(success, error, options)
  }, [dispatch]);

 
  


  return (
  <Suspense fallback={null}>
    <Routes>
      <Route path='/' element={<Header/>}>
        <Route index element={<Home/>}/>
        <Route path='/rates' element={<Rates/>}/>
      </Route>
      <Route path='*' element={<Navigate to="/" replace/>} />
    </Routes>
  </Suspense>
  );
};
