import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import OpenRoute from './components/core/Auth/OpenRoute'
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';

function App() {
  return (
    <div className='min-h-screen flex flex-col bg-richblack-900'>
      <Navbar/>
      <Routes>

        <Route path='/' element={<Home/>}/>

        <Route path='/login' 
        element={
          <OpenRoute>
            <Login/>
          </OpenRoute>
        }/>

        <Route path='/signup' 
        element={
          <OpenRoute>
            <SignUp/>
          </OpenRoute>
        }/>

        <Route path='/forgot-password' 
        element={
          <OpenRoute>
            <ForgotPassword/>
          </OpenRoute>
        }/>

        <Route path='/update-password/:id' 
        element={
          <OpenRoute>
            <UpdatePassword/>
          </OpenRoute>
        }/>

      </Routes>
    </div>
  );
}

export default App;
